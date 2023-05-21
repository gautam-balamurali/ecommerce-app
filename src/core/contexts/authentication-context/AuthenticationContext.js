import axios from "axios";
import { createContext, useContext, useState } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({
    token: JSON.parse(localStorage.getItem("token")),
    user: JSON.parse(localStorage.getItem("user")),
  });

  const loginUser = async (body) => {
    try {
      const response = await axios.post("/api/auth/login", body);
      const {
        data: { foundUser, encodedToken },
        status,
      } = response;
      if (status === 200) {
        localStorage.setItem("token", JSON.stringify(encodedToken));
        localStorage.setItem("user", JSON.stringify(foundUser));
        setLoggedInUserDetails((prev) => ({
          ...prev,
          token: encodedToken,
          user: foundUser,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthenticationContext.Provider
      value={{ ...loggedInUserDetails, loginUser }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuth = () => useContext(AuthenticationContext);
