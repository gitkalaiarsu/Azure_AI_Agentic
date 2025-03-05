import { updatedStatusChats } from "chat/redux/action/chatAction";
import { useAppDispatch, useAppSelector } from "chat/redux/store/hooks";
import useCommonValidation from "chat/utility/commonValidation";
import TickIcon from "../../../assets/checked.png";
import React from "react";
import { ScrollView } from "../UI/Chat/ScrollView";
import PropTypes from 'prop-types'

const SerialNumber = ({ handleSubmitHandler, id }) => {
  const initialState = {
    serial_number: "",
  };

  const dispatch = useAppDispatch();
  const { SubmittedFormChats } = useAppSelector((state) => state.chatReducer);

  const {
    formValues,
    errorMessgae,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
  } = useCommonValidation(initialState);


  const handleSubmitError = () => {
    const hasErrors = Object.values(errorMessgae).some((error) => error);
    if (hasErrors) {
      console.log("Form validation failed", errorMessgae);
    } else {
      resetForm();
      dispatch(updatedStatusChats(id));
      const user_message = {
        user_input: formValues?.serial_number,
      };
      handleSubmitHandler(user_message);
    }
  };

  return (
    <div className="card_containers">
      <div className="card_label_containers">
        <h5>Could you please provide the serial number of the product?</h5>
      </div>
      <div className="card-form-container">
        {SubmittedFormChats?.includes(id) ? (
          <div className="status-container">
            <span className="tick-icon">
              <img src={TickIcon} alt="tick-icon" width={25} height={25} />
            </span>
            <span className="status-text">Submitted</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleSubmitError)}>
            <div className="card-form-divider">
              <label htmlFor="errorcode">Serial Number</label>
              <input
                type="text"
                name="serial_number"
                id="serial_number"
                value={formValues.serial_number}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter Serial number"
              />
              {errorMessgae.serial_number && (
                <>
                <p className="card-error-message">
                  {errorMessgae?.serial_number}
                </p>
                <ScrollView />
                </>
              )}
            </div>
            <div className="card-container-footer">
              <button className="btn-cancel">Cancel</button>
              <button type="submit" className="btn-submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

SerialNumber.propTypes = {
  handleSubmitHandler:PropTypes.func.isRequired,
  id:PropTypes.number.isRequired,
}

export default SerialNumber;
