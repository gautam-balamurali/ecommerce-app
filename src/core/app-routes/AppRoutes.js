import { Route, Routes } from "react-router-dom";
import Mockman from "mockman-js";

import HomePage from "../../pages/home-page/HomePage";
import MockbeeDocumentationPage from "../../pages/mockbee-documentation-page/MockbeeDocumentationPage";
import ProductsListingPage from "../../pages/products-listing-page/ProductsListingPage";
import IndividualProductPage from "../../pages/individual-product-page/IndividualProductPage";
import LoginPage from "../../pages/login-page/LoginPage";
import SignUpPage from "../../pages/sign-up-page/SignUpPage";
import PageNotFound from "../../pages/page-not-found-page/PageNotFound";
import CartPage from "../../pages/cart-page/CartPage";
import WishlistPage from "../../pages/wishlist-page/WishlistPage";
import UserProfilePage from "../../pages/user-profile-page/UserProfilePage";
import { AuthGuard } from "../auth-guard/AuthGuard";
import CheckoutPage from "../../pages/checkout-page/CheckoutPage";
import OrderHistoryPage from "../../pages/order-history-page/OrderHistoryPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/mockbee-documentation"
        element={<MockbeeDocumentationPage />}
      />
      <Route path="/mockman" element={<Mockman />} />
      <Route path="/products" element={<ProductsListingPage />} />
      <Route path="/product/:productId" element={<IndividualProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<PageNotFound />} />
      <Route
        path="/cart"
        element={
          <AuthGuard>
            <CartPage />
          </AuthGuard>
        }
      />
      <Route
        path="/wishlist"
        element={
          <AuthGuard>
            <WishlistPage />
          </AuthGuard>
        }
      />
      <Route
        path="/user-profile"
        element={
          <AuthGuard>
            <UserProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path="/checkout"
        element={
          <AuthGuard>
            <CheckoutPage />
          </AuthGuard>
        }
      />
      <Route
        path="/order-history"
        element={
          <AuthGuard>
            <OrderHistoryPage />
          </AuthGuard>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
