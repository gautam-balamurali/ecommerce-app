import { useNavigate } from "react-router-dom";

import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

const ProductsListing = () => {
  const navigate = useNavigate();

  const { products, cart, wishlist, addProductToCart, addProductToWishlist } =
    useProducts();

  const isCartContainsProduct = (productId) =>
    cart.find((product) => product.id === productId);
  const isWishlistContainsProduct = (productId) =>
    wishlist.find((product) => product.id === productId);

  return (
    <>
      <h2>Products Listing</h2>
      <div
        style={{
          display: "flex",
          margin: "1rem auto",
          justifyContent: "center",
        }}
      >
        {products.length > 0 &&
          products.map((product) => {
            const { id, title, author, price, categoryName } = product;
            return (
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
                <button
                  onClick={() =>
                    isCartContainsProduct(id)
                      ? navigate("/cart")
                      : addProductToCart(product)
                  }
                >
                  {isCartContainsProduct(id) ? "Go to Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() =>
                    isWishlistContainsProduct(id)
                      ? navigate("/wishlist")
                      : addProductToWishlist(product)
                  }
                >
                  {isWishlistContainsProduct(id)
                    ? "Go to Wishlist"
                    : "Add to wishlist"}
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductsListing;
