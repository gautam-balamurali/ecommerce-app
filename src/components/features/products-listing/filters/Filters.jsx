import { FaFilter } from "react-icons/fa";
import { MdClose, MdFilterList } from "react-icons/md";
import { useState } from "react";

import "./Filters.css";
import { useProducts } from "../../../../core/contexts/products-context/ProductsContext";
import InputField from "../../../shared/input-field-component/InputField";
import { priceFieldFilters } from "../../../../config/AppConfig";

const Filters = () => {
  const [toggleFilterSection, setToggleFilterSection] = useState(false);
  const {
    categories,
    handleFilterChange,
    appliedFilterValues,
    clearFilters,
    products,
  } = useProducts();

  const categoriesFieldFilters = categories.reduce(
    (acc, { categoryName }) => [...acc, categoryName],
    []
  );

  const filterHamburgerHandler = () => {
    setToggleFilterSection((prev) => !prev);
  };

  return (
    <div className="filters-wrapper">
      <div className="toggle-filter-section">
        <div className="toggle-filter-wrapper">
          <div className="toggle-filter-btn">
            {toggleFilterSection ? (
              <MdClose size={15} onClick={filterHamburgerHandler} />
            ) : (
              <MdFilterList size={15} onClick={filterHamburgerHandler} />
            )}
          </div>
          <span>{toggleFilterSection ? "Close" : "Apply Filters"}</span>
        </div>
        {products.length > 0 && <p>{products.length} results</p>}
      </div>
      <div
        className="filter-section"
        style={{ display: toggleFilterSection ? "block" : "none" }}
      >
        <fieldset>
          <div className="filter-section-heading">
            <legend>
              <span>
                <FaFilter size={14} />
                Filters
              </span>
            </legend>
            <button className="clear-filters-btn" onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
          <div className="filter-category">
            <h4>Sort by</h4>
            {priceFieldFilters.map(({ label, value, type, name }) => (
              <div key={value} className={"selectable-input-filter"}>
                <InputField
                  label={label}
                  value={value}
                  type={type}
                  name={name}
                  onChangeFunction={handleFilterChange}
                  checked={appliedFilterValues.radioButtonValue === value}
                />
              </div>
            ))}
          </div>
          <div className="filter-category">
            <h4>Category</h4>
            {categoriesFieldFilters.map((category, index) => (
              <div key={index} className={"selectable-input-filter"}>
                <InputField
                  type={"checkbox"}
                  value={category}
                  label={category}
                  name={"checkboxValues"}
                  onChangeFunction={handleFilterChange}
                  checked={appliedFilterValues.checkboxValues.includes(
                    category
                  )}
                />
              </div>
            ))}
          </div>
          <div className="filter-category">
            <h4>Ratings</h4>
            <div className="ratings-filter">
              <div className="input-slider">
                <InputField
                  type={"range"}
                  value={appliedFilterValues.rangeValue}
                  min={1}
                  max={5}
                  name={"rangeValue"}
                  onChangeFunction={handleFilterChange}
                />
              </div>
              <div className="slider-labels">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div key={index} className={"slider-input-filter"}>
                    <span className="rating-star">⭐</span>
                  </div>
                ))}
                <span>{"\u00A0and below"}</span>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Filters;
