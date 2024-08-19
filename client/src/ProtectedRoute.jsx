import { Navigate, Outlet } from "react-router-dom"; //Outlet es para el componente que está dentro
import { useAuth } from "./context/AuthContext"

function ProtectedRoute(){

    const { loading, isAuthenticated } = useAuth();
    
    if(loading) return <h1>Loading...</h1>;
   
    if(!loading && !isAuthenticated) return <Navigate to='/login' replace />; //si no esta autenticado lo redirecciono, replace es para que no vuelva a la ruta enterior
    
    return <Outlet/>; //Le digo que continue con el componente que esta dentro
}

export default ProtectedRoute;