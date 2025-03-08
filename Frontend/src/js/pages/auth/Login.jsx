import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";


export const Login = () => {


    const { login, loading, error } = useAuth();
    const navigate = useNavigate();

    const onLogin = () => {
     
        login( 'User 1' );
               
    }

  return (
    <>
        <div>login</div>
         
            <button 
                className="btn btn-primary"
                onClick={ onLogin }> Iniciar sesion
            </button>


         <nav className="mt-8">            
             <Link to="/auth/register">Registrarse</Link>
         </nav>
    </>
  )
}
