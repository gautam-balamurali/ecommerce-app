import { createContext, useContext, useEffect, useReducer } from "react";
import { orderAddressReducer } from "../../reducers/order-address-reducer/OrderAddressReducer";
import { orderAddressReducerInitialState } from "../../reducers/order-address-reducer/OrderAddressReducerInitialState";
import { useAuthentication } from "../authentication-context/AuthenticationContext";
import { toast } from "react-toastify";

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
    toast.success("New address added.");
  };

  const updateAddressHistory = (updatedAddress) => {
    const newAddressHistory = state.addressHistory.map((address) =>
      address._id === updatedAddress._id
        ? { ...address, ...updatedAddress }
        : address
    );
    if (state.selectedAddress._id === updatedAddress._id) {
      orderAddressDispatch({
        type: "CHANGE_DEFAULT_ADDRESS",
        payload: updatedAddress,
      });
    }
    orderAddressDispatch({
      type: "UPDATE_ADDRESS_DETAILS",
      payload: newAddressHistory,
    });
    toast.success("Address updated!");
  };

  const deleteAddress = (addressID) => {
    const newAddressHistory = state.addressHistory.filter(
      (address) => address._id !== addressID
    );
    orderAddressDispatch({
      type: "UPDATE_ADDRESS_DETAILS",
      payload: newAddressHistory,
    });
    toast.success("Address deleted!");
  };

  const setCurrentOrderDetails = (orderDetails) => {
    orderAddressDispatch({
      type: "SET_CURRENT_ORDER_DETAILS",
      payload: orderDetails,
    });
  };

  const changeDefaultAddress = (event) => {
    const { value } = event.target;
    const currentAddress = state.addressHistory.find(
      (address) => address._id === value
    );
    orderAddressDispatch({
      type: "CHANGE_DEFAULT_ADDRESS",
      payload: currentAddress,
    });
    toast.success("Default address changed!");
  };

  const addOrderDetails = (orderDetails) => {
    orderAddressDispatch({
      type: "ADD_NEW_ORDER_DETAILS",
      payload: orderDetails,
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
        setCurrentOrderDetails,
        changeDefaultAddress,
        addOrderDetails,
      }}
    >
      {children}
    </OrderAddressContext.Provider>
  );
};

export const useOrderAddress = () => useContext(OrderAddressContext);
