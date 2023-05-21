import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../core/contexts/authentication-context/AuthenticationContext";
import { useEffect } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, signUpUser } = useAuth();

  const testSignUpCredentials = {
    firstName: "John",
    lastName: "Doe",
    email: `${Math.floor(Math.random() * 10)}johndoe${Math.floor(
      Math.random() * 100
    )}@neog.camp`,
    password: "johnDoe",
  };

  useEffect(() => {
    if (token)
      navigate(location?.state?.from.pathname || "/products", {
        replace: true,
      });
    // eslint-disable-next-line
  }, [token]);

  return (
    <div>
      <h2>Sign Up Page</h2>
      <button onClick={() => signUpUser(testSignUpCredentials)}>
        Sign Up with test credentials
      </button>
    </div>
  );
};

export default SignUp;
