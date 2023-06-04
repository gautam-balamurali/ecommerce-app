import { useNavigate } from "react-router-dom";

import "./CategoriesListing.css";
import { useProducts } from "../../../../core/contexts/products-context/ProductsContext";

const CategoriesListing = () => {
  const { categories, filterByCategory } = useProducts();
  const navigate = useNavigate();

  const categoryClickHandler = (categoryName) => {
    filterByCategory(categoryName);
    navigate("/products");
  };

  return (
    <div className="categories-section">
      <h2>Categories</h2>
      <div className="category-contents">
        {categories.length > 0 &&
          categories.map(({ _id, categoryName, description, images }) => (
            <div
              onClick={() => categoryClickHandler(categoryName)}
              key={_id}
              className="category-container"
            >
              <div className="category" title={description}>
                <img src={images[0]} alt={categoryName} />
              </div>
              <h5>{categoryName}</h5>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoriesListing;
