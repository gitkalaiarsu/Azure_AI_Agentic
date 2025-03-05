import React from "react";
import TextChat from "./TextChat";
import { ScrollView } from "./ScrollView";
import BotIcon from "../../../../assets/chatbot-icon.png";
import userIcon from "../../../../assets/group-chat.png";
import PropTypes from "prop-types";

const ChatBox = ({ chats, setdisableChat, handleSubmitHandler, isFurtherAssistance, setIsFurtherAssistance, handleAutoQuery }) => {

  return (
    <div>
      {chats?.length
        ? chats?.map((val, index) => {
          const key = `skeleton${index + 1}`;
            return (
              <div key={key}>
                {val?.user_input && val?.user_input !== "" ? (
                 <>
                 <div className="btc_chat_card_wrapper">
                   <div className="btc_chat_card btc_chat_card_right">
                     <span className="btc_chat_card_user">
                       {val?.user_input}
                     </span>
                   </div>
                   <div className="user-group-img">
                    <img
                      src={userIcon}
                      alt="User Icon"
                      width={35}
                      height={35}
                      className="user-icon"
                    />
                   </div>
                 </div>
                 <ScrollView />
               </>
               
                ) : null}
                {val?.bot_msg ? (
                  val.status === false ? (
                    ""
                  ) : (
                    <>
                    {(val?.bot_msg?.[1] !== null) && (
                      <img
                        src={BotIcon}
                        alt="bot-icons"
                        width={35}
                        height={35}
                        className="bot-icon"
                      />
                    )}

                      <TextChat
                        index={index}
                        msg={val?.bot_msg}
                        setdisableChat={setdisableChat}
                        handleSubmitHandler={handleSubmitHandler}
                        setIsFurtherAssistance ={setIsFurtherAssistance}
                        handleAutoQuery={handleAutoQuery}
                        isFurtherAssistance={isFurtherAssistance}
                      />
                    </>
                  )
                ) : null}
              </div>
            );
          })
        : null}
    </div>
  );
};

const userMsgPropType = PropTypes.shape({
  user_input:PropTypes.string.isRequired,
  time:PropTypes.string.isRequired,
})

const botMsgPropType = PropTypes.shape({
  bot_msg:PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.oneOf([null]),
      PropTypes.shape({
        content:PropTypes.string.isRequired,
        id:PropTypes.string.isRequired,
        status:PropTypes.string.isRequired,
        type:PropTypes.string.isRequired,
      })
    ])
  ).isRequired,
  id:PropTypes.string.isRequired,
  isContinue:PropTypes.bool.isRequired,
  response_time:PropTypes.bool.isRequired,
  time:PropTypes.string.isRequired,
})

ChatBox.propTypes = {
  chats:PropTypes.arrayOf(
    PropTypes.oneOfType([
      userMsgPropType,
      botMsgPropType,
    ])
  ).isRequired,
  setdisableChat:PropTypes.func.isRequired,
  handleSubmitHandler:PropTypes.func.isRequired,
  isFurtherAssistance: PropTypes.string.isRequired, 
  setIsFurtherAssistance: PropTypes.func.isRequired, 
  handleAutoQuery: PropTypes.func.isRequired
}
export default ChatBox;
