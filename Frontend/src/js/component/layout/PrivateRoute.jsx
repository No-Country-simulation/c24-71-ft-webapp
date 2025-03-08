import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>; // Mostrar un loading mientras se verifica la autenticación
  return user ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default PrivateRoute;
