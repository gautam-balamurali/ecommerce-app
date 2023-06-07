export const productsReducerInitialState = {
  products: [],
  categories: [],
  cart: [],
  wishlist: [],
  isLoading: false,
  errorDetails: null,
  appliedFilterValues: {
    searchValue: "",
    categoryCheckboxValues: [],
    booleanCheckboxValues: [],
    inStockCheckboxValue: [],
    radioButtonValue: "",
    rangeValue: 1,
  },
};
