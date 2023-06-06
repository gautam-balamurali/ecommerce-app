import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";

import { productsReducer } from "../../reducers/products-reducer/ProductsReducerFunction";
import { productsReducerInitialState } from "../../reducers/products-reducer/ProductsReducerInititalState";
import { useAuthentication } from "../authentication-context/AuthenticationContext";
import { updateListWithAppliedFilters } from "../../../utils/helper-functions/HelperFunctions";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, productsDispatch] = useReducer(
    productsReducer,
    productsReducerInitialState
  );
  const { token } = useAuthentication();

  useEffect(() => {
    (async () => {
      productsDispatch({ type: "LOADER_INITIATED" });
      try {
        const productsResponse = await axios.get("/api/products");
        if (productsResponse.status === 200)
          productsDispatch({
            type: "FETCH_PRODUCTS_DATA",
            payload: productsResponse.data.products,
          });

        const categoriesResponse = await axios.get("/api/categories");
        if (categoriesResponse.status === 200)
          productsDispatch({
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
            productsDispatch({
              type: "FETCH_CART_DATA",
              payload: cartResponse?.data?.cart,
            });

          const wishlistResponse = await axios.get("/api/user/wishlist", {
            headers: {
              authorization: token,
            },
          });
          if (wishlistResponse.status === 200)
            productsDispatch({
              type: "FETCH_WISHLIST_DATA",
              payload: wishlistResponse?.data?.wishlist,
            });
        }
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
    // eslint-disable-next-line
  }, [token]);

  const addProductToCart = async (product) => {
    productsDispatch({ type: "LOADER_INITIATED" });
    try {
      const response = await axios.post(
        "/api/user/cart",
        { product },
        { headers: { authorization: token } }
      );
      if (response.status === 200 || response.status === 201)
        productsDispatch({
          type: "FETCH_CART_DATA",
          payload: response?.data?.cart,
        });
    } catch (error) {
      console.error(error);
      productsDispatch({
        type: "FETCH_ERROR_DETAILS",
        payload: error?.response,
      });
    } finally {
      productsDispatch({ type: "LOADER_STOPPED" });
    }
  };

  const updateCartProduct = async (productId, type) => {
    try {
      const response = await axios.post(
        `/api/user/cart/${productId}`,
        { action: { type } },
        { headers: { authorization: token } }
      );
      if (response.status === 200 || response.status === 201)
        productsDispatch({
          type: "FETCH_CART_DATA",
          payload: response?.data?.cart,
        });
    } catch (error) {
      console.error(error);
      productsDispatch({
        type: "FETCH_ERROR_DETAILS",
        payload: error?.response,
      });
    }
  };

  const removeProductFromCart = async (productId) => {
    productsDispatch({ type: "LOADER_INITIATED" });
    try {
      const response = await axios.delete(`/api/user/cart/${productId}`, {
        headers: { authorization: token },
      });
      if (response.status === 200 || response.status === 201)
        productsDispatch({
          type: "FETCH_CART_DATA",
          payload: response?.data?.cart,
        });
    } catch (error) {
      console.error(error);
      productsDispatch({
        type: "FETCH_ERROR_DETAILS",
        payload: error?.response,
      });
    } finally {
      productsDispatch({ type: "LOADER_STOPPED" });
    }
  };

  const addProductToWishlist = async (product) => {
    productsDispatch({ type: "LOADER_INITIATED" });
    try {
      const response = await axios.post(
        "/api/user/wishlist",
        { product },
        { headers: { authorization: token } }
      );
      if (response.status === 200 || response.status === 201)
        productsDispatch({
          type: "FETCH_WISHLIST_DATA",
          payload: response?.data?.wishlist,
        });
    } catch (error) {
      console.error(error);
      productsDispatch({
        type: "FETCH_ERROR_DETAILS",
        payload: error?.response,
      });
    } finally {
      productsDispatch({ type: "LOADER_STOPPED" });
    }
  };

  const removeProductFromWishlist = async (productId) => {
    productsDispatch({ type: "LOADER_INITIATED" });
    try {
      const response = await axios.delete(`/api/user/wishlist/${productId}`, {
        headers: { authorization: token },
      });
      if (response.status === 200 || response.status === 201)
        productsDispatch({
          type: "FETCH_WISHLIST_DATA",
          payload: response?.data?.wishlist,
        });
    } catch (error) {
      console.error(error);
      productsDispatch({
        type: "FETCH_ERROR_DETAILS",
        payload: error?.response,
      });
    } finally {
      productsDispatch({ type: "LOADER_STOPPED" });
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
    productsDispatch({
      type: "APPLY_FILTERS",
      payload: { ...newAppliedFilterValues },
    });
  };

  const filterByCategory = (categoryName) => {
    const newAppliedFilterValues = {
      searchValue: "",
      categoryCheckboxValues: [categoryName],
      booleanCheckboxValues: [],
      radioButtonValue: "",
      rangeValue: 5,
    };
    productsDispatch({
      type: "APPLY_FILTERS",
      payload: { ...newAppliedFilterValues },
    });
  };

  const filterByCollection = (collectionName) => {
    const newAppliedFilterValues = {
      searchValue: "",
      categoryCheckboxValues: [],
      booleanCheckboxValues: [collectionName],
      radioButtonValue: "",
      rangeValue: 5,
    };
    productsDispatch({
      type: "APPLY_FILTERS",
      payload: { ...newAppliedFilterValues },
    });
  };

  const clearFilters = () => {
    const newAppliedFilterValues = {
      searchValue: "",
      categoryCheckboxValues: [],
      booleanCheckboxValues: [],
      radioButtonValue: "",
      rangeValue: 5,
    };
    productsDispatch({
      type: "CLEAR_FILTERS",
      payload: { ...newAppliedFilterValues },
    });
  };

  useEffect(() => {
    productsDispatch({ type: "LOADER_INITIATED" });
    (async () => {
      try {
        const response = await axios.get("/api/products");
        const {
          status,
          data: { products },
        } = response;
        if (status === 200 || status === 201) {
          productsDispatch({
            type: "FETCH_PRODUCTS_DATA",
            payload: updateListWithAppliedFilters(
              products,
              state.appliedFilterValues
            ),
          });
        }
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
  }, [state.appliedFilterValues]);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        productsDispatch,
        addProductToCart,
        addProductToWishlist,
        updateCartProduct,
        removeProductFromCart,
        removeProductFromWishlist,
        handleFilterChange,
        filterByCategory,
        clearFilters,
        filterByCollection,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
