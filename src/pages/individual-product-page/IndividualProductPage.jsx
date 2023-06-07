import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ProductDetails from "../../components/features/product-details/ProductDetails";
import { useProducts } from "../../core/contexts/products-context/ProductsContext";

const IndividualProductPage = () => {
  const { productsDispatch } = useProducts();
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    (async () => {
      productsDispatch({ type: "LOADER_INITIATED" });
      try {
        const response = await axios.get(`/api/products/${productId}`);
        const {
          status,
          data: { product },
        } = response;
        if (status === 200 || status === 201) setProductDetails({ ...product });
      } catch (error) {
        console.error(error);
        productsDispatch({
          type: "FETCH_ERROR_DETAILS",
          payload: error?.response,
        });
      } finally {
        productsDispatch({ type: "LOADER_STOPPED" });
      }
    })();
  }, [productId, productsDispatch]);
  return <ProductDetails product={productDetails} />;
};

export default IndividualProductPage;
