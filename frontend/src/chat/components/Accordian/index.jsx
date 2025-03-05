import React from "react";
import openArrowImage from "../../../assets/Arrowopen.svg";
import { useAppDispatch, useAppSelector } from "chat/redux/store/hooks";
import { setAccordianOpen } from "chat/redux/reducers/chatReducer";
import ReactMarkdown from "react-markdown";
import PropTypes from 'prop-types'


const AccordionComponent = ({id, content}) => {
      const dispatch = useAppDispatch();
    
      const { accordianOpen } = useAppSelector((state) => state.chatReducer);
    
      const toggleAccordion = (key) => {
        const newKey = `${key}`;
        dispatch(setAccordianOpen(newKey));
      };
  return (
    <div className="chat-container-accordion">
      <div
        className="reason-box"
        onClick={() => toggleAccordion(id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === "") {
            toggleAccordion(id);
          }
        }}
      >
        <p className="reason-time">Thought Process</p>
        <img
          src={openArrowImage}
          alt="open"
          style={{
            width: "15px",
            height: "15px",
            cursor: "pointer",
            transform: accordianOpen.includes(id)
              ? "rotate(180deg)"
              : "rotate(0deg)", // Rotate 180 degrees when open
            transition: "transform 0.3s ease", // Smooth transition for the rotation
          }}
        />
      </div>
      <div
        className={`reason-content ${
          accordianOpen?.includes(id) ? "open" : "closed"
        }`}
        id="reasonContent"
      >
        <div className="btc_chat_card_content">
          <ReactMarkdown className="reason-processing">{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default AccordionComponent;


AccordionComponent.propTypes = {
 id: PropTypes.string.isRequired,
 content: PropTypes.string.isRequired
}