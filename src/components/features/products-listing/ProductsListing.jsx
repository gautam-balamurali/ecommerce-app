import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./ProductsListing.css";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import { useAuthentication } from "../../../core/contexts/authentication-context/AuthenticationContext";
import Filters from "./filters/Filters";
import { MdClose, MdFilterList } from "react-icons/md";
import {
  FaCartPlus,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";
import { BsFillCartXFill } from "react-icons/bs";

const ProductsListing = () => {
  const [toggleFilterSection, setToggleFilterSection] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { token } = useAuthentication();

  const {
    products,
    cart,
    wishlist,
    addProductToCart,
    addProductToWishlist,
    removeProductFromWishlist,
  } = useProducts();

  const isCartContainsProduct = (productId) =>
    cart.find((product) => product._id === productId);
  const isWishlistContainsProduct = (productId) =>
    wishlist.find((product) => product._id === productId);

  const filterHamburgerHandler = () => {
    setToggleFilterSection((prev) => !prev);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="products-listing-section">
      <div className="toggle-filter-section">
        <div className="toggle-filter-wrapper">
          <div className="toggle-filter-btn">
            {toggleFilterSection ? (
              <MdClose size={15} onClick={filterHamburgerHandler} />
            ) : (
              <MdFilterList size={15} onClick={filterHamburgerHandler} />
            )}
          </div>
          <span>{toggleFilterSection ? "Close" : "Apply Filters"}</span>
        </div>
        {products.length > 0 && (
          <p>
            Showing {products.length}{" "}
            {products.length > 1 ? "results" : "result"}
          </p>
        )}
      </div>
      <div className="filters-products-layout">
        <Filters
          className={toggleFilterSection ? "" : "hide-filters-wrapper"}
        />
        <div className="products-listing">
          {products.length > 0 &&
            products.map((product) => {
              const { _id, title, price, rating, images, inStock, isTrending } =
                product;
              return (
                <div key={_id} className="product-container">
                  {isTrending && <span className="card-badge">Trending</span>}
                  <span
                    className={`wishlist-heart ${
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
                    {isWishlistContainsProduct(_id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                  </span>
                  <div
                    className={
                      inStock
                        ? "product-image-container"
                        : "product-image-container-out-of-stock"
                    }
                  >
                    {images.map((imageUrl, index) => (
                      <img
                        key={index}
                        className={`product-image ${
                          index === currentIndex && images.length > currentIndex
                            ? "active"
                            : ""
                        }`}
                        src={imageUrl}
                        alt={title}
                      />
                    ))}
                  </div>
                  <div className="product-info">
                    <div className="title-rating">
                      <h3
                        title={title}
                        onClick={() => navigate(`/product/${_id}`)}
                      >
                        {title}
                      </h3>
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
                    <div className="price-info">
                      <p className="discounted-price">
                        {(price - 0.1 * price).toFixed(0)}
                      </p>
                      <p className="price-tag">{price}</p>
                    </div>
                  </div>
                  <button
                    className={
                      !inStock
                        ? "out-of-stock-cart-btn"
                        : isCartContainsProduct(_id)
                        ? "go-to-cart-btn"
                        : "add-to-cart-btn"
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
              );
            })}
          {products?.length < 1 && <h3>No products found.</h3>}
        </div>
      </div>
    </div>
  );
};

export default ProductsListing;
