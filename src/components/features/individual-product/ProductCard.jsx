import { useNavigate } from "react-router-dom";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const {
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

  const { _id, title, author, price, categoryName } = product ?? {};

  return (
    <>
      <h2>Product Details</h2>
      {product && (
        <div
          style={{
            display: "flex",
            margin: "1rem auto",
            justifyContent: "center",
          }}
        >
          <div
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
        </div>
      )}
      {!product && <h3>Product details not found.</h3>}
    </>
  );
};

export default ProductCard;
