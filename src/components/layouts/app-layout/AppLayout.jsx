import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "../../../core/app-routes/AppRoutes";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import CustomLoader from "../../shared/custom-loader-component/CustomLoader";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import ScrollToTop from "../../../utils/window-scrolls/scrollToTop";

const AppLayout = () => {
  const { isLoading, errorDetails } = useProducts();
  return (
    <>
      {isLoading && <CustomLoader />}
      {errorDetails && (
        <>
          <h3>{errorDetails?.status}</h3>
          <p>{errorDetails?.data.message}</p>
        </>
      )}
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Header />
      <div className="section">
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
