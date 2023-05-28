import { Link } from "react-router-dom";
import "./Header.css";

import Navbar from "../navbar/Navbar";
import SearchBar from "../search-bar/SearchBar";

const Header = () => {
  return (
    <header className="header">
      <div className="header-content app-title">
        <Link className="nav-link" to={"/"}>
          <h2>Sochenge</h2>
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
