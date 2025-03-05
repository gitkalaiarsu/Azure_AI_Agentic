import { updatedStatusChats } from "chat/redux/action/chatAction";
import { useAppDispatch, useAppSelector } from "chat/redux/store/hooks";
import TickIcon from "../../../assets/checked.png"
import React from "react";
import PropTypes from 'prop-types'

const InconvenienceCode = ({handleSubmitHandler, id}) => {
  const dispatch = useAppDispatch();
    const { SubmittedFormChats } = useAppSelector((state) => state.chatReducer);
  
  const submitResponse = (status) => {
    if(status)
    {
      const user_message = {
        user_input: status
      } 
      handleSubmitHandler(user_message);
      dispatch(updatedStatusChats(id));
    }
  }

  return (
    <div className="card_containers">
      <div className="card-form-container">
        <div className="card-form-divider">
            <h4>Do you want to claim a warranty?</h4>
        </div>
      {SubmittedFormChats?.includes(id) ? (
          <div className="status-container">
            <span className="tick-icon">
              <img src={TickIcon} alt="tick-icon" width={25} height={25}/>
            </span>
            <span className="status-text">Submitted</span>
          </div>
        ) : (
        <div className="card-container-footer">
          <button className="btn-cancel" onClick={() => submitResponse('no')}>No</button>
          <button className="btn-submit" onClick={() => submitResponse('yes')}>Yes</button>
        </div>
        )}
      </div>
    </div>
  );
};

InconvenienceCode.propTypes = {
  handleSubmitHandler:PropTypes.func.isRequired,
  id:PropTypes.number.isRequired,
}

export default InconvenienceCode;
