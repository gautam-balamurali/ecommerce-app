import { useParams } from "react-router-dom";
import ProductCard from "../../features/individual-product/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";

const IndividualProductPage = () => {
  const { dispatch } = useProducts();
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    (async () => {
      dispatch({ type: "LOADER_INITIATED" });
      try {
        const response = await axios.get(`/api/products/${productId}`);
        const {
          status,
          data: { product },
        } = response;
        if (status === 200 || status === 201) setProductDetails({ ...product });
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_ERROR_DETAILS", payload: error?.response });
      } finally {
        dispatch({ type: "LOADER_STOPPED" });
      }
    })();
  }, [productId, dispatch]);
  return <ProductCard product={productDetails} />;
};

export default IndividualProductPage;
