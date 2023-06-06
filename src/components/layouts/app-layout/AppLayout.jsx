import AppRoutes from "../../../core/app-routes/AppRoutes";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import CustomLoader from "../../shared/custom-loader-component/CustomLoader";
import Footer from "../footer/Footer";
import Header from "../header/Header";

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
      <Header />
      <div className="section">
        <AppRoutes />
      </div>
      <Footer />
    </>
  );
};

export default AppLayout;
