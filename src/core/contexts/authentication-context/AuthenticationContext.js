import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useProducts } from "../products-context/ProductsContext";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({
    token: JSON.parse(localStorage.getItem("token")),
    user: JSON.parse(localStorage.getItem("user")),
  });
  const { dispatch } = useProducts();

  const syncUserDetailsWithCartAndWishlist = (token, user) => {
    setLoggedInUserDetails((prev) => ({
      ...prev,
      token,
      user,
    }));
    dispatch({ type: "UPDATE_CART_AND_WISHLIST", payload: user });
  };

  const logOutUser = () => {
    setLoggedInUserDetails((prev) => ({ ...prev, token: "", user: null }));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOG_OUT" });
  };

  const logInUser = async (body) => {
    try {
      const response = await axios.post("/api/auth/login", body);
      const {
        data: { foundUser, encodedToken },
        status,
      } = response;
      if (status === 200) {
        localStorage.setItem("token", JSON.stringify(encodedToken));
        localStorage.setItem("user", JSON.stringify(foundUser));
        syncUserDetailsWithCartAndWishlist(encodedToken, foundUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signUpUser = async (body) => {
    try {
      const response = await axios.post("/api/auth/signup", body);
      const {
        data: { createdUser, encodedToken },
        status,
      } = response;
      if (status === 201) {
        localStorage.setItem("token", JSON.stringify(encodedToken));
        localStorage.setItem("user", JSON.stringify(createdUser));
        syncUserDetailsWithCartAndWishlist(encodedToken, createdUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ ...loggedInUserDetails, logInUser, signUpUser, logOutUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
