import { Link } from "react-router-dom";

import cricifyLogo from "../../../assets/cricify-logo.png";
import "./Header.css";
import Navbar from "../navbar/Navbar";
import SearchBar from "../search-bar/SearchBar";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <Link className="nav-link" to={"/"}>
          {/* <h2>Sochenge</h2> */}
          <div className="header-img-container">
            <img src={cricifyLogo} alt="app logo" className="header-img" />
            <h2 className="app-title">cricify</h2>
          </div>
        </Link>
      </div>
      <div className="header-content">
        <SearchBar />
      </div>
      <div className="header-content">
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
