import { useParams } from "react-router-dom";
import ProductCard from "../../features/individual-product/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

const IndividualProductPage = () => {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        const {
          status,
          data: { product },
        } = response;
        if (status === 200 || status === 201) setProductDetails({ ...product });
      } catch (error) {
        console.error(error);
      } finally {
      }
    })();
  }, [productId]);
  return <ProductCard product={productDetails} />;
};

export default IndividualProductPage;
