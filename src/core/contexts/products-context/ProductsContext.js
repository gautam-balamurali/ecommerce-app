import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

import { productsReducer } from "../../reducers/products-reducer/ProductsReducerFunction";
import { initialState } from "../../reducers/products-reducer/ProductsReducerInititalState";
import { useAuth } from "../authentication-context/AuthenticationContext";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState);
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      dispatch({ type: "LOADER_INITIATED" });
      try {
        const productsResponse = await axios.get("/api/products");
        if (productsResponse.status === 200)
          dispatch({
            type: "FETCH_PRODUCTS_DATA",
            payload: productsResponse.data.products,
          });

        const categoriesResponse = await axios.get("/api/categories");
        if (categoriesResponse.status === 200)
          dispatch({
            type: "FETCH_CATEGORIES_DATA",
            payload: categoriesResponse.data.categories,
          });

        if (token) {
          const cartResponse = await axios.get("/api/user/cart", {
            headers: {
              authorization: token,
            },
          });
          if (cartResponse.status === 200)
            dispatch({
              type: "FETCH_CART_DATA",
              payload: cartResponse?.data?.cart,
            });

          const wishlistResponse = await axios.get("/api/user/wishlist", {
            headers: {
              authorization: token,
            },
          });
          if (wishlistResponse.status === 200)
            dispatch({
              type: "FETCH_WISHLIST_DATA",
              payload: wishlistResponse?.data?.wishlist,
            });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_ERROR_DETAILS", payload: error });
      } finally {
        dispatch({ type: "LOADER_STOPPED" });
      }
    })();
    // eslint-disable-next-line
  }, [token]);

  const addProductToCart = () => {};
  const addProductToWishlist = () => {};

  return (
    <ProductsContext.Provider
      value={{ ...state, dispatch, addProductToCart, addProductToWishlist }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
