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
    radioButtonValue: "",
    rangeValue: 1,
  },
};
