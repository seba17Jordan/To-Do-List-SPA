import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => { //Esto para que haga por mi el uso del contexto y no andar importando
    const context = useContext(AuthContext) //use context (importado de react) va a leer nuestro contexto y validamos si existe
    if (!context) {
        return new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => { //en el value del componente de abajo se suelen pasar objetos porque es la froma de agruparlos, yo elijo exportar el signUp y el user
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]); //para el error de usuario repetido
    const [loading, setLoading] = useState(true);

    const signUp = async (user) => {

        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data) //lo que viene en el error lo almaceno en el estado    
        }
    };

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setUser(res.data); //res.data son los datos del usuario que se ponen ahi, se puede ver en el console log de res
            setIsAuthenticated(true);
        } catch (error) {
            if (Array.isArray(error.response.data)) { //si el error no es un array debo convertirlo a array porque asi lo leo en el frontend
                return setErrors(error.response.data);
            }
            setErrors([error.response.data.message])
        }
    };

    const logout = () => {
        Cookies.remove('token', { domain: 'localhost'});
        console.log(Cookies.get());
        setIsAuthenticated(false);
        setUser(null);
    }


    useEffect(() => {
        if (errors.length > 0) { //si por lo menos hau un elemento dentro de errors, recordar que es un array
            const timer = setTimeout(() => {
                setErrors([]) //Ejecuto esto a los 5 segundos
            }, 5000)
            return () => clearTimeout(timer); //eliminamos el timer para que no consuma recursos en react
        }
    }, [errors]); //cambia dependiendo de errors

    useEffect(() => { //Este useEffect es para cuendo inicia la aplicacion para que la sesion de login no se reinicie
        async function checkLogin() {
            const cookies = Cookies.get();

            if (!cookies) { //ACA FUE EL CAMBIO, AL PARECER SOLO HAY QUE VER SI NO HAY COOKIES, NO COOKIES.TOKEN
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }

            try {
                const res = await verifyTokenRequest(cookies.token); //hay que verificarlo  ya que el token se puede establecer manualmente en el navegador
                if (!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }

                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ signUp, signIn, logout, loading, user, isAuthenticated, errors }}>
            {children}
        </AuthContext.Provider>
    );
};