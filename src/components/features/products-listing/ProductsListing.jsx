import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import "./ProductsListing.css";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import { useAuthentication } from "../../../core/contexts/authentication-context/AuthenticationContext";
import Filters from "./filters/Filters";
import { MdClose, MdFilterList } from "react-icons/md";

const ProductsListing = () => {
  const [toggleFilterSection, setToggleFilterSection] = useState(false);
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
        {products.length > 0 && <p>Showing {products.length} results</p>}
      </div>
      <div className="filters-products-layout">
        <Filters
          className={toggleFilterSection ? "" : "hide-filters-wrapper"}
        />
        <div className="products-listing">
          {products.length > 0 &&
            products.map((product) => {
              const { _id, title, author, price, categoryName, rating } =
                product;
              return (
                <div key={_id} className="product-contents">
                  <h3>{title}</h3>
                  <p>{author}</p>
                  <p>{price}</p>
                  <p>{categoryName}</p>
                  <p>{rating}⭐</p>
                  <Link to={`/product/${_id}`}>View details</Link>
                  <button
                    onClick={() =>
                      token
                        ? isCartContainsProduct(_id)
                          ? navigate("/cart")
                          : addProductToCart(product)
                        : navigate("/login")
                    }
                  >
                    {isCartContainsProduct(_id) ? "Go to Cart" : "Add to Cart"}
                  </button>
                  <button
                    onClick={() =>
                      token
                        ? isWishlistContainsProduct(_id)
                          ? removeProductFromWishlist(_id)
                          : addProductToWishlist(product)
                        : navigate("/login")
                    }
                  >
                    {isWishlistContainsProduct(_id)
                      ? "Remove from Wishlist"
                      : "Add to wishlist"}
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
