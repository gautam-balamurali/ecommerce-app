import { useNavigate } from "react-router";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import "./Cart.css";
import CartItemsListing from "./cart-items-listing/CartItemsListing";
import CartItemsSummary from "./cart-items-summary/CartItemsSummary";
import { FaStore } from "react-icons/fa";

const Cart = () => {
  const { cart } = useProducts();
  const navigate = useNavigate();

  return (
    <div className="cart-container-section">
      <h2>My Cart</h2>
      {cart?.length > 0 && (
        <div className="cart-items-list-summary">
          <CartItemsListing />
          <CartItemsSummary />
        </div>
      )}
      {cart?.length < 1 && (
        <div className="not-found">
          <h3>No products found in the cart</h3>
          <img
            className="list-loading-image"
            src="https://res.cloudinary.com/dbe8yf165/image/upload/v1686160027/cricify/misc/undraw_empty_cart_co35_atl4xc.svg"
            alt="cart plus"
          />
        </div>
      )}
      <button
        className="back-to-store-btn"
        onClick={() => navigate("/products")}
      >
        <FaStore /> Back to Store
      </button>
    </div>
  );
};

export default Cart;
