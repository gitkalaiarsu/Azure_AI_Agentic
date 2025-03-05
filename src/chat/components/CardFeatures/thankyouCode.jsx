import React from "react";
import PropTypes from 'prop-types'

const ThankyouCode = ({ content, id }) => {
  return (
    <div className="card_containers">
      <div className="card_label_containers">
        <h5>{content}</h5>
        <div className="popup-container">
          <div className="popup">
            <h3>Tell us more:</h3>
            <div className="feedback-options">
              <button className="feedback-btn">Didn’t provide answer</button>
              <button className="feedback-btn">Not relevant</button>
              <button className="feedback-btn">Not factually correct</button>
              <button className="feedback-btn">Didn’t like the answer</button>
              <button className="feedback-btn">Didn’t like the style</button>
              <button className="feedback-btn">Others</button>
            </div>
            <button className="submit-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

ThankyouCode.propTypes= {
  content: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default ThankyouCode;
