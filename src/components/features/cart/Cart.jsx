import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import "./Cart.css";
import CartItemsListing from "./cart-items-listing/CartItemsListing";
import CartItemsSummary from "./cart-items-summary/CartItemsSummary";

const Cart = () => {
  const { cart } = useProducts();

  return (
    <div className="cart-container-section">
      <h2>My Cart</h2>
      {cart?.length > 0 && (
        <div className="cart-items-list-summary">
          <CartItemsListing />
          <CartItemsSummary />
        </div>
      )}
      {cart?.length < 1 && <h3>No products found in the cart.</h3>}
    </div>
  );
};

export default Cart;
