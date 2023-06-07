import { MdSell } from "react-icons/md";
import { useNavigate } from "react-router";

import "./CartItemsSummary.css";
import { useProducts } from "../../../../core/contexts/products-context/ProductsContext";
import { useOrderAddress } from "../../../../core/contexts/order-address-context/OrderAddressContext";
import CustomModal from "../../../shared/custom-modal-component/CustomModal";
import { useState } from "react";
import { toast } from "react-toastify";

const CartItemsSummary = () => {
  const { cart } = useProducts();
  const { setCurrentOrderDetails, orderHistory } = useOrderAddress();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCouponApplied, setCouponApplied] = useState(false);
  const [coupon, setCoupon] = useState(0);

  const totalPrice = cart.reduce((acc, { price, qty }) => acc + price * qty, 0);
  const totalPriceAfterDiscount =
    totalPrice - 0.1 * totalPrice - coupon * totalPrice;

  const discountedPrice = totalPrice - totalPriceAfterDiscount;

  const handleCheckout = () => {
    const currentOrderDetails = {
      cart,
      totalPrice,
      totalPriceAfterDiscount,
      discountedPrice,
      isCouponApplied,
      coupon,
    };
    setCurrentOrderDetails(currentOrderDetails);
    navigate("/checkout");
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const cancelCouponApply = () => {
    setCoupon(0);
    setCouponApplied(false);
    handleCloseModal();
  };

  const handleCouponInputValue = (event) => {
    const { value } = event.target;
    setCoupon(Number(value));
  };

  const handleCouponApply = () => {
    setCouponApplied(true);
    handleCloseModal();
    toast.success(`Coupon FLAT${coupon * 100}% applied.`);
  };

  return (
    <div className="cart-items-summary">
      <div className="cart-items-summary-container">
        <h3>Cart Summary</h3>
        <div className="coupon-container">
          <button className="coupon-apply-btn" onClick={handleOpenModal}>
            <span className="apply-coupon-icon">
              <MdSell size={18} />
            </span>
            Apply Coupon
          </button>
        </div>
        <div className="price-details-section">
          <div className="price-detail">
            <p>Price({cart.length} items)</p> <p>₹{totalPrice.toFixed(2)}</p>
          </div>
          <div className="price-detail">
            <p>Discount:</p> <p>- ₹{discountedPrice.toFixed(2)}</p>
          </div>

          {isCouponApplied && (
            <div className="price-detail">
              <p>Applied Coupon:</p>
              <p>{`FLAT${coupon * 100}%`}</p>
            </div>
          )}

          <div className="price-detail">
            <p>Delivery Charges:</p>
            <p className="delivery-charges">Free</p>
          </div>
          <hr />
          <div className="price-detail total-amount">
            <p>Total Amount:</p> <p>₹{totalPriceAfterDiscount.toFixed(2)}</p>
          </div>
        </div>

        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
      <CustomModal isOpen={isModalOpen} onClose={cancelCouponApply}>
        <div className="coupon-section">
          <h3>Apply Coupon</h3>
          <div className="radio-type-container">
            <div className="radio-type">
              <label>
                <input
                  type="radio"
                  checked={coupon === 0.25}
                  onChange={handleCouponInputValue}
                  value={0.25}
                  disabled={orderHistory?.length > 0}
                />
                FLAT25%
              </label>
              <p>
                Get 25% off on your first order! Offer is valid only for the
                first order.
              </p>
            </div>
            <div className="radio-type">
              <label>
                <input
                  type="radio"
                  checked={coupon === 0.1}
                  onChange={handleCouponInputValue}
                  value={0.1}
                  disabled={totalPriceAfterDiscount < 3000}
                />
                FLAT10%
              </label>
              <p>Get 10% flat discount if total price is ₹3000 or more.</p>
            </div>
          </div>
          <div className="coupon-action">
            <button disabled={coupon === 0} onClick={handleCouponApply}>
              Apply
            </button>
          </div>
        </div>
      </CustomModal>
    </div>
  );
};

export default CartItemsSummary;
