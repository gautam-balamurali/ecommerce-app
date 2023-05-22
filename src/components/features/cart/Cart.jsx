import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

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

  return (
    <>
      <h2>Cart Page</h2>
      <div
        style={{
          display: "flex",
          margin: "1rem auto",
          justifyContent: "center",
        }}
      >
        {cart?.length > 0 &&
          cart.map((product) => {
            const { _id, title, author, price, categoryName, qty } = product;
            return (
              <div
                key={_id}
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
                <p style={{ display: "inline-block" }}>Quantity: {qty}</p>
                <div
                  style={{ display: "inline-block", margin: "auto 1rem" }}
                  className="inc-dec-btns"
                >
                  <button
                    disabled={qty < 2}
                    onClick={() => updateCartProduct(_id, "decrement")}
                  >
                    -
                  </button>
                  <button onClick={() => updateCartProduct(_id, "increment")}>
                    +
                  </button>
                </div>
                <button onClick={() => removeProductFromCart(_id)}>
                  Remove from Cart
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
            );
          })}
        {cart?.length < 1 && <h3>No items added to cart.</h3>}
      </div>
    </>
  );
};

export default Cart;
