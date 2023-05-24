import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import InputField from "../../shared/input-field-component/InputField";
import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const {
    cart,
    wishlist,
    appliedFilterValues,
    handleFilterChange,
    products,
    clearFilters,
  } = useProducts();
  const location = useLocation();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (appliedFilterValues.searchValue.length > 0)
      setShowDropdown(products.length > 0 && location.pathname !== "/products");
    else setShowDropdown(false);
  }, [
    showDropdown,
    appliedFilterValues.searchValue,
    products,
    location.pathname,
  ]);

  useEffect(() => {
    if (location.pathname !== "/products") clearFilters();
  }, [location.pathname]);

  const handleDropdownItemClick = (productId) => {
    setShowDropdown(false);
    clearFilters();
    navigate(`/product/${productId}`);
  };

  return (
    <nav>
      <div className="search-dropdown">
        <InputField
          type={"text"}
          name={"searchValue"}
          value={appliedFilterValues.searchValue}
          onChangeFunction={handleFilterChange}
          placeholder={"Search for Product"}
        />
        {showDropdown && (
          <div className="dropdown">
            {products.map(({ _id, title, author }, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleDropdownItemClick(_id)}
              >
                <h3>{title}</h3>
                <p>author: {author}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <NavLink to={"/products"}> Products </NavLink> ||
      <NavLink to={"/cart"}> Cart({cart?.length}) </NavLink> ||
      <NavLink to={"/wishlist"}> Wishlist({wishlist?.length}) </NavLink> ||
      <NavLink to={"/user-profile"}> User </NavLink>
    </nav>
  );
};

export default Navbar;
