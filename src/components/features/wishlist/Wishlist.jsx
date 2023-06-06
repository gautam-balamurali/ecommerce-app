import { useEffect, useState } from "react";

import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import "./Wishlist.css";
import { useNavigate } from "react-router";
import { FaCartPlus, FaShoppingCart, FaStar } from "react-icons/fa";
import { BsCartDashFill } from "react-icons/bs";

const Wishlist = () => {
  // const {
  //   cart,
  //   wishlist,
  //   removeProductFromWishlist,
  //   addProductToCart,
  //   updateCartProduct,
  // } = useProducts();

  // const isCartContainsProduct = (productId) =>
  //   cart.find((product) => product._id === productId);
  // return (
  //   <>
  //     <h2>Wishlist Page</h2>
  //     <div
  //       style={{
  //         display: "flex",
  //         margin: "1rem auto",
  //         justifyContent: "center",
  //       }}
  //     >
  //       {wishlist?.length > 0 &&
  //         wishlist.map((product) => {
  //           const { _id, title, author, price, categoryName } = product;
  //           return (
  //             <div
  //               key={_id}
  //               style={{
  //                 border: "1px solid",
  //                 height: "300px",
  //                 width: "200px",
  //                 margin: "1rem",
  //               }}
  //             >
  //               <h3>{title}</h3>
  //               <p>{author}</p>
  //               <p>{price}</p>
  //               <p>{categoryName}</p>
  //               <button onClick={() => removeProductFromWishlist(_id)}>
  //                 Remove from Wishlist
  //               </button>
  //               <button
  //                 onClick={() =>
  //                   isCartContainsProduct(_id)
  //                     ? updateCartProduct(_id, "increment")
  //                     : addProductToCart(product)
  //                 }
  //               >
  //                 Add to Cart
  //               </button>
  //             </div>
  //           );
  //         })}
  //       {wishlist?.length < 1 && <h3>No items added to wishlist.</h3>}
  //     </div>
  //   </>
  // );
  const {
    cart,
    wishlist,
    removeProductFromWishlist,
    addProductToCart,
    updateCartProduct,
  } = useProducts();

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const isCartContainsProduct = (productId) =>
    cart.find((product) => product._id === productId);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wishlist-listing-section">
      <h2>My Wishlist</h2>
      <div className="wishlist-layout">
        <div className="wishlist-listing">
          {wishlist.length > 0 &&
            wishlist.map((product) => {
              const { _id, title, price, rating, images } = product;
              return (
                <div key={_id} className="wishlist-product-container">
                  <div className="wishlist-product-image-container">
                    {images.map((imageUrl, index) => (
                      <img
                        key={index}
                        className={`wishlist-product-image ${
                          index === currentIndex && images.length > currentIndex
                            ? "active"
                            : ""
                        }`}
                        src={imageUrl}
                        alt={title}
                      />
                    ))}
                  </div>
                  <div className="wishlist-product-info">
                    <div className="wishlist-title-rating">
                      <h3
                        title={title}
                        onClick={() => navigate(`/product/${_id}`)}
                      >
                        {title}
                      </h3>
                      <div
                        className={
                          rating >= 3
                            ? "wishlist-rating-star-high"
                            : "wishlist-rating-star-low"
                        }
                      >
                        <span>{rating}</span>
                        <span>
                          <FaStar />
                        </span>
                      </div>
                    </div>
                    <div className="wishlist-price-info">
                      <p className="wishlist-discounted-price">
                        {(price - 0.1 * price).toFixed(0)}
                      </p>
                      <p className="wishlist-price-tag">{price}</p>
                    </div>
                    <button
                      className="wishlist-add-to-wishlist-btn"
                      onClick={() =>
                        isCartContainsProduct(_id)
                          ? updateCartProduct(_id, "increment")
                          : addProductToCart(product)
                      }
                    >
                      {isCartContainsProduct(_id) ? (
                        <FaCartPlus />
                      ) : (
                        <FaShoppingCart />
                      )}{" "}
                      Add to Cart
                    </button>
                    <button
                      className="wishlist-item-delete"
                      onClick={() => removeProductFromWishlist(_id)}
                    >
                      <BsCartDashFill /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          {wishlist?.length < 1 && <h3>No products found in the wishlist.</h3>}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
