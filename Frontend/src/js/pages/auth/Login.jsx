import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export const Login = () => {
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    // const onLogin = () => {
    //     login("User 1");
    // };

    const onSubmit = (data) => {
        login(data);
        console.log('funciona el boton')
    };

    // useEffect(()=>{

    // }, [])

    return (
        <>
            <div className="flex justify-center">
                <div className="container login col-4 bg-[#4E5C82] text-left border-2 border-white">
                    <button className="border-2 border-white bg-[#ECE5DE] rounded w-full p-4 text-[#3F4B6E] font-bold text-[27px]">
                        NEXTCOGNITIVE
                    </button>
                    <h1 className="text-center mt-5 text-2xl">
                        Iniciar sesion
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-4">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                className="text-sm rounded-lg w-full p-2.5 bg-white text-black"
                                placeholder="drperez@gmail.com"
                                required
                                {...register("email", { required: true })}
                            ></input>

                            <p>{errors.email?.message}</p>
                        </div>
                        <div className="p-4">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Contraseña
                            </label>
                            <input
                                type="text"
                                id="password"
                                className="text-sm rounded-lg w-full p-2.5 bg-white text-black"
                                placeholder="Contraseña"
                                required
                                {...register("password", { required: true })}
                            ></input>
                        </div>
                        <div className="p-4">
                            <button className="border-2 border-white bg-#4E5C82 hover:bg-blue-700 rounded w-full p-4">
                                {" "}
                                Ingresar
                            </button>
                        </div>
                    </form>
                    <div className="flex text-center p-6 justify-around">
                        <h2 className="text-[#FFAF5E] underline text-[14px]">
                            ¿Olvidaste tu mail?
                        </h2>
                        <h2 className="text-[#FFAF5E] underline text-[14px]">
                            ¿Olvidaste tu contraseña?
                        </h2>
                    </div>
                    <nav className="mt-4 text-center flex justify-center">
                        <p>
                            ¿No tienes cuenta?{" "}
                            <Link
                                to="/auth/register"
                                className="text-[#FFAF5E] underline text-[14px]"
                            >
                                Registrate
                            </Link>
                        </p>
                    </nav>
                </div>
            </div>
        </>
    );
};
