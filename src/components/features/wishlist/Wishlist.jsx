import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaCartPlus, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import { BsCartDashFill } from "react-icons/bs";
import { toast } from "react-toastify";

import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import "./Wishlist.css";

const Wishlist = () => {
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

  const handleCartUpdate = (productId, productTitle) => {
    updateCartProduct(productId, "increment");
    toast.success(`${productTitle}'s quantity increased in the cart.`, {
      theme: "colored",
    });
  };

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
                          ? handleCartUpdate(_id, title)
                          : addProductToCart(product)
                      }
                    >
                      {isCartContainsProduct(_id) ? (
                        <FaCartPlus />
                      ) : (
                        <FaShoppingCart />
                      )}
                      {isCartContainsProduct(_id)
                        ? "Add Another"
                        : "Add to Cart"}
                    </button>
                    <button
                      className="wishlist-item-delete"
                      onClick={() => removeProductFromWishlist(_id, title)}
                    >
                      <BsCartDashFill /> Remove
                    </button>
                  </div>
                </div>
              );
            })}
          {wishlist?.length < 1 && (
            <div>
              <h3>No products found in the wishlist</h3>
              <img
                className="not-found-img"
                src="https://res.cloudinary.com/dbe8yf165/image/upload/v1686160027/cricify/misc/undraw_wishlist_re_m7tv_xlqghh.svg"
                alt="wishlist plus"
              />
            </div>
          )}
          <button
            className="back-to-store-btn"
            onClick={() => navigate("/products")}
          >
            <FaStore /> Back to Store
          </button>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
