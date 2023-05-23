export const productsReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOADER_INITIATED":
      return { ...state, isLoading: true };
    case "LOADER_STOPPED":
      return { ...state, isLoading: false };
    case "FETCH_ERROR_STATE":
      return { ...state, errorDetails: payload };
    case "FETCH_PRODUCTS_DATA":
      return { ...state, products: [...payload] };
    case "FETCH_CATEGORIES_DATA":
      return { ...state, categories: [...payload] };
    case "FETCH_CART_DATA":
      return { ...state, cart: [...payload] };
    case "FETCH_WISHLIST_DATA":
      return { ...state, wishlist: [...payload] };
    case "UPDATE_CART_AND_WISHLIST":
      return {
        ...state,
        cart: [...payload?.cart],
        wishlist: [...payload?.wishlist],
      };
    case "LOG_OUT":
      return { ...state, cart: [], wishlist: [] };
    case "APPLY_FILTERS":
      return { ...state, appliedFilterValues: payload };
    case "CLEAR_FILTERS":
      return { ...state, appliedFilterValues: payload };
    default:
      return state;
  }
};
