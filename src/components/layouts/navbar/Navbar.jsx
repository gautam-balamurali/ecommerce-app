import { NavLink } from "react-router-dom";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

const Navbar = () => {
  const { cart, wishlist } = useProducts();
  return (
    <nav>
      <NavLink to={"/products"}> Products </NavLink> ||
      <NavLink to={"/cart"}> Cart({cart?.length}) </NavLink> ||
      <NavLink to={"/wishlist"}> Wishlist({wishlist?.length}) </NavLink> ||
      <NavLink to={"/user-profile"}> User </NavLink>
    </nav>
  );
};

export default Navbar;
