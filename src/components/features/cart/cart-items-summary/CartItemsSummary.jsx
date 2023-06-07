import { MdSell } from "react-icons/md";
import { useNavigate } from "react-router";

import "./CartItemsSummary.css";
import { useProducts } from "../../../../core/contexts/products-context/ProductsContext";
import { useOrderAddress } from "../../../../core/contexts/order-address-context/OrderAddressContext";

const CartItemsSummary = ({ setShowCouponModal, isCouponApplied, coupon }) => {
  const { cart } = useProducts();
  const { setCurrentOrderDetails } = useOrderAddress();
  const navigate = useNavigate();

  const totalPrice = cart.reduce((acc, { price, qty }) => acc + price * qty, 0);

  const totalPriceAfterDiscount = totalPrice - 0.1 * totalPrice;

  // Calculate the total price with discount and coupon
  //   const totalPrice = totalMrp - 500 - (isCouponApplied ? coupon : 0);

  // Calculate the discount based on the quantity
  // const discountedPrice = 500 + (quantity - 1) * 500;
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

  return (
    <div className="cart-items-summary">
      <div className="cart-items-summary-container">
        <h3>Cart Summary</h3>
        <div className="coupon-container">
          <button
            className="coupon-apply-btn"
            onClick={() => setShowCouponModal(true)}
          >
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
              <p>₹{coupon}</p>
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
    </div>
  );
};

export default CartItemsSummary;
