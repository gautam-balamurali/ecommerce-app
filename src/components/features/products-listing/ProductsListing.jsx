import { Link, useNavigate } from "react-router-dom";

import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

const ProductsListing = () => {
  const navigate = useNavigate();

  const {
    products,
    cart,
    wishlist,
    addProductToCart,
    addProductToWishlist,
    removeProductFromWishlist,
  } = useProducts();

  const isCartContainsProduct = (productId) =>
    cart.find((product) => product._id === productId);
  const isWishlistContainsProduct = (productId) =>
    wishlist.find((product) => product._id === productId);

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
            const { _id, title, author, price, categoryName } = product;
            return (
              <div
                key={_id}
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
                <Link to={`/product/${_id}`}>View details</Link>
                <button
                  onClick={() =>
                    isCartContainsProduct(_id)
                      ? navigate("/cart")
                      : addProductToCart(product)
                  }
                >
                  {isCartContainsProduct(_id) ? "Go to Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() =>
                    isWishlistContainsProduct(_id)
                      ? removeProductFromWishlist(_id)
                      : addProductToWishlist(product)
                  }
                >
                  {isWishlistContainsProduct(_id)
                    ? "Remove from Wishlist"
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
