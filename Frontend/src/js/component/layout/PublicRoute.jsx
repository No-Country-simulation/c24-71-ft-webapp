import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const PublicRoute = () => {
  const { user } = useAuth();

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;