import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import InputField from "../../shared/input-field-component/InputField";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const { appliedFilterValues, handleFilterChange, products, clearFilters } =
    useProducts();
  const location = useLocation();
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (appliedFilterValues.searchValue.length > 0)
      setShowDropdown(location.pathname !== "/products");
    else setShowDropdown(false);
  }, [
    showDropdown,
    appliedFilterValues.searchValue,
    products,
    location.pathname,
  ]);

  const handleDropdownItemClick = (productId) => {
    setShowDropdown(false);
    clearFilters();
    navigate(`/product/${productId}`);
  };

  return (
    <div className="navbar-content search-dropdown">
      <div className="search-icon" aria-hidden="true">
        <FaSearch size={12} />
      </div>
      <InputField
        type={"text"}
        name={"searchValue"}
        value={appliedFilterValues.searchValue}
        onChangeFunction={handleFilterChange}
        placeholder={"Search by name, category, etc."}
        className={"input-field"}
      />
      {showDropdown && (
        <div className="dropdown">
          {products.length > 0 &&
            products.map(({ _id, title }) => (
              <div
                key={_id}
                className="dropdown-item"
                onClick={() => handleDropdownItemClick(_id)}
              >
                <p>🔎 {title}</p>
              </div>
            ))}
          {appliedFilterValues.searchValue !== "" && products.length < 1 && (
            <p className="dropdown-item">No result found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
