import React from "react";
import ReactMarkdown from "react-markdown";
import { Typing } from "chat/components/Typing/Typing";
import {  statementDetails } from "chat/utility/constant";
import ErrorCode from "chat/components/CardFeatures/errorCode";
import SerialNumber from "chat/components/CardFeatures/serialNumber";
import InconvenienceCode from "chat/components/CardFeatures/inconvenienceCode";
import { ScrollView } from "chat/components/UI/Chat/ScrollView";
import PropTypes from 'prop-types'
import CPAPScrollspy from "chat/components/CPAPScrollspy";

const RenderContent = ({
  loading,
  messages,
  decision,
  handleSubmitHandler,
  card_key,
}) => {

  if (loading) {
    return (
      <>
        {/* loading is true */}
        {!decision && <Typing />}
        {/* troubleshoot_node or warranty_node */}
        {(decision === "troubleshoot_node" || decision === "warranty_node") && (
          <div className="typing-container">
            <h5 className="flash-text">Thinking...</h5>
          </div>
        )}
        {/* general_support_node */}
        {decision === "general_support_node" && <Typing />}
      </>
    );
  }

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
    //  else if(StatementsDetails?.ThankyouCode === content)
    // {
    //   return (
    //     <>
    //       <ThankyouCode content={content} id={id}/>
    //       <ScrollView />
    //     </>
    //   );
    // }
    else {
      console.log("Else block executed");
      return (
        <>
          <ReactMarkdown className="reason-processed">{content}</ReactMarkdown>
          <ScrollView />
        </>
      );
    }
  };

  if (messages && messages[0] !== null && messages?.length > 0) {
    return (
      <>
        {messages?.map((message, index) => {
          if (!message || !message.id || !message.type || !message.content) {
            return null;
          }
          const { id, type, content,card_key} = message;
          // check if the content is in the statementDetails array
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
            <div key={id} className="btc_chatgroup btc_chat_card_bot">
              {type === "thinking" ? (
                <>
                 {/* <AccordionComponent id={id} content={content}/> */}
                 <CPAPScrollspy message={message}/>

                </>
              ) : (
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
              )}
            </div>
          );
        })}
      </>
    );
  }

  return null;
};

RenderContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id:PropTypes.string.isRequired,
      type:PropTypes.oneOf(['thinking','response']).isRequired,
      content:PropTypes.string.isRequired,
      card_key:PropTypes.string
    })
  ).isRequired,
  decision:PropTypes.string.isRequired,
  handleSubmitHandler:PropTypes.func.isRequired,
  card_key:PropTypes.string
}

export default RenderContent;
