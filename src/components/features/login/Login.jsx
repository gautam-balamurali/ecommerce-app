import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Login.css";
import { useAuthentication } from "../../../core/contexts/authentication-context/AuthenticationContext";
import { useEffect, useState } from "react";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import InputField from "../../shared/input-field-component/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, logInUser } = useAuthentication();
  const { productsDispatch } = useProducts();

  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const testLoginCredentials = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };

  const loginCredentialsChangeHandler = (event) => {
    const { name, value } = event.target;
    setLoginCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const loginAsAGuestClickHandler = () => {
    setLoginCredentials((prev) => ({ ...prev, ...testLoginCredentials }));
    //loginHandler(loginCredentials);
  };

  const loginHandler = async (loginCredentials) => {
    productsDispatch({ type: "LOADER_INITIATED" });
    const userDetails = await logInUser(loginCredentials);
    if (userDetails) {
      productsDispatch({
        type: "UPDATE_CART_AND_WISHLIST",
        payload: userDetails,
      });
      toast.success(`Welcome back, ${userDetails?.firstName}!`, {
        theme: "light",
      });
    } else {
      toast.error("Login failed! Please try again with correct credentials.", {
        theme: "colored",
      });
    }
    productsDispatch({ type: "LOADER_STOPPED" });
  };

  const submitClickHandler = (event) => {
    event.preventDefault();
    loginHandler(loginCredentials);
  };

  const toggleShowHidePassword = () => {
    setShowPassword((prev) => !prev);
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
            <div
              className="eye-icon"
              aria-hidden="true"
              onClick={toggleShowHidePassword}
            >
              {showPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
            </div>
            <InputField
              className={"pswd-txt-inpt"}
              label={"Password"}
              label_class={"pswd"}
              type={showPassword ? "text" : "password"}
              name={"password"}
              value={loginCredentials.password}
              placeholder={"****************"}
              onChangeFunction={loginCredentialsChangeHandler}
              required={true}
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <button onClick={loginAsAGuestClickHandler} className="login-btn">
          Set Guest Credentials
        </button>
        <p className="form-info-last">
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
