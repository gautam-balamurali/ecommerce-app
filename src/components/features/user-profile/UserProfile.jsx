import { useAuth } from "../../../core/contexts/authentication-context/AuthenticationContext";

const UserProfile = () => {
  const { user } = useAuth();
  const { firstName, lastName, email } = user;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "1rem auto",
        border: "1px solid",
        padding: "1rem",
      }}
    >
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
      <p>Email: {email}</p>
    </div>
  );
};

export default UserProfile;
