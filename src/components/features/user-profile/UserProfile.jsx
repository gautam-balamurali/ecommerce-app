import { useNavigate } from "react-router-dom";

import { useAuthentication } from "../../../core/contexts/authentication-context/AuthenticationContext";
import { useProducts } from "../../../core/contexts/products-context/ProductsContext";
import { useState } from "react";
import CustomModal from "../../shared/custom-modal-component/CustomModal";
import InputField from "../../shared/input-field-component/InputField";
import { v4 as uuid } from "uuid";
import { useOrderAddress } from "../../../core/contexts/order-address-context/OrderAddressContext";

const UserProfile = () => {
  const navigate = useNavigate();
  const { productsDispatch } = useProducts();
  const { user, logOutUser } = useAuthentication();
  const { firstName, lastName, email } = user;
  const { addressHistory, addNewAddress, updateAddressHistory, deleteAddress } =
    useOrderAddress();

  const logOutClickHandler = () => {
    logOutUser();
    productsDispatch({ type: "LOG_OUT" });
    navigate("/");
  };

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
    <div
      style={{
        display: "flex",
        textAlign: "start",
        justifyContent: "center",
        alignItems: "center",
        margin: "1rem auto",
      }}
    >
      {/* user profile */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1rem",
        }}
      >
        <div
          style={{
            margin: "1rem",
            border: "1px solid",
            padding: "1rem",
          }}
        >
          <h2>User Profile Details</h2>
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>Email: {email}</p>
          <button onClick={logOutClickHandler}>Log Out</button>
        </div>
      </div>
      {/* addressHistory */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1rem",
        }}
      >
        <div
          style={{
            margin: "1rem",
            border: "1px solid",
            padding: "1rem",
          }}
        >
          <h2>Address Details</h2>
          {addressHistory?.length > 0 &&
            addressHistory.map((addressField) => {
              const {
                _id,
                name,
                mobile,
                street,
                city,
                zipCode,
                state,
                country,
              } = addressField;
              return (
                <div key={_id}>
                  <span>{name}</span>,<span> {mobile}</span>
                  <br />
                  <span>{street}</span>
                  <br />
                  <span> {city}</span>
                  <br />
                  <span> {zipCode}</span>,<span> {state}</span>
                  <br />
                  <span>{country}</span>
                  <div>
                    <button onClick={() => editButtonClickHandler(_id)}>
                      Edit
                    </button>
                    <button onClick={() => deleteAddress(_id)}>Delete</button>
                  </div>
                  <hr />
                </div>
              );
            })}
          <button onClick={handleOpenModal}>Add New</button>
          <CustomModal isOpen={isModalOpen} onClose={handleCloseModal}>
            <form
              className="address-form"
              onSubmit={submitClickHandler}
              autoComplete="off"
            >
              <h2>Add New Address</h2>
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
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </form>
          </CustomModal>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
