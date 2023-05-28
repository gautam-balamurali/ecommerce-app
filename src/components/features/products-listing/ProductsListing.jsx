import { Link, useNavigate } from "react-router-dom";

import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import { useAuthentication } from "../../../core/contexts/authentication-context/AuthenticationContext";
import Filters from "./filters/Filters";

const ProductsListing = () => {
  const navigate = useNavigate();
  const { token } = useAuthentication();

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
    <div className="products-listing-section">
      <Filters />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {products.length > 0 &&
          products.map((product) => {
            const { _id, title, author, price, categoryName, rating } = product;
            return (
              <div
                key={_id}
                style={{
                  border: "1px solid",
                  height: "300px",
                  width: "200px",
                }}
              >
                <h3>{title}</h3>
                <p>{author}</p>
                <p>{price}</p>
                <p>{categoryName}</p>
                <p>{rating}⭐</p>
                <Link to={`/product/${_id}`}>View details</Link>
                <button
                  onClick={() =>
                    token
                      ? isCartContainsProduct(_id)
                        ? navigate("/cart")
                        : addProductToCart(product)
                      : navigate("/login")
                  }
                >
                  {isCartContainsProduct(_id) ? "Go to Cart" : "Add to Cart"}
                </button>
                <button
                  onClick={() =>
                    token
                      ? isWishlistContainsProduct(_id)
                        ? removeProductFromWishlist(_id)
                        : addProductToWishlist(product)
                      : navigate("/login")
                  }
                >
                  {isWishlistContainsProduct(_id)
                    ? "Remove from Wishlist"
                    : "Add to wishlist"}
                </button>
              </div>
            );
          })}
        {products?.length < 1 && <h3>No products found.</h3>}
      </div>
    </div>
  );
};

export default ProductsListing;
