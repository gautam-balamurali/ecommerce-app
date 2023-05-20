import { Link } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const Header = () => {
  return (
    <>
      <Link className="title-link" to={"/"}>
        <h1>Sochenge</h1>
      </Link>
      <Navbar />
    </>
  );
};

export default Header;
