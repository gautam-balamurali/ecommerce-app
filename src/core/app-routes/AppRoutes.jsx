import { Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";

import HomePage from "../../components/pages/home-page/HomePage";
import MockbeeDocumentationPage from "../../components/pages/mockbee-documentation-page/MockbeeDocumentationPage";
import CartPage from "../../components/pages/cart-page/CartPage";
import WishlistPage from "../../components/pages/wishlist-page/WishlistPage";
import IndividualProductPage from "../../components/pages/individual-product-page/IndividualProductPage";
import PageNotFound from "../../components/pages/page-not-found-page/PageNotFound";
import ProductsListingPage from "../../components/pages/products-listing-page/ProductsListingPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/mockbee-documentation"
        element={<MockbeeDocumentationPage />}
      />
      <Route path="/mockman" element={<Mockman />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/products" element={<ProductsListingPage />} />
      <Route path="/product/:productId" element={<IndividualProductPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
