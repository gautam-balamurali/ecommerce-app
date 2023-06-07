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
      {!currentOrderDetails && <h3>Add some products to cart to checkout.</h3>}
    </div>
  );
};

export default Checkout;
