import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

import { productsReducer } from "../../reducers/products-reducer/ProductsReducerFunction";
import { initialState } from "../../reducers/products-reducer/ProductsReducerInititalState";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  useEffect(() => {
    (async () => {
      dispatch({ type: "LOADER_INITIATED" });
      try {
        const response = await axios.get("/api/products");
        const {
          data: { products },
          status,
        } = response;
        if (status === 200)
          dispatch({ type: "FETCH_PRODUCTS_DATA", payload: products });
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_ERROR_DETAILS", payload: error });
      } finally {
        dispatch({ type: "LOADER_STOPPED" });
      }
    })();
  }, []);
  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
