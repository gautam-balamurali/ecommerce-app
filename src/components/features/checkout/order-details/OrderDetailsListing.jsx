import { useState } from "react";
import { v4 as uuid } from "uuid";

import { useOrderAddress } from "../../../../core/contexts/order-address-context/OrderAddressContext";
import "./OrderDetailsListing.css";
import CustomModal from "../../../shared/custom-modal-component/CustomModal";
import { useNavigate } from "react-router";
import { useProducts } from "../../../../core/contexts/products-context/ProductsContext";
import Confetti from "react-confetti";
import { toast } from "react-toastify";

const OrderDetailsListing = () => {
  const navigate = useNavigate();
  const {
    currentOrderDetails,
    selectedAddress,
    addOrderDetails,
    addressHistory,
  } = useOrderAddress();
  const { removeProductFromCart } = useProducts();

  const [isModalOpen, setModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    cart,
    totalPrice,
    totalPriceAfterDiscount,
    discountedPrice,
    isCouponApplied,
    coupon,
  } = currentOrderDetails ?? {};

  const displayConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      toast.success("Order placed successfully!");
      handleCloseModal();
      navigate("/order-history");
    }, 5000);
  };

  const placeOrderClickHandler = () => {
    addOrderDetails({
      ...currentOrderDetails,
      _id: uuid(),
      date: new Date(),
      address: selectedAddress,
    });
    handleOpenModal();
    cart.forEach((item) => removeProductFromCart(item._id, item.title, false));
    displayConfetti();
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const goToHomePage = () => {
    handleCloseModal();
    navigate("/");
  };

  const goToProductsPage = () => {
    handleCloseModal();
    navigate("/products");
  };

  const goToViewOrdersPage = () => {
    handleCloseModal();
    navigate("/order-history");
  };

  return (
    <div className="order-details-checkout">
      {currentOrderDetails && (
        <div className="order-details-container">
          <h3>Order Details</h3>
          <div className="cart-order-items">
            <div className="order-items-header">
              <h4>Product</h4>
              <h4>Price x Qty</h4>
            </div>
            <ol className="ordered-items-list">
              {cart?.length > 0 &&
                cart.map(({ _id, title, price, qty }, index) => (
                  <li key={_id} className="order-items-content">
                    <p className="order-product-name">
                      ({index + 1}) {title}
                    </p>
                    <p className="order-product-qty">
                      ₹{price} x {qty}
                    </p>
                  </li>
                ))}
            </ol>
          </div>
          <h3>Price Details</h3>
          <div className="order-cart-items-summary-container">
            <div className="order-price-details-section">
              <div className="order-price-detail">
                <p>Price({cart?.length} items)</p>
                <p>₹{totalPrice?.toFixed(2)}</p>
              </div>
              <div className="order-price-detail">
                <p>Discount:</p> <p>- ₹{discountedPrice?.toFixed(2)}</p>
              </div>

              {isCouponApplied && (
                <div className="order-price-detail">
                  <p>Applied Coupon:</p>
                  <p>{`FLAT${coupon * 100}%`}</p>
                </div>
              )}

              <div className="order-price-detail">
                <p>Delivery Charges:</p>
                <p className="order-delivery-charges">Free</p>
              </div>
              <hr />
              <div className="order-price-detail total-amount">
                <p>Total Amount:</p>{" "}
                <p>₹{totalPriceAfterDiscount?.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <h3>Deliver To</h3>
          <div className="order-address">
            {selectedAddress && (
              <>
                <h4>{selectedAddress.name}</h4>
                <p>
                  <span>{selectedAddress.mobile}</span>
                </p>
                <p>
                  <span>{selectedAddress.street}</span>
                </p>
                <p>
                  <span>{selectedAddress.city}</span>
                </p>
                <p>
                  <span> {selectedAddress.zipCode}</span>,
                  <span> {selectedAddress.state}</span>
                </p>
                <p>
                  <span>{selectedAddress.country}</span>
                </p>
              </>
            )}
            {!selectedAddress && (
              <p>Please select an address to deliver your order.</p>
            )}
          </div>
          <button
            disabled={!selectedAddress || addressHistory?.length < 1}
            onClick={placeOrderClickHandler}
            className="place-order-btn"
          >
            Place Order
          </button>
        </div>
      )}
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        showCloseButton={false}
      >
        <h1>🎉 Your order has been placed successfully! Thank you. 🎉</h1>
        <div className="success-action-btns">
          <button className="success-btn" onClick={goToHomePage}>
            Go to Home
          </button>
          <button className="success-btn" onClick={goToProductsPage}>
            Do more Shopping
          </button>
          <button className="success-btn" onClick={goToViewOrdersPage}>
            View all your Orders
          </button>
        </div>
      </CustomModal>
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={1000}
          style={{ position: "fixed", top: 0, left: 0, zIndex: 9999 }}
        />
      )}
    </div>
  );
};

export default OrderDetailsListing;
