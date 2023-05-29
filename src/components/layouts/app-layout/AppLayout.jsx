import AppRoutes from "../../../core/app-routes/AppRoutes";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import Footer from "../footer/Footer";
import Header from "../header/Header";

const AppLayout = () => {
  const { isLoading, errorDetails } = useProducts();
  return (
    <>
      {isLoading && <h3>Loading...</h3>}
      {errorDetails && (
        <>
          <h3>{errorDetails?.status}</h3>
          <p>{errorDetails?.data.message}</p>
        </>
      )}
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default AppLayout;
