import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Login.css";
import { useAuth } from "../../../core/contexts/authentication-context/AuthenticationContext";
import { useEffect, useState } from "react";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import InputField from "../../shared/input-field-component/InputField";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, logInUser } = useAuth();
  const { dispatch } = useProducts();

  const testLoginCredentials = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const loginCredentialsChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const loginAsAGuestClickHandler = () => {
    setLoginCredentials((prev) => ({ ...prev, ...testLoginCredentials }));
    //loginHandler(loginCredentials);
  };

  const loginHandler = async (loginCredentials) => {
    dispatch({ type: "LOADER_INITIATED" });
    try {
      const userDetails = await logInUser(loginCredentials);
      dispatch({ type: "UPDATE_CART_AND_WISHLIST", payload: userDetails });
    } catch (error) {
      console.error(error);
      dispatch({ type: "FETCH_ERROR_DETAILS", payload: error?.response });
    } finally {
      dispatch({ type: "LOADER_STOPPED" });
    }
  };

  const submitClickHandler = (event) => {
    event.preventDefault();
    loginHandler(loginCredentials);
  };

  useEffect(() => {
    if (token)
      navigate(location?.state?.from.pathname || "/", { replace: true });
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="login-page">
      <div className="login-card">
        <form
          className="login-content"
          onSubmit={submitClickHandler}
          autoComplete="off"
        >
          <h2>Login</h2>
          <div className="email-section">
            <InputField
              className={"email-txt-inpt"}
              label={"Email"}
              label_class={"email"}
              type={"email"}
              name={"email"}
              value={loginCredentials.email}
              placeholder={"johndoe@gmail.com"}
              onChangeFunction={loginCredentialsChangeHandler}
              required={true}
            />
          </div>
          <div className="pswd-section">
            <InputField
              className={"pswd-txt-inpt"}
              label={"Password"}
              label_class={"pswd"}
              type={"password"}
              name={"password"}
              value={loginCredentials.password}
              placeholder={"*******"}
              onChangeFunction={loginCredentialsChangeHandler}
              required={true}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <button onClick={loginAsAGuestClickHandler} className="login-btn">
          Generate Guest Credentials
        </button>
        <p>
          Don't have an account?
          <Link to={"/sign-up"} style={{ textDecoration: "none" }}>
            <span className="sign-up"> Sign Up </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
