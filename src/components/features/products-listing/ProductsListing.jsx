import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

const ProductsListing = () => {
  const { products } = useProducts();

  return (
    <div style={{ display: "flex", margin: "1rem auto", justifyContent:'center' }}>
      {products.length > 0 &&
        products.map(({ id, title, author, price, categoryName }) => (
          <div
            key={id}
            style={{
              border: "1px solid",
              height: "300px",
              width: "200px",
              margin: "1rem",
            }}
          >
            <h3>{title}</h3>
            <p>{author}</p>
            <p>{price}</p>
            <p>{categoryName}</p>
          </div>
        ))}
    </div>
  );
};

export default ProductsListing;
