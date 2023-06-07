import { useOrderAddress } from "../../../core/contexts/order-address-context/OrderAddressContext";
import "./Checkout.css";
import AddressSelectionListing from "./address-selection-listing/AddressSelectionListing";
import OrderDetailsListing from "./order-details/OrderDetailsListing";

const Checkout = () => {
  const { currentOrderDetails } = useOrderAddress();

  return (
    <div className="checkout-section">
      <h2>Checkout Page</h2>
      <div className="checkout-container">
        {currentOrderDetails && (
          <div className="address-selection-container">
            <h3>Select a Delivery Address</h3>
            <AddressSelectionListing />
          </div>
        )}
        <OrderDetailsListing />
      </div>
      {!currentOrderDetails && (
        <div className="not-found">
          <h3>Add some products to the cart to checkout.</h3>
          <img
            className="list-loading-image"
            src="https://res.cloudinary.com/dbe8yf165/image/upload/v1686333933/cricify/undraw_add_to_cart_re_wrdo_xcogpy.svg"
            alt="checkout"
          />
        </div>
      )}
    </div>
  );
};

export default Checkout;
