import { useNavigate } from "react-router-dom";

import "./UserProfile.css";
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

  const viewOrdersClickHandler = () => {
    navigate("/order-history");
  };

  const userProfileCategories = ["About", "Addresses", "Order History"];

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

  const [isCategorySelected, setCategorySelected] = useState(
    userProfileCategories[0]
  );

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

  const categoryClickHandler = (category) => {
    setCategorySelected(category);
  };

  return (
    <div className="user-profile-section">
      <h2 className="greetings">
        Hi{" "}
        <span className="user-name">
          {firstName} {lastName}
        </span>
        ! 🤟🏼
      </h2>
      <hr className="separator" />
      <nav className="profile-categories-list">
        <ul>
          {userProfileCategories.map((category, index) => (
            <li
              className={
                isCategorySelected === category
                  ? "category-name-active"
                  : "category-name"
              }
              key={index}
              onClick={() => categoryClickHandler(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </nav>
      <div className="user-profile-contents">
        <div className="category-content">
          {isCategorySelected === "About" && (
            <div className="about-content">
              <img
                className="user-dp"
                src="https://geektrust.sgp1.digitaloceanspaces.com/assets/svg/avatar.svg"
                alt="display pic"
              />
              <div className="user-details">
                <p className="about-label">Full Name</p>
                <p className="about-value">
                  {firstName} {lastName}
                </p>
                <p className="about-label">Email Address</p>
                <p className="about-value">{email}</p>
              </div>
              {/* <button className="order-history-btn" onClick={viewOrdersClickHandler}>
                View Order History
              </button> */}
              <button className="logout-btn" onClick={logOutClickHandler}>
                Log Out
              </button>
            </div>
          )}
          {isCategorySelected === "Addresses" && (
            <div className="addresses">
              <div className="addresses-content">
                {addressHistory?.length > 0 &&
                  addressHistory.map((addressField, index) => {
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
                      <label className="address-wrapper" key={_id}>
                        <input
                          type={"radio"}
                          name={"addressRadioButtonValue"}
                          value={_id}
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
                          <div className="address-configuration-btns">
                            <button
                              className="address-action-btn"
                              onClick={() => editButtonClickHandler(_id)}
                            >
                              Update
                            </button>
                            <button
                              className="address-action-btn"
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
                    className="address-form"
                    onSubmit={submitClickHandler}
                    autoComplete="off"
                  >
                    <h2 className="address-form-heading">Add New Address</h2>
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
                          onChangeFunction={
                            currentAddressFormFieldsChangeHandler
                          }
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
                          onChangeFunction={
                            currentAddressFormFieldsChangeHandler
                          }
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
                          onChangeFunction={
                            currentAddressFormFieldsChangeHandler
                          }
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
                          onChangeFunction={
                            currentAddressFormFieldsChangeHandler
                          }
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
                          onChangeFunction={
                            currentAddressFormFieldsChangeHandler
                          }
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
                          onChangeFunction={
                            currentAddressFormFieldsChangeHandler
                          }
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
              <button className="add-new-address-btn" onClick={handleOpenModal}>
                + Add New Address
              </button>
            </div>
          )}
          {isCategorySelected === "Order History" && (
            <button
              className="order-history-btn"
              onClick={viewOrdersClickHandler}
            >
              View Order History
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
