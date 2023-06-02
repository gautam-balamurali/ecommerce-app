import { Link, useLocation, useNavigate } from "react-router-dom";

import "./SignUp.css";
import { useAuthentication } from "../../../core/contexts/authentication-context/AuthenticationContext";
import { useEffect, useState } from "react";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import InputField from "../../shared/input-field-component/InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, signUpUser } = useAuthentication();
  const { productsDispatch } = useProducts();

  const [signUpCredentials, setSignUpCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const testSignUpCredentials = {
    firstName: "John",
    lastName: "Doe",
    email: `${Math.floor(Math.random() * 10)}johndoe${Math.floor(
      Math.random() * 100
    )}@neog.camp`,
    password: "johnDoe",
  };

  const signUpCredentialsChangeHandler = (event) => {
    const { name, value } = event.target;
    setSignUpCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const randomCredentialsClickHandler = () => {
    setSignUpCredentials((prev) => ({ ...prev, ...testSignUpCredentials }));
  };

  const signUpHandler = async (signUpCredentials) => {
    productsDispatch({ type: "LOADER_INITIATED" });
    try {
      const userDetails = await signUpUser(signUpCredentials);
      productsDispatch({
        type: "UPDATE_CART_AND_WISHLIST",
        payload: userDetails,
      });
    } catch (error) {
      console.error(error);
      productsDispatch({
        type: "FETCH_ERROR_DETAILS",
        payload: error?.response,
      });
    } finally {
      productsDispatch({ type: "LOADER_STOPPED" });
    }
  };

  const submitClickHandler = (event) => {
    event.preventDefault();
    signUpHandler(signUpCredentials);
  };

  const toggleShowHidePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    if (token)
      navigate(location?.state?.from.pathname || "/products", {
        replace: true,
      });
    // eslint-disable-next-line
  }, [token]);

  return (
    <div className="signup-page">
      <div className="signup-card">
        <form
          className="signup-content"
          onSubmit={submitClickHandler}
          autoComplete="off"
        >
          <h2>Sign Up</h2>
          <div className="firstName-section">
            <InputField
              className={"firstName-txt-inpt"}
              label={"First Name"}
              label_class={"firstName"}
              type={"text"}
              name={"firstName"}
              value={signUpCredentials.firstName}
              placeholder={"John"}
              onChangeFunction={signUpCredentialsChangeHandler}
              required={true}
            />
          </div>
          <div className="lastName-section">
            <InputField
              className={"lastName-txt-inpt"}
              label={"Last Name"}
              label_class={"lastName"}
              type={"text"}
              name={"lastName"}
              value={signUpCredentials.lastName}
              placeholder={"Doe"}
              onChangeFunction={signUpCredentialsChangeHandler}
              required={true}
            />
          </div>
          <div className="email-section">
            <InputField
              className={"email-txt-inpt"}
              label={"Email"}
              label_class={"email"}
              type={"email"}
              name={"email"}
              value={signUpCredentials.email}
              placeholder={"johndoe@gmail.com"}
              onChangeFunction={signUpCredentialsChangeHandler}
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
              value={signUpCredentials.password}
              placeholder={"*******"}
              onChangeFunction={signUpCredentialsChangeHandler}
              required={true}
            />
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>
        <button onClick={randomCredentialsClickHandler} className="signup-btn">
          Generate Random Credentials
        </button>
        <p className="form-info-last">
          Already have an account?
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <span className="login"> Log In </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
