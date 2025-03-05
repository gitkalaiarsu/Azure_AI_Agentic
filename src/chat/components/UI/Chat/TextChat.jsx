import React from "react";
import ReactMarkdown from "react-markdown";
import { assistsType, statementDetails} from "chat/utility/constant";
import ErrorCode from "chat/components/CardFeatures/errorCode";
import InconvenienceCode from "chat/components/CardFeatures/inconvenienceCode";
import SerialNumber from "chat/components/CardFeatures/serialNumber";
import { ScrollView } from "./ScrollView";
import PropTypes, { element } from 'prop-types'
import CPAPScrollspy from "chat/components/CPAPScrollspy";

const TextChat = ({ msg,  messagesEndRef, handleSubmitHandler,card_key, setIsFurtherAssistance, handleAutoQuery, isFurtherAssistance}) => {

  const renderContent = (content, id,card_key) => {
    if (card_key === "error_code") {
      return (
        <>
          <ErrorCode handleSubmitHandler={handleSubmitHandler} id={id} />
          <ScrollView />
        </>
      );
    } else if (card_key === "want_warranty") {
      return (
        <>
          <InconvenienceCode
            handleSubmitHandler={handleSubmitHandler}
            id={id}
          />
          <ScrollView />
        </>
      );
    } else if (card_key === "serial_number") {
      return (
        <>
          <SerialNumber handleSubmitHandler={handleSubmitHandler} id={id} />
          <ScrollView />
        </>
      );
    } 
    // else if(StatementsDetails?.ThankyouCode === content)
    //   {
    //     return (
    //       <>
    //         <ThankyouCode content={content} id={id}/>
    //         <ScrollView />
    //       </>
    //     );
    //   }
    else {
      return (
        <>
          <ReactMarkdown className="reason-processed">{content}</ReactMarkdown>
          <ScrollView />
        </>
      );
    }
  };
  const sendMessage = (item) => {
    handleAutoQuery(item)
    setIsFurtherAssistance('')
  }
  const renderButtons = (card_key) => {
    if((card_key === assistsType.FurtherAssisstance) && isFurtherAssistance) {
        return (
           <div className="further_btn_wrapper">
            <button type="button" className="further_btn" onClick={() => sendMessage("Okay, Thanks for the help")}>Okay, Thanks for the help</button>
            <button type="button" className="further_btn" onClick={() => sendMessage("I need further assistance")}>I need further assistance</button>
          </div>
        );
      } else if ((card_key === assistsType?.TroubleshootAssistance) && isFurtherAssistance) {
      return (
        <div className="further_btn_wrapper">
          <button type="button" className="further_btn" onClick={() => sendMessage("Issue resolved")}>Issue resolved</button>
          <button type="button" className="further_btn" onClick={() => sendMessage("Issue still persists")}>Issue still persists</button>
        </div>
      )
    } 
  }

  // If msg has data, we iterate through it
  return (
    <>
      {msg?.map((message, index) => {
        if (!message) return null;

        if (message) {
          const { type, content, id,card_key } = message;
          const commonStyle = statementDetails?.includes(card_key)
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            : {
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              };
          return (
            <div key={id}>
              <div key={id} className="btc_chatgroup btc_chat_card_bot">
                {type === "thinking" ? (
                  <>
                  {/* <AccordionComponent id={id} content={content} /> */}
                  <CPAPScrollspy message={message}/>
                  </>
                ) : (
                  <>
                    <div
                      className="btc_chat_card_content"
                      style={{
                        padding: statementDetails?.includes(card_key)
                          ? "10px"
                          : "0px",
                        ...commonStyle,
                      }}
                    >
                      {renderContent(content, id,card_key)}
                    </div>
                    {renderButtons(card_key)}
                  </>
                )}
              </div>
            </div>
          );
        }
        return null;
      })}
      <div ref={messagesEndRef} />
    </>
  );
};

const msgPropType = PropTypes.arrayOf(
 PropTypes.shape ({
  id:PropTypes.string.isRequired,
  type:PropTypes.oneOf(['thinking','response']).isRequired,
  content:PropTypes.string.isRequired,
  card_key:PropTypes.string,
})
)

TextChat.propTypes = {
  messagesEndRef:PropTypes.shape({
    current:PropTypes.instanceOf(element)
  }),
  msg: msgPropType.isRequired,
  handleSubmitHandler:PropTypes.func.isRequired,
  card_key:PropTypes.string,
  isFurtherAssistance: PropTypes.string.isRequired, 
  setIsFurtherAssistance: PropTypes.func.isRequired, 
  handleAutoQuery: PropTypes.func.isRequired
}
export default TextChat;
