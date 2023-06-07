export const orderAddressReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_ADDRESS_HISTORY":
      return { ...state, addressHistory: payload, selectedAddress: payload[0] };
    case "ADD_NEW_ADDRESS":
      return { ...state, addressHistory: [...state.addressHistory, payload] };
    case "UPDATE_ADDRESS_DETAILS":
      return { ...state, addressHistory: [...payload] };
    case "SET_CURRENT_ORDER_DETAILS":
      return { ...state, currentOrderDetails: { ...payload } };
    case "CHANGE_DEFAULT_ADDRESS":
      return { ...state, selectedAddress: { ...payload } };
    case "ADD_NEW_ORDER_DETAILS":
      return {
        ...state,
        orderHistory: [payload, ...state.orderHistory],
        currentOrderDetails: null,
      };
    default:
      return state;
  }
};
