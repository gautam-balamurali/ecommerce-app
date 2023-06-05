import { useNavigate } from "react-router-dom";

import "./CategoriesListing.css";
import { useProducts } from "../../../../core/contexts/products-context/ProductsContext";
import { useEffect, useState } from "react";

const CategoriesListing = () => {
  const { categories, filterByCategory } = useProducts();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const categoryClickHandler = (categoryName) => {
    filterByCategory(categoryName);
    navigate("/products");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
                {images.map((imageUrl, index) => (
                  <img
                    key={index}
                    className={`carousel-image ${
                      index === currentIndex ? "active" : ""
                    }`}
                    src={imageUrl}
                    alt={categoryName}
                  />
                ))}
              </div>
              <h5>{categoryName}</h5>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoriesListing;
