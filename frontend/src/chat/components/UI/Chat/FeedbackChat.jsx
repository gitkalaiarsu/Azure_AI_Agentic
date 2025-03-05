/* eslint-disable jsx-a11y/role-supports-aria-props */
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { toast } from 'react-toastify';
import { feedback } from 'chat/redux/action/chatAction';
import PropTypes from 'prop-types'

const FeedbackChat = ({ val }) => {
  const [feedbackMsg, setFeedbackMsg] = useState(false)
  const [feedbackRecieved, setFeedbackRecieved] = useState("")
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleThumbsUp = (e) => {
    const body = {
        id: val?.id,
        feedback: 'accepted',
        text: ''
    }
    dispatch(feedback(body)).then(() => {
      setFeedbackRecieved(e.target.value)
    })
  }

  const handleThumbsDown = () => {
    if(!feedbackMsg){
      toast.warning("Please write a message.")
    } else {
      const body = {
        id: val?.id,
        feedback: 'declined',
        text: feedbackMsg
      }
      setIsLoading(true)
      dispatch(feedback(body)).then(() => {
        setFeedbackRecieved('poor')
        setOpen(false)
        setIsLoading(false)
      })
    }
  }


  return (
      <div className='btc_chat_card_wrapper'>
        <div className="btc_chat_card">
          <div className='btc_feedback_btn' >
            <ul>
              <li style={{ border: feedbackRecieved === "excellent" ? "1px solid #9d2872" : "1px solid #cacaca", outline: feedbackRecieved === "excellent" ? "1px solid #9d2872" : "", background: feedbackRecieved === "excellent" ? "#9D28721A" : "none",pointerEvents: feedbackRecieved === "excellent" ? "none" : "auto"
 }}>
                <input disabled={val?.id && feedbackRecieved ==='excellent' ? true : false} type="radio" id={`like${val?.id}`} name={`feedback${val?.id}`} value={"excellent"} onChange={handleThumbsUp} />
                <label htmlFor={`like${val?.id}`}>
                  <span className='btc_fbk_btn'>
                    {feedbackRecieved === "excellent" ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.023" height="17.033" viewBox="0 0 30.023 28.033">
                        <g id="Group_108279" data-name="Group 108279" transform="translate(854 -6465.967)">
                          <g id="like_3_" data-name="like (3)" transform="translate(-855.5 6464)">
                            <path id="Path_860864" data-name="Path 860864" d="M30.087,13.647a2.343,2.343,0,0,0-1.939-1.031H14.673c-.179-.028-.238-.1-.227-.291l1.716-8.3a.97.97,0,0,0-1.75-.633L8.238,12.02a3.57,3.57,0,0,0-.669,2.09V26.627A2.364,2.364,0,0,0,9.919,29h12.1a2.314,2.314,0,0,0,2.161-1.445l6.146-11.688A2.378,2.378,0,0,0,30.087,13.647Z" fill="none" stroke="#9D2872" strokeWidth="2" />
                            <path id="Path_860865" data-name="Path 860865" d="M5.3,12.616H2.507A1.008,1.008,0,0,0,1.5,13.622v14.37A1.009,1.009,0,0,0,2.507,29H5.3A1.008,1.008,0,0,0,6.3,27.993V13.623A1.009,1.009,0,0,0,5.3,12.616Z" transform="translate(1)" fill="none" stroke="#9D2872" strokeWidth="2" />
                          </g>
                        </g>
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.023" height="17.033" viewBox="0 0 30.023 28.033">
                        <g id="Group_108279" data-name="Group 108279" transform="translate(854 -6465.967)">
                          <g id="like_3_" data-name="like (3)" transform="translate(-855.5 6464)">
                            <path id="Path_860864" data-name="Path 860864" d="M30.087,13.647a2.343,2.343,0,0,0-1.939-1.031H14.673c-.179-.028-.238-.1-.227-.291l1.716-8.3a.97.97,0,0,0-1.75-.633L8.238,12.02a3.57,3.57,0,0,0-.669,2.09V26.627A2.364,2.364,0,0,0,9.919,29h12.1a2.314,2.314,0,0,0,2.161-1.445l6.146-11.688A2.378,2.378,0,0,0,30.087,13.647Z" fill="none" stroke="#424243" strokeWidth="2" />
                            <path id="Path_860865" data-name="Path 860865" d="M5.3,12.616H2.507A1.008,1.008,0,0,0,1.5,13.622v14.37A1.009,1.009,0,0,0,2.507,29H5.3A1.008,1.008,0,0,0,6.3,27.993V13.623A1.009,1.009,0,0,0,5.3,12.616Z" transform="translate(1)" fill="none" stroke="#424243" strokeWidth="2" />
                          </g>
                        </g>
                      </svg>

                    }
                  </span>
                  <span className='btc_fbk_text'>Helpful</span>
                </label>
              </li>
              <li style={{ border: feedbackRecieved === "poor" ? "1px solid #9d2872" : "1px solid #cacaca", outline: feedbackRecieved === "poor" ? "1px solid #9d2872" : "", background: feedbackRecieved === "poor" ? "#9D28721A" : "none",pointerEvents: feedbackRecieved === "poor" ? "none" : "auto" }}>
                <input disabled={val?.id && feedbackRecieved === 'poor' ? true : false} type="radio" id={`dislike${val?.id}`} name={`feedback${val?.id}`} value={"poor"} onClick={handleClickOpen} />
                <label htmlFor={`dislike${val?.id}`}>
                  <span className='btc_fbk_btn btc_fbk_btn_dislike'>
                    {/* <img src={feedbackRecieved === "poor" ? "thumbsuppink" :"UpImg"} alt="icon" /> */}
                    {feedbackRecieved === "poor" ?
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.023" height="17.033" viewBox="0 0 30.023 28.033">
                        <g id="Group_108279" data-name="Group 108279" transform="translate(854 -6465.967)">
                          <g id="like_3_" data-name="like (3)" transform="translate(-855.5 6464)">
                            <path id="Path_860864" data-name="Path 860864" d="M30.087,13.647a2.343,2.343,0,0,0-1.939-1.031H14.673c-.179-.028-.238-.1-.227-.291l1.716-8.3a.97.97,0,0,0-1.75-.633L8.238,12.02a3.57,3.57,0,0,0-.669,2.09V26.627A2.364,2.364,0,0,0,9.919,29h12.1a2.314,2.314,0,0,0,2.161-1.445l6.146-11.688A2.378,2.378,0,0,0,30.087,13.647Z" fill="none" stroke="#9D2872" strokeWidth="2" />
                            <path id="Path_860865" data-name="Path 860865" d="M5.3,12.616H2.507A1.008,1.008,0,0,0,1.5,13.622v14.37A1.009,1.009,0,0,0,2.507,29H5.3A1.008,1.008,0,0,0,6.3,27.993V13.623A1.009,1.009,0,0,0,5.3,12.616Z" transform="translate(1)" fill="none" stroke="#9D2872" strokeWidth="2" />
                          </g>
                        </g>
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" width="17.023" height="17.033" viewBox="0 0 30.023 28.033">
                        <g id="Group_108279" data-name="Group 108279" transform="translate(854 -6465.967)">
                          <g id="like_3_" data-name="like (3)" transform="translate(-855.5 6464)">
                            <path id="Path_860864" data-name="Path 860864" d="M30.087,13.647a2.343,2.343,0,0,0-1.939-1.031H14.673c-.179-.028-.238-.1-.227-.291l1.716-8.3a.97.97,0,0,0-1.75-.633L8.238,12.02a3.57,3.57,0,0,0-.669,2.09V26.627A2.364,2.364,0,0,0,9.919,29h12.1a2.314,2.314,0,0,0,2.161-1.445l6.146-11.688A2.378,2.378,0,0,0,30.087,13.647Z" fill="none" stroke="#424243" strokeWidth="2" />
                            <path id="Path_860865" data-name="Path 860865" d="M5.3,12.616H2.507A1.008,1.008,0,0,0,1.5,13.622v14.37A1.009,1.009,0,0,0,2.507,29H5.3A1.008,1.008,0,0,0,6.3,27.993V13.623A1.009,1.009,0,0,0,5.3,12.616Z" transform="translate(1)" fill="none" stroke="#424243" strokeWidth="2" />
                          </g>
                        </g>
                      </svg>
                    }
                  </span>
                  <span className='btc_fbk_text'>Not Helpful</span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          className='feedback_dailog_container'
        >
          <DialogTitle className='feedback_title'>Feedback</DialogTitle>
          <DialogContent>
            <TextareaAutosize
              autoFocus
              required
              className='feedback_textarea'
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => setFeedbackMsg(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button className='feedback_cnl_btn' onClick={handleClose} >Cancel</Button>
            <Button className='feedback_btn' type="button" disabled={isLoading} onClick={handleThumbsDown}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
  )
}

FeedbackChat.propTypes = {
  val: PropTypes.shape({
    id: PropTypes.string.isRequired, 
  }).isRequired,
};


export default FeedbackChat
