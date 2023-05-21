import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../core/contexts/authentication-context/AuthenticationContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logOutUser } = useAuth();
  const { firstName, lastName, email } = user;

  const logOutClickHandler = () => {
    logOutUser();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem auto",
      }}
    >
      <div
        style={{
          margin: "1rem",
          border: "1px solid",
          padding: "1rem",
        }}
      >
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Email: {email}</p>
      </div>
      <button onClick={logOutClickHandler}>
        Log Out
      </button>
    </div>
  );
};

export default UserProfile;
