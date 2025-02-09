import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function ProtectedRoute() {
  return <>{useAuth() ? <Outlet /> : <Navigate to={"/login"} />}</>;
}

export default ProtectedRoute;
