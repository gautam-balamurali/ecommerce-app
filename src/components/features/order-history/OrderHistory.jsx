import { useNavigate } from "react-router";
import { useOrderAddress } from "../../../core/contexts/order-address-context/OrderAddressContext";
import "./OrderHistory.css";

const OrderHistory = () => {
  const { orderHistory } = useOrderAddress();
  const navigate = useNavigate();

  return (
    <div className="order-history-details">
      <h2>My Orders</h2>
      {orderHistory?.length > 0 &&
        orderHistory.map(
          ({
            _id,
            date,
            cart,
            totalPrice,
            totalPriceAfterDiscount,
            discountedPrice,
            isCouponApplied,
            coupon,
            address,
          }) => (
            <div key={_id} className="order-details-container">
              <h3>Order Details made on {date?.toLocaleString()}</h3>
              <div className="cart-order-items">
                <div className="order-items-header">
                  <h4>Product</h4>
                  <h4>Price x Qty</h4>
                </div>
                <ol className="ordered-items-list">
                  {cart?.length > 0 &&
                    cart.map(({ _id: id, title, price, qty }, index) => (
                      <li key={id} className="order-items-content">
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
                      <p>₹{coupon}</p>
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
              <h3>Delivered To</h3>
              <div className="order-address">
                {address && (
                  <>
                    <h4>{address.name}</h4>
                    <p>
                      <span>{address.mobile}</span>
                    </p>
                    <p>
                      <span>{address.street}</span>
                    </p>
                    <p>
                      <span>{address.city}</span>
                    </p>
                    <p>
                      <span> {address.zipCode}</span>,
                      <span> {address.state}</span>
                    </p>
                    <p>
                      <span>{address.country}</span>
                    </p>
                  </>
                )}
              </div>
            </div>
          )
        )}
      {orderHistory?.length < 1 && (
        <div>
          <h4>
            Your order list is empty. Visit our store and do some shopping.✌🏼
          </h4>
          <img
            className="not-found-img"
            src="https://res.cloudinary.com/dbe8yf165/image/upload/v1686160437/cricify/misc/undraw_payments_re_77x0_yc32k0.svg"
            alt="order plus"
          />
        </div>
      )}
      <button className="place-order-btn" onClick={() => navigate("/products")}>
        Visit Store
      </button>
    </div>
  );
};

export default OrderHistory;
