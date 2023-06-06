import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import "./Cart.css";
import CartItemsListing from "./cart-items-listing/CartItemsListing";

const Cart = () => {
  const {
    cart,
    wishlist,
    updateCartProduct,
    removeProductFromCart,
    removeProductFromWishlist,
    addProductToWishlist,
  } = useProducts();

  const isWishlistContainsProduct = (productId) =>
    wishlist.find((product) => product._id === productId);

  const getSubTotalPrice = () =>
    cart.reduce((acc, { price, qty }) => acc + price * qty, 0);

  const getGSTPrice = (price) => {
    switch (price) {
      case price <= 1000:
        return 0.05 * price;
      default:
        return 0.12 * price;
    }
  };

  return (
    // <>
    //   <h2>Cart Page</h2>
    //   <div className="cart-container">
    //     {cart?.length > 0 && (
    //       <div className="cart-items">
    //         {cart.map((product) => {
    //           const { _id, title, author, price, categoryName, qty } = product;
    //           return (
    //             <div key={_id} className="cart-item">
    //               <h3>{title}</h3>
    //               <p>{author}</p>
    //               <p>{price}</p>
    //               <p>{categoryName}</p>
    //               <p style={{ display: "inline-block" }}>Quantity: {qty}</p>
    //               <div
    //                 style={{ display: "inline-block", margin: "auto 1rem" }}
    //                 className="inc-dec-btns"
    //               >
    //                 <button
    //                   disabled={qty < 2}
    //                   onClick={() => updateCartProduct(_id, "decrement")}
    //                 >
    //                   -
    //                 </button>
    //                 <button onClick={() => updateCartProduct(_id, "increment")}>
    //                   +
    //                 </button>
    //               </div>
    //               <button onClick={() => removeProductFromCart(_id)}>
    //                 Remove from Cart
    //               </button>
    //               <button
    //                 onClick={() =>
    //                   isWishlistContainsProduct(_id)
    //                     ? removeProductFromWishlist(_id)
    //                     : addProductToWishlist(product)
    //                 }
    //               >
    //                 {isWishlistContainsProduct(_id)
    //                   ? "Remove from Wishlist"
    //                   : "Add to wishlist"}
    //               </button>
    //             </div>
    //           );
    //         })}
    //       </div>
    //     )}
    //     {/* checkout price */}
    //     {cart?.length > 0 && (
    //       <div className="price-layout">
    //         <div className="review-card">
    //           <h1>Review Order</h1>

    //           <div className="item-info-headings">
    //             <div className="item-heading">
    //               <h5>ITEM</h5>
    //             </div>
    //             <div className="item-price-headings">
    //               <div className="quantity-heading">
    //                 <h5>QTY</h5>
    //               </div>
    //               <div className="total-heading">
    //                 <h5>TOTAL</h5>
    //               </div>
    //             </div>
    //           </div>

    //           <div className="cart-items-info">
    //             {cart.map(({ _id, title, price, qty }) => (
    //               <div key={_id} className="item-info-contents">
    //                 <div className="item">
    //                   <div className="item-title">
    //                     <p>{title}</p>
    //                   </div>
    //                 </div>
    //                 <div className="item-price">
    //                   <div className="quantity">
    //                     <p>{qty}</p>
    //                   </div>
    //                   <div className="total">
    //                     <p>INR {price}</p>
    //                   </div>
    //                 </div>
    //               </div>
    //             ))}
    //           </div>

    //           <div className="total-price">
    //             <p>Subtotal</p>
    //             <p className="price">INR {getSubTotalPrice()}</p>
    //           </div>
    //           <div className="total-price">
    //             <p>GST</p>
    //             <p className="price">
    //               INR {getGSTPrice(getSubTotalPrice()).toFixed(2)}
    //             </p>
    //           </div>
    //           <div className="total-price">
    //             <h3>Grand Total</h3>
    //             <h3>
    //               INR{" "}
    //               {(
    //                 getSubTotalPrice() + getGSTPrice(getSubTotalPrice())
    //               ).toFixed(2)}
    //             </h3>
    //           </div>
    //           <button className="order-btn">PLACE ORDER</button>
    //           <p className="razor-pay">Cart Not Secured by Razorpay</p>
    //         </div>
    //       </div>
    //     )}
    //     {cart?.length < 1 && <h3>No items added to cart.</h3>}
    //   </div>
    // </>
    <div className="cart-container-section">
      <h2>My Cart</h2>
      <CartItemsListing />
    </div>
  );
};

export default Cart;
