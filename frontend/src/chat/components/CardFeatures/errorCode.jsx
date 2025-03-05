import { updatedStatusChats } from "chat/redux/action/chatAction";
import { useAppSelector } from "chat/redux/store/hooks";
import useCommonValidation from "chat/utility/commonValidation";
import React from "react";
import TickIcon from "../../../assets/checked.png";
import { useDispatch } from "react-redux";
import { ScrollView } from "../UI/Chat/ScrollView";
import PropTypes from 'prop-types'

const ErrorCode = ({ handleSubmitHandler, id }) => {
  const dispatch = useDispatch();
  const { SubmittedFormChats } = useAppSelector((state) => state.chatReducer);

  const initialState = {
    error_code: "",
  };

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
      dispatch(updatedStatusChats(id));
      resetForm();
      const user_message = {
        user_input: formValues?.error_code,
      };
      handleSubmitHandler(user_message);
    }
  };

  return (
    <div className="card_containers">
      <div className="card_label_containers">
        <h5>
          To help you better, could you tell me if there's any error code
          showing up?
        </h5>
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
              <label htmlFor="errorcode">Error Code</label>
              <input
                type="text"
                name="error_code"
                id="error_code"
                placeholder="Enter Error code"
                value={formValues.error_code}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {errorMessgae.error_code && (
                <>
                  <p className="card-error-message">
                    {errorMessgae?.error_code}
                  </p>
                  <ScrollView />
                </>
              )}
            </div>
            <div className="card-container-footer">
              <button className="btn-cancel">Cancel</button>
              <button className="btn-submit" type="submit">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


export default ErrorCode;

ErrorCode.propTypes = {
  handleSubmitHandler:PropTypes.func.isRequired,
  id:PropTypes.number.isRequired,
}