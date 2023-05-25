export const orderAddressReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_ADDRESS_HISTORY":
      return { ...state, addressHistory: payload };
    case "ADD_NEW_ADDRESS":
      return { ...state, addressHistory: [...state.addressHistory, payload] };
    case "UPDATE_ADDRESS_DETAILS":
      return { ...state, addressHistory: [...payload] };
    default:
      return state;
  }
};
