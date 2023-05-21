import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../../core/contexts/authentication-context/AuthenticationContext";
import { useEffect } from "react";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token, signUpUser } = useAuth();
  const { dispatch } = useProducts();

  const testSignUpCredentials = {
    firstName: "John",
    lastName: "Doe",
    email: `${Math.floor(Math.random() * 10)}johndoe${Math.floor(
      Math.random() * 100
    )}@neog.camp`,
    password: "johnDoe",
  };

  const signUpClickHandler = async () => {
    const userDetails = await signUpUser(testSignUpCredentials);
    dispatch({ type: "UPDATE_CART_AND_WISHLIST", payload: userDetails });
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
      <button onClick={signUpClickHandler}>
        Sign Up with test credentials
      </button>
    </div>
  );
};

export default SignUp;
