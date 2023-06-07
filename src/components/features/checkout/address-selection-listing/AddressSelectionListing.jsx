import { useState } from "react";
import { v4 as uuid } from "uuid";

import { useOrderAddress } from "../../../../core/contexts/order-address-context/OrderAddressContext";
import "./AddressSelectionListing.css";
import InputField from "../../../shared/input-field-component/InputField";
import CustomModal from "../../../shared/custom-modal-component/CustomModal";

const AddressSelectionListing = () => {
  const {
    addressHistory,
    addNewAddress,
    updateAddressHistory,
    deleteAddress,
    changeDefaultAddress,
    selectedAddress,
  } = useOrderAddress();

  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditFormEnabled, setEditFormEnabled] = useState(false);

  const [currentAddressFormFields, setCurrentAddressFormFields] = useState({
    _id: uuid(),
    name: "",
    mobile: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditFormEnabled(false);
    setCurrentAddressFormFields((prev) => ({
      ...prev,
      _id: uuid(),
      name: "",
      mobile: "",
      street: "",
      city: "",
      zipCode: "",
      state: "",
      country: "",
    }));
  };

  const currentAddressFormFieldsChangeHandler = (event) => {
    const { name, value } = event.target;
    setCurrentAddressFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const editButtonClickHandler = (addressId) => {
    setEditFormEnabled(true);
    const addressToBeUpdated = addressHistory.find(
      (address) => address._id === addressId
    );
    setCurrentAddressFormFields((prev) => ({ ...prev, ...addressToBeUpdated }));
    handleOpenModal();
  };

  const submitClickHandler = (event) => {
    event.preventDefault();
    isEditFormEnabled
      ? updateAddressHistory(currentAddressFormFields)
      : addNewAddress(currentAddressFormFields);
    handleCloseModal();
  };

  return (
    <div className="addresses-checkout">
      <div className="addresses-checkout-content">
        {addressHistory?.length > 0 &&
          addressHistory.map((addressField, index) => {
            const { _id, name, mobile, street, city, zipCode, state, country } =
              addressField;
            return (
              <label className="address-checkout-wrapper" key={_id}>
                <input
                  type={"radio"}
                  name={"addressRadioButtonValue"}
                  value={_id}
                  checked={selectedAddress?._id === _id}
                  onChange={changeDefaultAddress}
                />
                <div className="address">
                  <h4>{name}</h4>
                  <p>
                    <span>{mobile}</span>
                  </p>
                  <p>
                    <span>{street}</span>
                  </p>
                  <p>
                    <span>{city}</span>
                  </p>
                  <p>
                    <span> {zipCode}</span>,<span> {state}</span>
                  </p>
                  <p>
                    <span>{country}</span>
                  </p>
                  <div className="address-checkout-configuration-btns">
                    <button
                      className="address-checkout-action-btn"
                      onClick={() => editButtonClickHandler(_id)}
                    >
                      Update
                    </button>
                    <button
                      className="address-checkout-action-btn"
                      onClick={() => deleteAddress(_id)}
                    >
                      Remove
                    </button>
                    {addressHistory.length > 1 &&
                      index !== addressHistory.length - 1 && (
                        <span className="scroll-txt">⏬</span>
                      )}
                  </div>
                </div>
              </label>
            );
          })}
        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <form
            className="address-checkout-form"
            onSubmit={submitClickHandler}
            autoComplete="off"
          >
            <h2 className="address-checkout-form-heading">Add New Address</h2>
            <div className="name-mobile-section">
              <div className="name-section">
                <InputField
                  className={"name-txt-inpt"}
                  label={"Name"}
                  label_class={"name"}
                  type={"text"}
                  name={"name"}
                  value={currentAddressFormFields.name}
                  placeholder={"John Doe"}
                  onChangeFunction={currentAddressFormFieldsChangeHandler}
                  required={true}
                />
              </div>
              <div className="mobile-section">
                <InputField
                  className={"mobile-txt-inpt"}
                  label={"Mobile"}
                  label_class={"mobile"}
                  type={"tel"}
                  name={"mobile"}
                  value={currentAddressFormFields.mobile}
                  placeholder={"1234567890"}
                  onChangeFunction={currentAddressFormFieldsChangeHandler}
                  required={true}
                />
              </div>
            </div>
            <div className="street-section">
              <InputField
                className={"street-txt-inpt"}
                label={"Street"}
                label_class={"street"}
                type={"text"}
                name={"street"}
                value={currentAddressFormFields.street}
                placeholder={"420/69, Random Street"}
                onChangeFunction={currentAddressFormFieldsChangeHandler}
                required={true}
              />
            </div>
            <div className="city-zipcode-section">
              <div className="city-section">
                <InputField
                  className={"city-txt-inpt"}
                  label={"City"}
                  label_class={"city"}
                  type={"text"}
                  name={"city"}
                  value={currentAddressFormFields.city}
                  placeholder={"Lucknow"}
                  onChangeFunction={currentAddressFormFieldsChangeHandler}
                  required={true}
                />
              </div>
              <div className="zipcode-section">
                <InputField
                  className={"zipcode-txt-inpt"}
                  label={"Postal Code"}
                  label_class={"zipcode"}
                  type={"number"}
                  name={"zipCode"}
                  value={currentAddressFormFields.zipCode}
                  placeholder={"123456"}
                  onChangeFunction={currentAddressFormFieldsChangeHandler}
                  required={true}
                />
              </div>
            </div>
            <div className="state-country-section">
              <div className="state-section">
                <InputField
                  className={"state-txt-inpt"}
                  label={"State"}
                  label_class={"state"}
                  type={"text"}
                  name={"state"}
                  value={currentAddressFormFields.state}
                  placeholder={"Uttar Pradesh"}
                  onChangeFunction={currentAddressFormFieldsChangeHandler}
                  required={true}
                />
              </div>
              <div className="country-section">
                <InputField
                  className={"country-txt-inpt"}
                  label={"Country"}
                  label_class={"country"}
                  type={"text"}
                  name={"country"}
                  value={currentAddressFormFields.country}
                  placeholder={"India"}
                  onChangeFunction={currentAddressFormFieldsChangeHandler}
                  required={true}
                />
              </div>
            </div>
            <div className="form-action-btns">
              <button type="submit" className="form-btn-submit">
                Submit
              </button>
            </div>
          </form>
        </CustomModal>
      </div>
      <button
        className="add-new-address-checkout-btn"
        onClick={handleOpenModal}
      >
        + Add New Address
      </button>
    </div>
  );
};

export default AddressSelectionListing;
