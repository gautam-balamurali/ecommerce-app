import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to={"/cart"}> Cart </NavLink> ||
      <NavLink to={"/wishlist"}> Wishlist </NavLink> ||
      <NavLink to={"/login"}> Login </NavLink>
    </nav>
  );
};

export default Navbar;
