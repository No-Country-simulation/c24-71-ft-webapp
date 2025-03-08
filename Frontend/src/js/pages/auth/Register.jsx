import { Link } from 'react-router-dom'

export const Register = () => {
  return (
    <>
        <div>Register</div>
         
         <nav className="mt-8">            
             <Link to="/auth/login">login</Link>
         </nav>
    </>
  )
}
