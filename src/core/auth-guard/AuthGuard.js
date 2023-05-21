import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/authentication-context/AuthenticationContext";

export const AuthGuard = ({ children }) => {
  const location = useLocation();
  const { token } = useAuth();

  return token ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
