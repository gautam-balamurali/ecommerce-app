import { NavLink, useLocation, useNavigate } from "react-router-dom";

import "./Navbar.css";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import { useEffect } from "react";
import { FaHeart, FaShoppingCart, FaStore, FaUser } from "react-icons/fa";

const Navbar = () => {
  const { cart, wishlist, clearFilters } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname !== "/products") clearFilters(); // eslint-disable-next-line
  }, [location.pathname]);

  return (
    <nav className="navbar">
      {/* <NavLink className="nav-link" to={"/products"}>
        <div className="nav-item">
          <span className="nav-icon">
            <FaStore title="Store" />
          </span>
        </div>
      </NavLink>
      <NavLink className="nav-link" to={"/cart"}>
        <div className="nav-item">
          <span className="nav-icon">
            <FaShoppingCart title="Cart" />
          </span>
          {cart.length > 0 && <span className="badge">{cart.length}</span>}
        </div>
      </NavLink>
      <NavLink className="nav-link" to={"/wishlist"}>
        <div className="nav-item">
          <span className="nav-icon">
            <FaHeart title="Wishlist" />
          </span>
          {wishlist.length > 0 && (
            <span className="badge">{wishlist.length}</span>
          )}
        </div>
      </NavLink>
      <NavLink className="nav-link" to={"/user-profile"}>
        <div className="nav-item">
          <span className="nav-icon">
            <FaUser title="Profile" />
          </span>
        </div>
      </NavLink> */}
      <ul>
        <li>
          <div className="nav-link" onClick={() => navigate("/products")}>
            <div className="nav-item">
              <FaStore title="Store" />
            </div>
          </div>
        </li>
        <li>
          <div className="nav-link" onClick={() => navigate("/cart")}>
            <div className="nav-item">
              <FaShoppingCart title="Cart" />
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </div>
          </div>
        </li>
        <li>
          <div className="nav-link" onClick={() => navigate("/wishlist")}>
            <div className="nav-item">
              <FaHeart title="Wishlist" />
              {wishlist.length > 0 && (
                <span className="badge">{wishlist.length}</span>
              )}
            </div>
          </div>
        </li>
        <li>
          <div className="nav-link" onClick={() => navigate("/user-profile")}>
            <div className="nav-item">
              <FaUser title="Profile" />
            </div>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
