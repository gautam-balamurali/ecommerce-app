import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

const Cart = () => {
  const { cart } = useProducts();
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
            const { id, title, author, price, categoryName } = product;
            return (
              <div
                key={id}
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
              </div>
            );
          })}
        {cart?.length < 1 && <h3>No items added to cart.</h3>}
      </div>
    </>
  );
};

export default Cart;
