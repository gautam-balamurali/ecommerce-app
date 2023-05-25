import { createContext, useContext, useEffect, useReducer } from "react";
import { orderAddressReducer } from "../../reducers/order-address-reducer/OrderAddressReducer";
import { orderAddressReducerInitialState } from "../../reducers/order-address-reducer/OrderAddressReducerInitialState";
import { useAuthentication } from "../authentication-context/AuthenticationContext";

export const OrderAddressContext = createContext();

export const OrderAddressProvider = ({ children }) => {
  const [state, orderAddressDispatch] = useReducer(
    orderAddressReducer,
    orderAddressReducerInitialState
  );
  const { token, user } = useAuthentication();

  useEffect(() => {
    if (token)
      orderAddressDispatch({
        type: "FETCH_ADDRESS_HISTORY",
        payload: [...user?.addressHistory],
      });
  }, [token, user?.addressHistory]);

  const addNewAddress = (address) => {
    orderAddressDispatch({ type: "ADD_NEW_ADDRESS", payload: address });
  };

  const updateAddressHistory = (updatedAddress) => {
    const newAddressHistory = state.addressHistory.map((address) =>
      address._id === updatedAddress._id
        ? { ...address, ...updatedAddress }
        : address
    );
    orderAddressDispatch({
      type: "UPDATE_ADDRESS_DETAILS",
      payload: newAddressHistory,
    });
  };

  const deleteAddress = (addressId) => {
    const newAddressHistory = state.addressHistory.filter(
      (address) => address._id !== addressId
    );
    orderAddressDispatch({
      type: "UPDATE_ADDRESS_DETAILS",
      payload: newAddressHistory,
    });
  };

  return (
    <OrderAddressContext.Provider
      value={{
        ...state,
        orderAddressDispatch,
        addNewAddress,
        updateAddressHistory,
        deleteAddress,
      }}
    >
      {children}
    </OrderAddressContext.Provider>
  );
};

export const useOrderAddress = () => useContext(OrderAddressContext);
