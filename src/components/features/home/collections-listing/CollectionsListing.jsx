import { useNavigate } from "react-router";

import { collections } from "../../../../config/AppConfig";
import { useProducts } from "../../../../core/contexts/products-context/ProductsContext";
import "./CollectionsListing.css";

const CollectionsListing = () => {
  const { filterByCollection } = useProducts();
  const navigate = useNavigate();
  const collectionClickHandler = (collectionName) => {
    filterByCollection(collectionName);
    navigate("/products");
  };

  return (
    <div className="collections-section">
      <h2>Collections</h2>
      <div className="collection-contents">
        {collections.length > 0 &&
          collections.map(({ _id, collectionName, imageUrl }) => (
            <div
              onClick={() => collectionClickHandler(collectionName)}
              key={_id}
              className="collection"
            >
              <img src={imageUrl} alt={collectionName} />
              <h3>{collectionName}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CollectionsListing;
