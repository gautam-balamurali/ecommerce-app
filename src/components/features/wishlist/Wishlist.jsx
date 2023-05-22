import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

const Wishlist = () => {
  const {
    cart,
    wishlist,
    removeProductFromWishlist,
    addProductToCart,
    updateCartProduct,
  } = useProducts();

  const isCartContainsProduct = (productId) =>
    cart.find((product) => product._id === productId);
  return (
    <>
      <h2>Wishlist Page</h2>
      <div
        style={{
          display: "flex",
          margin: "1rem auto",
          justifyContent: "center",
        }}
      >
        {wishlist?.length > 0 &&
          wishlist.map((product) => {
            const { _id, title, author, price, categoryName } = product;
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
                <button onClick={() => removeProductFromWishlist(_id)}>
                  Remove from Wishlist
                </button>
                <button
                  onClick={() =>
                    isCartContainsProduct(_id)
                      ? updateCartProduct(_id, "increment")
                      : addProductToCart(product)
                  }
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        {wishlist?.length < 1 && <h3>No items added to wishlist.</h3>}
      </div>
    </>
  );
};

export default Wishlist;
