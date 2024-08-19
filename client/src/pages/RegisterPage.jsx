import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function RegisterPage() {

    const { register, handleSubmit, formState: { errors } } = useForm() //Uso el modulo de hooks para estados y validaciones automaticas en formularios, register y handleSubmit son funciones que nos da el modulo
    const { signUp, isAuthenticated, errors: registerErrors } = useAuth(); //desde useAuth me traigo la funcion register (o sea sign up)
    const navigate = useNavigate();

    useEffect(() => { //Si isAuthenticated es true entonces redirecciono a la ruta de tasks
        if (isAuthenticated) navigate("/tasks");
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => { //Con el handleSubmit basicamente al hacer click se ejecuta todo esto, esta funcion la uso en el form, incialmente estaba todo ahi pero lo empaqueto en funcion por prolijidad
        signUp(values); //a sign up le paso los valores
    });


    return (
        <div className=' flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className=' bg-zinc-800 max-w-md p-10 rounded-md'>
                {
                    registerErrors.map((error, i) => (
                        <div className=' bg-red-500 p-2 text-white' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className=' text-3xl font-bold my-2'>Register</h1>
                <form onSubmit={onSubmit}>
                    <input type="text" {...register("username", { required: true })}
                        className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='username'
                    />
                    {errors.username && <p className=' text-red-500'>username is required</p>}

                    <input type="email" {...register("email", { required: true })}
                        className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='email'
                    />
                    {errors.email && <p className=' text-red-500'>email is required</p>}

                    <input type="password" {...register("password", { required: true })}
                        className=' w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='password'
                    />
                    {errors.password && <p className=' text-red-500'>password is required</p>}

                    <button type='submit'
                    className=' bg-sky-500 text-white px-4 py-2 rounded-md my-2'
                    >Register</button>
                </form>

                <p className=' flex gap-x-2 justify-between'>
                    Already have an account?{" "}
                    <Link to="/login" className=' text-sky-500'>Login</Link>
                </p>

            </div>
        </div>
    )
};

export default RegisterPage;