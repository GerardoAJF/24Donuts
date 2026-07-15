import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ADMIN_ROLES = ["admin", "employee"];

const PrivateRoute = () => {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/auth/login" replace />;
  if (!ADMIN_ROLES.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default PrivateRoute;