import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaCartPlus,
  FaHeart,
  FaRegHeart,
  FaShippingFast,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { BsAwardFill, BsFillCartXFill } from "react-icons/bs";

import "./ProductDetails.css";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import { useAuthentication } from "../../../core/contexts/authentication-context/AuthenticationContext";
import { MdLocalShipping, MdSell } from "react-icons/md";

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const { token } = useAuthentication();
  const {
    cart,
    wishlist,
    addProductToCart,
    addProductToWishlist,
    removeProductFromWishlist,
    isLoading,
    errorDetails,
  } = useProducts();

  const isCartContainsProduct = (productId) =>
    cart.find((product) => product._id === productId);

  const isWishlistContainsProduct = (productId) =>
    wishlist.find((product) => product._id === productId);

  const {
    _id,
    title,
    price,
    categoryName,
    size,
    rating,
    images,
    description,
    inStock,
    isTrending,
    men,
    women,
    ipl,
    wpl,
    international,
  } = product ?? {};

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="product-details-overlay">
      {product && (
        <div className="product-container-product-details">
          {isTrending && <span className="card-badge">Trending</span>}
          <span
            title="Add to Wishlist"
            className={`wishlist-heart-product-details ${
              isWishlistContainsProduct(_id) ? "favorite" : ""
            }`}
            onClick={() =>
              token
                ? isWishlistContainsProduct(_id)
                  ? removeProductFromWishlist(_id, title)
                  : addProductToWishlist(product)
                : navigate("/login")
            }
          >
            {isWishlistContainsProduct(_id) ? <FaHeart /> : <FaRegHeart />}
          </span>
          <div
            className={
              inStock
                ? "product-image-container-product-details"
                : "product-image-container-product-details-out-stock"
            }
          >
            {images?.map((imageUrl, index) => (
              <img
                key={index}
                className={`product-image-product-details ${
                  index === currentIndex && images.length > currentIndex
                    ? "active"
                    : ""
                }`}
                src={imageUrl}
                alt={title}
              />
            ))}
          </div>
          <div className="product-info-product-details">
            <div className="title-rating-product-details">
              <h3 title={title}>{title}</h3>
              <div className="rating-desc">
                <p className="desc-heading">Rating</p>:
                <div
                  className={
                    rating >= 3 ? "rating-star-high" : "rating-star-low"
                  }
                >
                  <span>{rating}</span>
                  <span>
                    <FaStar />
                  </span>
                </div>
              </div>
            </div>

            <div className="price-info-product-details">
              <p className="desc-heading">Price</p>:
              <p className="discounted-price-product-details">
                {(price - 0.1 * price).toFixed(0)}
              </p>
              <p className="price-tag-product-details">{price}</p>
            </div>

            <div className="generic-desc-info">
              <p className="desc-heading">Category</p>:
              <p className="desc-content-text">{categoryName}</p>
            </div>

            <div className="generic-desc-info">
              <p className="desc-heading">Size</p>:
              <p className="desc-content-text">{size}</p>
            </div>

            <div className="collection-desc-info">
              <div className="generic-desc-info">
                <p className="desc-heading">Men</p>:
                <p className="desc-content-text">{men ? "Yes" : "No"}</p>
              </div>
              <div className="generic-desc-info">
                <p className="desc-heading">Women</p>:
                <p className="desc-content-text">{women ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="collection-desc-info">
              <div className="generic-desc-info">
                <p className="desc-heading">IPL</p>:
                <p className="desc-content-text">{ipl ? "Yes" : "No"}</p>
              </div>
              <div className="generic-desc-info">
                <p className="desc-heading">WPL</p>:
                <p className="desc-content-text">{wpl ? "Yes" : "No"}</p>
              </div>
              <div className="generic-desc-info">
                <p className="desc-heading">International</p>:
                <p className="desc-content-text">
                  {international ? "Yes" : "No"}
                </p>
              </div>
            </div>

            <div className="description-detail">
              <strong className="desc-heading">Description</strong>:
              <ul>
                {description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="product-detail-tags-section">
              <div className="product-detail-tags">
                <div className="tag">
                  <span>
                    <FaShippingFast size={24} />
                  </span>
                  <p>Fastest Delivery</p>
                </div>
                <div className="tag">
                  <span>
                    <MdSell size={24} />
                  </span>
                  <p>Inclusive of Taxes</p>
                </div>
                <div className="tag">
                  <span>
                    <BsAwardFill size={24} />
                  </span>
                  <p>Top Brand</p>
                </div>
                <div className="tag">
                  <span>
                    <MdLocalShipping size={24} />
                  </span>
                  <p>Free Delivery</p>
                </div>
              </div>
            </div>
            <button
              className={
                !inStock
                  ? "out-of-stock-cart-btn-product-details"
                  : isCartContainsProduct(_id)
                  ? "go-to-cart-btn-product-details"
                  : "add-to-cart-btn-product-details"
              }
              disabled={!inStock}
              onClick={() =>
                token
                  ? isCartContainsProduct(_id)
                    ? navigate("/cart")
                    : addProductToCart(product)
                  : navigate("/login")
              }
            >
              {!inStock ? (
                <BsFillCartXFill />
              ) : isCartContainsProduct(_id) ? (
                <FaShoppingCart />
              ) : (
                <FaCartPlus />
              )}

              {!inStock
                ? "Out of Stock"
                : isCartContainsProduct(_id)
                ? "Go to Cart"
                : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
      {!isLoading && !errorDetails && !product && (
        <div className="not-found">
          <h3>Product details not found.</h3>
          <img
            className="list-loading-image"
            src="https://res.cloudinary.com/dbe8yf165/image/upload/v1686330912/cricify/undraw_page_not_found_re_e9o6_myjkmb.svg"
            alt="not found"
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
  );
};

export default ProductDetails;
