import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../../core/contexts/products-context/ProductsContext";

const CategoriesListing = () => {
  const { categories, filterByCategory } = useProducts();
  const navigate = useNavigate();

  const categoryClickHandler = (categoryName) => {
    filterByCategory(categoryName);
    navigate("/products");
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {categories.length > 0 &&
        categories.map(({ _id, categoryName, description }) => (
          <div
            onClick={() => categoryClickHandler(categoryName)}
            key={_id}
            style={{
              border: "1px solid",
              height: "300px",
              width: "200px",
              cursor: "pointer",
            }}
          >
            <h3>{categoryName}</h3>
            <p>{description}</p>
          </div>
        ))}
    </div>
  );
};

export default CategoriesListing;
