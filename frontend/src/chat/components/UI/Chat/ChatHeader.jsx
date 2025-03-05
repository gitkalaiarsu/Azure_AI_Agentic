import React from "react";
import { updatedChats } from "../../../redux/action/chatAction";
import clearIcon from "../../../../assets/clear chat white.svg";
import { useAppDispatch, useAppSelector } from "chat/redux/store/hooks";
import PropTypes from 'prop-types'

export default function ChatHeader({ disableChat, userRole, handleChangeClear }) {
  const dispatch = useAppDispatch();
  const { login_info } = useAppSelector((state) => state.chatReducer);

  let conversation_id = localStorage.getItem("va_conversation_id");
  return (
    <div className="btc_chat_header_wrapper">
      <div className="btc_chat_innerheader">
        {/* <div className="btc_brand_wrapper">
          <span>
            <img
              src="https://webuyexotics.com/wp-content/uploads/2022/02/WBE_logo.png"
              alt="brand"
              className="btc_brand_img"
            />
          </span>
        </div> */}

        <div className="btc_title_wrapper">
          <h2>{"Customer Exchange"}</h2>
        </div>
        {login_info?.user_id && (
        <div className="btc_chat_header_btn_wrapper">
          {conversation_id ? (
            <div className="chat_id"> {`#${conversation_id}`}</div>
          ) : null}
          <div className="btc_chat_header_btn">
            <div className="btc_conversation_id_div"></div>
            {userRole === "admin" ? (
              <button
                className="new_conversation_btn"
                style={{ color: disableChat ? "lightgray" : "#373633" }}
                onClick={() =>
                  disableChat ? undefined : dispatch(updatedChats([]))
                }
              >
                <span>Start a New Conversation</span>
                <img src="images/" alt="icon" />
              </button>
            ) : (
              <div aria-label="ClearChat" className="clear_icon">
                <img
                  src={clearIcon}
                  alt="clearChat"
                  onClick={() =>
                    handleChangeClear()
                  }
                  onKeyDown={(e) => {
                    if(e.key === 'Enter' || e.key === '' ){
                      handleChangeClear()
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}

ChatHeader.propTypes = {
  disableChat:PropTypes.bool.isRequired,
  userRole:PropTypes.string.isRequired,
  handleChangeClear:PropTypes.func.isRequired,
}