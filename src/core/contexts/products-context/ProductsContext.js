import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

import { productsReducer } from "../../reducers/products-reducer/ProductsReducerFunction";
import { initialState } from "../../reducers/products-reducer/ProductsReducerInititalState";
import { useAuth } from "../authentication-context/AuthenticationContext";
import { updateListWithAppliedFilters } from "../../../utils/helper-functions/HelperFunctions";

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
        dispatch({ type: "FETCH_ERROR_DETAILS", payload: error?.response });
      } finally {
        dispatch({ type: "LOADER_STOPPED" });
      }
    })();
    // eslint-disable-next-line
  }, [token]);

  const addProductToCart = async (product) => {
    dispatch({ type: "LOADER_INITIATED" });
    try {
      const response = await axios.post(
        "/api/user/cart",
        { product },
        { headers: { authorization: token } }
      );
      if (response.status === 200 || response.status === 201)
        dispatch({
          type: "FETCH_CART_DATA",
          payload: response?.data?.cart,
        });
    } catch (error) {
      console.error(error);
      dispatch({ type: "FETCH_ERROR_DETAILS", payload: error?.response });
    } finally {
      dispatch({ type: "LOADER_STOPPED" });
    }
  };

  const updateCartProduct = async (productId, type) => {
    dispatch({ type: "LOADER_INITIATED" });
    try {
      const response = await axios.post(
        `/api/user/cart/${productId}`,
        { action: { type } },
        { headers: { authorization: token } }
      );
      if (response.status === 200 || response.status === 201)
        dispatch({
          type: "FETCH_CART_DATA",
          payload: response?.data?.cart,
        });
    } catch (error) {
      console.error(error);
      dispatch({ type: "FETCH_ERROR_DETAILS", payload: error?.response });
    } finally {
      dispatch({ type: "LOADER_STOPPED" });
    }
  };

  const removeProductFromCart = async (productId) => {
    dispatch({ type: "LOADER_INITIATED" });
    try {
      const response = await axios.delete(`/api/user/cart/${productId}`, {
        headers: { authorization: token },
      });
      if (response.status === 200 || response.status === 201)
        dispatch({
          type: "FETCH_CART_DATA",
          payload: response?.data?.cart,
        });
    } catch (error) {
      console.error(error);
      dispatch({ type: "FETCH_ERROR_DETAILS", payload: error?.response });
    } finally {
      dispatch({ type: "LOADER_STOPPED" });
    }
  };

  const addProductToWishlist = async (product) => {
    dispatch({ type: "LOADER_INITIATED" });
    try {
      const response = await axios.post(
        "/api/user/wishlist",
        { product },
        { headers: { authorization: token } }
      );
      if (response.status === 200 || response.status === 201)
        dispatch({
          type: "FETCH_WISHLIST_DATA",
          payload: response?.data?.wishlist,
        });
    } catch (error) {
      console.error(error);
      dispatch({ type: "FETCH_ERROR_DETAILS", payload: error?.response });
    } finally {
      dispatch({ type: "LOADER_STOPPED" });
    }
  };

  const removeProductFromWishlist = async (productId) => {
    dispatch({ type: "LOADER_INITIATED" });
    try {
      const response = await axios.delete(`/api/user/wishlist/${productId}`, {
        headers: { authorization: token },
      });
      if (response.status === 200 || response.status === 201)
        dispatch({
          type: "FETCH_WISHLIST_DATA",
          payload: response?.data?.wishlist,
        });
    } catch (error) {
      console.error(error);
      dispatch({ type: "FETCH_ERROR_DETAILS", payload: error?.response });
    } finally {
      dispatch({ type: "LOADER_STOPPED" });
    }
  };

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newAppliedFilterValues = {
      ...state.appliedFilterValues,
      [name]:
        type === "checkbox"
          ? checked
            ? [...state.appliedFilterValues[name], value]
            : state.appliedFilterValues[name].filter((elm) => elm !== value)
          : value,
    };
    dispatch({ type: "APPLY_FILTERS", payload: { ...newAppliedFilterValues } });
  };

  const filterByCategory = (categoryName) => {
    const newAppliedFilterValues = {
      ...state.appliedFilterValues,
      checkboxValues: [
        ...state.appliedFilterValues.checkboxValues,
        categoryName,
      ],
    };
    dispatch({ type: "APPLY_FILTERS", payload: { ...newAppliedFilterValues } });
  };

  useEffect(() => {
    dispatch({ type: "LOADER_INITIATED" });
    (async () => {
      try {
        const response = await axios.get("/api/products");
        const {
          status,
          data: { products },
        } = response;
        if (status === 200 || status === 201) {
          dispatch({
            type: "FETCH_PRODUCTS_DATA",
            payload: updateListWithAppliedFilters(
              products,
              state.appliedFilterValues
            ),
          });
        }
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_ERROR_DETAILS", payload: error?.response });
      } finally {
        dispatch({ type: "LOADER_STOPPED" });
      }
    })();
  }, [state.appliedFilterValues]);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        dispatch,
        addProductToCart,
        addProductToWishlist,
        updateCartProduct,
        removeProductFromCart,
        removeProductFromWishlist,
        handleFilterChange,
        filterByCategory,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
