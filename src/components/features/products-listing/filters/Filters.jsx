import "./Filters.css";

import { useProducts } from "../../../../core/contexts/products-context/ProductsContext";
import InputField from "../../../shared/input-field-component/InputField";

const Filters = () => {
  const { categories, handleFilterChange, appliedFilterValues } = useProducts();

  const categoriesFieldFilters = categories.reduce(
    (acc, { categoryName }) => [...acc, categoryName],
    []
  );
  return (
    <div className="filter-section">
      <fieldset style={{ textAlign: "start" }}>
        <legend>
          <span className="material-symbols-outlined">filter_alt</span>
          Filters
        </legend>
        {categoriesFieldFilters.map((category, index) => (
          <div key={index} className={"checkbox-filter-style"}>
            <InputField
              type={"checkbox"}
              value={category}
              label={category}
              name={"checkboxValues"}
              onChangeFunction={handleFilterChange}
              checked={appliedFilterValues.checkboxValues.includes(category)}
            />
          </div>
        ))}
      </fieldset>
    </div>
  );
};

export default Filters;
