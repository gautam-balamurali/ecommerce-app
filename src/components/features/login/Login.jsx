import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../core/contexts/authentication-context/AuthenticationContext";
import { useEffect } from "react";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, logInUser } = useAuth();
  const { dispatch } = useProducts();

  const testLoginCredentials = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };

  const loginClickHandler = async () => {
    const userDetails = await logInUser(testLoginCredentials);
    console.log({ userDetails });
    dispatch({ type: "UPDATE_CART_AND_WISHLIST", payload: userDetails });
  };

  useEffect(() => {
    if (token)
      navigate(location?.state?.from.pathname || "/", { replace: true });
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="login">
      <h2>Login Page</h2>
      <button onClick={loginClickHandler}>Login with test credentials</button>
      <p>New user?</p>
      <Link to={"/sign-up"}>
        <button>Create A New Account</button>
      </Link>
    </div>
  );
};

export default Login;
