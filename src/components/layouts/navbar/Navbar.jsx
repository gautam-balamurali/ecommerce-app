import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to={"/products"}> Products </NavLink> ||
      <NavLink to={"/cart"}> Cart </NavLink> ||
      <NavLink to={"/wishlist"}> Wishlist </NavLink> ||
      <NavLink to={"/user-profile"}> User </NavLink>
    </nav>
  );
};

export default Navbar;
