import { Navigate, useLocation } from "react-router-dom";
import { useAuthentication } from "../contexts/authentication-context/AuthenticationContext";

export const AuthGuard = ({ children }) => {
  const location = useLocation();
  const { token } = useAuthentication();

  return token ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};
