import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

import { useProducts } from "../../../../core/contexts/products-context/ProductsContext";
import "./CartItemsListing.css";
import { BsCartDashFill } from "react-icons/bs";

const CartItemsListing = () => {
  const {
    cart,
    wishlist,
    updateCartProduct,
    removeProductFromCart,
    removeProductFromWishlist,
    addProductToWishlist,
  } = useProducts();

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const isWishlistContainsProduct = (productId) =>
    wishlist.find((product) => product._id === productId);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cart-listing-section">
      <div className="cart-layout">
        <div className="cart-listing">
          {cart.length > 0 &&
            cart.map((product) => {
              const { _id, title, price, rating, images, qty } = product;
              return (
                <div key={_id} className="cart-product-container">
                  <span
                    className={`cart-wishlist-heart ${
                      isWishlistContainsProduct(_id) ? "cart-favorite" : ""
                    }`}
                    onClick={() =>
                      isWishlistContainsProduct(_id)
                        ? removeProductFromWishlist(_id, title)
                        : addProductToWishlist(product)
                    }
                  >
                    {isWishlistContainsProduct(_id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </span>
                  <div className="cart-product-image-container">
                    {images.map((imageUrl, index) => (
                      <img
                        key={index}
                        className={`cart-product-image ${
                          index === currentIndex && images.length > currentIndex
                            ? "active"
                            : ""
                        }`}
                        src={imageUrl}
                        alt={title}
                      />
                    ))}
                  </div>
                  <div className="cart-product-info">
                    <div className="cart-title-rating">
                      <h3
                        title={title}
                        onClick={() => navigate(`/product/${_id}`)}
                      >
                        {title}
                      </h3>
                      <div
                        className={
                          rating >= 3
                            ? "cart-rating-star-high"
                            : "cart-rating-star-low"
                        }
                      >
                        <span>{rating}</span>
                        <span>
                          <FaStar />
                        </span>
                      </div>
                    </div>
                    <div className="cart-price-info">
                      <p className="cart-discounted-price">
                        {(price - 0.1 * price).toFixed(0)}
                      </p>
                      <p className="cart-price-tag">{price}</p>
                    </div>
                    <div className="inc-dec-btns">
                      <button
                        className="cart-inc-dec-btn"
                        disabled={qty < 2}
                        onClick={() => updateCartProduct(_id, "decrement")}
                      >
                        -
                      </button>
                      <p>{qty}</p>
                      <button
                        className="cart-inc-dec-btn"
                        onClick={() => updateCartProduct(_id, "increment")}
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="cart-delete-btn"
                      onClick={() => removeProductFromCart(_id, title)}
                    >
                      <BsCartDashFill /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          {cart?.length < 1 && <h3>No products found in the cart.</h3>}
        </div>
      </div>
    </div>
  );
};

export default CartItemsListing;
