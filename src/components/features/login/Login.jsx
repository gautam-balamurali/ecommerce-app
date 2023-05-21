import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../core/contexts/authentication-context/AuthenticationContext";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, loginUser } = useAuth();

  const testLoginCredentials = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };

  useEffect(() => {
    if (token) {
      navigate(location?.state?.from.pathname || "/", { replace: true });
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="login">
      <h2>Login Page</h2>
      <button onClick={() => loginUser(testLoginCredentials)}>
        Login with test credentials
      </button>
    </div>
  );
};

export default Login;
