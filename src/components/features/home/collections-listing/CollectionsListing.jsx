import "./CollectionsListing.css";
import { v4 as uuid } from "uuid";

const CollectionsListing = () => {
  const collections = [
    {
      _id: uuid(),
      collectionName: "men",
      imageUrl:
        "https://res.cloudinary.com/dbe8yf165/image/upload/v1685866682/cricify/team-bg1_cn2jeo.jpg",
    },
    {
      _id: uuid(),
      collectionName: "women",
      imageUrl:
        "https://res.cloudinary.com/dbe8yf165/image/upload/v1685796128/cricify/women%27s-international/team-bg2_vzglms.jpg",
    },
  ];
  return (
    <div className="collections-section">
      <h2>Collections</h2>
      <div className="collection-contents">
        {collections.length > 0 &&
          collections.map(({ _id, collectionName, imageUrl }) => (
            <div
              //   onClick={() => categoryClickHandler(collectionName)}
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
