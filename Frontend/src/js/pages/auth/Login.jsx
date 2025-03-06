import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const onLogin = () => {
        login("User 1");
    };

    return (
        <>
            <div className="flex justify-center">
            <div className="container col-4 login bg-[#4E5C82] p-5 text-left">
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
                        className="text-sm rounded-lg w-full p-2.5 bg-white text-black "
                        placeholder="drperez@gmail.com"
                        required
                    ></input>
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
                    ></input>
                </div>
                <div className="p-4"><button
                    className="border-2 border-white bg-#4E5C82 hover:bg-blue-700 rounded w-full p-4"
                    onClick={onLogin}
                >
                    {" "}
                    Ingresar
                </button></div>
                <div className="flex justify-center text-center p-6">
                    <h2>¿Olvidaste tu mail?</h2>
                    <h2>¿Olvidaste tu contraseña?</h2>
                </div>
                <nav className="mt-2 text-center">
                    <Link to="/auth/register">Registrarse</Link>
                </nav>
            </div>
            </div>
        </>
    );
};
