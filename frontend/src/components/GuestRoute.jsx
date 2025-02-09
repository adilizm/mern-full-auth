import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function GuestRoute() {
  return <>{!useAuth() ? <Outlet /> : <Navigate to={"/"} />}</>;
}

export default GuestRoute;
