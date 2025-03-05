/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo, useRef } from "react";
import ChatHeader from "../../components/UI/Chat/ChatHeader";
import moment from "moment";
import ChatBox from "../../components/UI/Chat/ChatBox";
import { updatedChats } from "../../redux/action/chatAction";
import ScrollableFeed from "react-scrollable-feed";
import RenderContent from "./renderContent";
import { assistsType, disbaleChat, generateUniqueId, statementDetails } from "chat/utility/constant";
import { toast } from "react-toastify";
import ByeIcon from "../../../assets/Bye_image.svg";
import Login from "chat/components/Login";
import BotIcon from "../../../assets/chatbot-icon.png";
import { useAppDispatch, useAppSelector } from "chat/redux/store/hooks";
import PropTypes from "prop-types";
const ChatMemo = React.memo(ChatBox);

function ChatThread({
  socket,
  setdisableChat,
  disableChat,
  userRole,
}) {
  const { userChats, login_info } = useAppSelector((state) => state.chatReducer);
  console.log(userChats);
  
  const dispatch = useAppDispatch();
  const defaultMessage = {
    thinking: null,
    response: null,
  };
  

  const [input, setInput] = useState({ user_input: "" });
  const [chats, setChats] = useState(userChats);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [waitingTime, setWaitingTime] = useState(0);
  const [queryDisable, setQueryDisable] = useState(false);
  const [msgId, setMsgId] = useState("");
  const [string, setString] = useState(defaultMessage);
  const [responseEnded, setResponseEnded] = useState(false);
  const [islongresponse, setIsLongResponse] = useState(false);
  const messagesEndRef = useRef(null);
  const [conversationId, setConversationId] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [responseTime, setResponseTime] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [finalMessage, setFinalMessage] = useState("");
  const [decision, setDecision] = useState(null);
  const [disableFormStatus, setDisableFormStatus] = useState(false);
  const [isFurtherAssistance, setIsFurtherAssistance] = useState('')
  const faqQuestion = [
    "I am facing issues with my therapy machine",
    "My device isn't performing well, what can i do?",
    "How do I claim a warranty for my machine?",
  ];
  useEffect(() => {
    setChats(userChats);
    if (!userChats.length) {
      setInput({ user_input: "" });
    }
  }, [userChats]);

  useEffect(() => {
    setdisableChat(false);
  }, []);

  useEffect(() => {
    const botMsg = userChats[userChats?.length - 1]?.bot_msg;

    if (botMsg && Array.isArray(botMsg)) {
      const lastMessage = botMsg[botMsg.length - 1];

      if (lastMessage?.type === "response") {
        const checkResponse = disbaleChat?.includes(lastMessage?.card_key);
        if (checkResponse) {
          setdisableChat(true);
          toast.warning(
            "Conversation has ended. Please refresh or clear the chat to start a new session."
          );
          setFinalMessage(
            "Conversation has ended. Please refresh or clear the chat to start a new session."
          );
        }
      }
    }
  }, [userChats]);

  useEffect(() => {
    const botMsg = userChats[userChats?.length - 1]?.bot_msg;

    if (botMsg && Array.isArray(botMsg)) {
      const lastMessage = botMsg[botMsg.length - 1];

      if (lastMessage?.type === "response") {
        const checkResponse = statementDetails?.includes(lastMessage?.card_key);
        if (checkResponse) {
          setDisableFormStatus(true);
        }
      }
    }
  },[userChats[userChats?.length - 1]?.bot_msg])

  useEffect(() => {
    if (finalMessage) {
      setdisableChat(false);
    }
  }, [finalMessage]);

  useEffect(() => {
    if (error) {
      setError(prevError => {
        if(prevError !== error){
          return error;
        }
        return prevError;
      });
      let conversation = [...chats, { ...input, status: false }];
      setChats(conversation);
    }
  }, [error]);

  useEffect(() => {
    if (waitingTime) {
      setTimeout(() => {
        setWaitingTime(0);
        setError("");
        setError("System is Up");
        setdisableChat(false);
      }, waitingTime * 1000);
    }
  }, [waitingTime]);

  const chatData = useMemo(() => {
    return chats;
  }, [chats]);

  useEffect(() => {
    if (responseEnded) {
      if (string && Object?.keys(string)?.length > 0) {
        let conversation = [
          ...chats,
          {
            bot_msg: Object.values(string),
            id: msgId,
            time: moment().utc().format("LT"),
            isContinue: islongresponse,
            response_time: true,
          },
        ];
        setChats(conversation);
        dispatch(updatedChats(conversation));
        setString(defaultMessage);
        setdisableChat(false);
        setQueryDisable(false);
        if (userRole === "user") {
          setCountdown(120);
        }
      }
      setResponseEnded(false);
    }
  }, [responseEnded, string]);

  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [countdown]);
  // autofocus on every response
  useEffect(() => {
    if (chats.length) {
      if (window.innerWidth >= 768) {
        focusInputField();
      }
    }
  }, [chats]);

  const focusInputField = () => {
    // Set focus on the textarea after a delay (to avoid interference with autoscroll)
    setTimeout(() => {
      const textarea = document.getElementById("myTextArea").focus();
      if (textarea) {
        textarea.focus();
      }
    }, 1000);
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    setWordCount(e.target.value.length);
    autoIncreaseHeight();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  function getPanelKeys(message) {
    if (!message) return [];
    return Object.keys(message)
      .filter(key => message[key] !== "null")
      .map(key => key === "thinking" ? "reasoning" : key);
  }
  

  const fetchData = async (userInput) => {
    setIsFurtherAssistance('')
    let time_stamp;
    if (!chats.length) {
      time_stamp = moment().utc().format("YYYY-MM-DD HH:mm:ss");
      setStartTime(time_stamp);
    } else {
      time_stamp = startTime;
    }
    setDecision(null);
    let emitData = {
      action: "sendMessage",
      message: {
        ...userInput,
        time_stamp: time_stamp,
        email: login_info?.email,
        user_id: login_info?.user_id,
        role: userRole === "admin" ? "admin" : "user",
        initial_conversation: userChats?.length === 0,
        isCompleted: userInput.isCompleted
          ? userInput.isCompleted
          : responseTime,
      },
    };
    if (conversationId) {
      emitData = {
        action: "sendMessage",
        message: { ...emitData.message, conversation_id: conversationId },
      };
    }
    if (socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(emitData));
    } else if (socket.readyState === WebSocket.CLOSED) {
      const socketUrl = process.env.REACT_APP_SOCKET_URL;
      socket = new WebSocket(socketUrl);
      socket.onopen = function () {
        console.log("socket reconnected");
        socket.send(JSON.stringify(emitData));
      };
    } else {
      console.log("connection error");
    }
    socket.onmessage = function (event) {
      const msg = JSON.parse(event.data);
      if (msg.message?.decision) {
        setDecision(msg?.message?.decision);
      }

      if (msg.status) {
        if (responseTime) {
          setLoading(false);
          setInput({
            ...input,
            user_input: "",
            message_log: [],
            status: msg.status,
          });
          dispatch(updatedChats([]));
          setConversationId(null);
          return false;
        } else {
          if (msg.message?.thread_id) {
            setMsgId(msg.message.thread_id);
          }
          if (msg?.message?.thinking) {
            setResponseTime(false);
            // id initial open accordion
            const id = generateUniqueId();
            // message generated
            let responseBotMsg = {
              id: id,
              type: "thinking",
              content: msg?.message?.thinking,
              toolCalling: msg?.message?.tool_calling,
              actionPlan: msg?.message?.action_plan,
              panel: getPanelKeys(msg?.message),
            };
            setString((prevState) => ({
              ...prevState,
              thinking: responseBotMsg,
            }));
            setIsLongResponse(false);
            setLoading(false);
          } else if (msg.message.response) {
            setResponseTime(false);
            // id initial open accordion
            const id = generateUniqueId();
            // message generated
            let responseBotMsg = {
              id: id,
              type: "response",
              content: msg?.message?.response,
              card_key:msg?.message?.card_key,
            };
            setString((prevState) => ({
              ...prevState,
              response: responseBotMsg,
            }));
            setIsLongResponse(false);
            setLoading(false);
            if (msg?.message?.card_key === assistsType?.FurtherAssisstance) {
              setIsFurtherAssistance(assistsType?.FurtherAssisstance)
            } else if (msg?.message?.card_key === assistsType?.TroubleshootAssistance) {
              setIsFurtherAssistance(assistsType?.TroubleshootAssistance)
            }
          } else if (msg.message.conversation_id) {
            localStorage.setItem(
              "va_conversation_id",
              msg.message.conversation_id
            );
            setConversationId(msg.message.conversation_id);
          } else if (msg.message.id) {
            setMsgId(msg.message.id);
            setInput({
              ...input,
              id: msg.message.id,
              status: msg.message.status,
            });
          } else if (msg.message.message_log) {
            setInput({
              ...input,
              user_input: "",
              message_log: msg.message.message_log,
              status: msg.message.status,
            });
            setResponseEnded(true);
          }
        }
      } else if (msg.response) {
        setLoading(false);
        setString(msg.response);
        setIsLongResponse(false);
      } else if (
        msg.message ===
        "Please type a message that is less than 500 characters."
      ) {
        setdisableChat(false);
      } else {
        if (msg.message) {
          if(msg.message !== 'Endpoint request timed out') {
            setdisableChat(false);
            setError(msg.message);
            setResponseEnded(true);
            setLoading(false);
            if (msg.time_left) {
              setWaitingTime(msg.time_left);
            }
          }
        }
      }
    };
  };

  const handleSubmitHandler = (input) => {
    setDisableFormStatus(false);
    let chat = [...chats, { ...input, time: moment().utc().format("LT") }];
    setChats(chat);
    dispatch(updatedChats(chat));
    setInput({ ...input, user_input: "" });
    fetchData(input);
    setIsLongResponse(false);
    setLoading(true);
    setdisableChat(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setQueryDisable(true);
    let trimvalue = input.user_input.trim();
    setError("");
    setWordCount(0);

    if (input.user_input === "" || trimvalue.length === 0) {
      setError("Please enter your message");
    } else {
      setCountdown(null);
      input.id && delete input.id;
      handleSubmitHandler(input);
    }
    const textArea = document.getElementById("myTextArea");
    textArea.style.height = "50px";
  };

  const autoIncreaseHeight = () => {
    const textArea = document.getElementById("myTextArea");
    textArea.style.height = "50px";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  const handleAutoQuery = (ques) => {
    if (queryDisable === false && !finalMessage && !disableFormStatus) {
      setDecision(null);
      setQueryDisable(true);
      setIsLongResponse(false);
      setLoading(true);
      input.id && delete input.id;
      let chat = [
        ...chats,
        { ...input, user_input: ques, time: moment().utc().format("LT") },
      ];
      setChats(chat);
      dispatch(updatedChats(chat));
      setInput({ ...input, user_input: "" });
      fetchData({
        ...input,
        user_input: ques,
        time: moment().utc().format("LT"),
      });
      setdisableChat(true);
    }
  };

  useEffect(() => {
    if (responseTime) {
      fetchData({
        ...input,
        user_input: "Session Timeout",
        time: moment().utc().format("LT"),
      });
      openModal();
    }
  }, [responseTime]);

  useEffect(() => {
    if (countdown === 0) {
      openModal();
      setResponseTime(true);
    }
  }, [countdown]);

  function openModal() {
    document.getElementById("myModal").style.display = "block";
  }

  function closeModal() {
    dispatch(updatedChats([]));
    document.getElementById("myModal").style.display = "none";
    setResponseTime(false);
  }

  const handleChangeClear = () => {
    dispatch(updatedChats([]));
    setdisableChat(false);
    setFinalMessage("");
  };

  useEffect(() => {
    // Scroll to the bottom whenever the content updates
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [string]);

  return (
    <>
      <div
        className={
          userRole === "admin" ? "wrap-login100" : "wrap-login100-user"
        }
      >
        <div className={`login100-form main-overlay`}>
          <ChatHeader
            disableChat={disableChat}
            userRole={userRole}
            userChats={userChats}
            fetchData={fetchData}
            input={input}
            setFinalMessage={setFinalMessage}
            handleChangeClear={handleChangeClear}
          />
          <div className="inner-content-wrapper">
            <div className="inner-content-wrapper-one">
              <div className="after-content">
                <ScrollableFeed className={"chatbox__messages"}>
                  {!login_info?.user_id ? (
                    <Login />
                  ) : (
                    <div className="chatbox__messages">
                      <div className="btc_chat_card mt-50">
                        <div className="btc_chat_card">
                          <div className="va_wlcMsg_wrapper">
                            <h2 className="va_wlc_msg">Hi there <img src={ByeIcon} alt="bye-icon" /></h2>
                            <h2 className="va_wlc_msg">How can i help?</h2>
                          </div>
                          <div className="va_predefined_wrapper">
                            {faqQuestion?.map((item) => {
                              return (
                                <button
                                  disabled={isFurtherAssistance || disableChat || queryDisable}
                                  key={item}
                                  className={
                                     queryDisable || disableFormStatus || isFurtherAssistance
                                      ? "pre_written_query pre_written_query_disable"
                                      : "pre_written_query"
                                  }
                                  onClick={() =>
                                    (!queryDisable || !disableFormStatus) && handleAutoQuery(item)
                                  }
                                  onKeyDown={(e) => {
                                    if(e.key ==='Enter' || e.key === ''){
                                      (!queryDisable || !disableFormStatus) && handleAutoQuery(item)
                                    }
                                  }}
                                >
                                  <span className="va_icon_wrap">
                                    <svg
                                      width="32"
                                      height="32"
                                      viewBox="0 0 32 32"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <circle
                                        cx="16"
                                        cy="16"
                                        r="16"
                                        fill="white"
                                      />
                                      <path
                                        d="M23.4167 15.5829C23.4167 12.6008 20.9992 10.1834 18.0171 10.1834H13.9829C11.0008 10.1834 8.58333 12.6008 8.58333 15.5829V16.4171C8.58333 19.3992 11.0008 21.8167 13.9829 21.8167H23.4167V15.5829Z"
                                        stroke="#424243"
                                        strokeWidth="1.16667"
                                      />
                                      <circle
                                        cx="0.788955"
                                        cy="0.788955"
                                        r="0.583333"
                                        transform="matrix(-1 0 0 1 19.7344 15.4666)"
                                        fill="white"
                                        stroke="#424243"
                                        strokeWidth="0.411242"
                                      />
                                      <circle
                                        cx="0.788955"
                                        cy="0.788955"
                                        r="0.583333"
                                        transform="matrix(-1 0 0 1 17.1045 15.4666)"
                                        fill="white"
                                        stroke="#424243"
                                        strokeWidth="0.411242"
                                      />
                                      <circle
                                        cx="0.788955"
                                        cy="0.788955"
                                        r="0.583333"
                                        transform="matrix(-1 0 0 1 14.4746 15.4666)"
                                        fill="white"
                                        stroke="#424243"
                                        strokeWidth="0.411242"
                                      />
                                    </svg>
                                  </span>

                                  <p className="va_predefine_text">{item}</p>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <ChatMemo
                    chats={chatData}
                    setdisableChat={setdisableChat}
                    countdown={countdown}
                    disableChat={disableChat}
                    handleSubmitHandler={handleSubmitHandler}
                    isFurtherAssistance={isFurtherAssistance}
                    setIsFurtherAssistance={setIsFurtherAssistance}
                    handleAutoQuery={handleAutoQuery}
                  />
                  {(string?.thinking !== null || string?.response !== null) && (
                    <img
                      src={BotIcon}
                      alt="bot-icon"
                      width={35}
                      height={35}
                      className="bot-icon"
                    />
                  )}
                  <RenderContent
                    loading={loading}
                    messages={Object.values(string)}
                    decision={decision}
                    handleSubmitHandler={handleSubmitHandler}
                  />
                  {error && error !== "Endpoint request timed out" ? (
                    <div className="va_error_section error_msg">{error}</div>
                  ) : null}
                </ScrollableFeed>
              </div>
              {login_info?.user_id ? (
                <div className={`input_wrp_btm`}>
                  {wordCount >= 500 ? (
                    <div className="va_error_section">
                      {"You have reached the character limit of 500"}
                    </div>
                  ) : null}
                  <form
                    onSubmit={(e) => handleSubmit(e)}
                    autoComplete="off"
                    disabled={wordCount >= 500}
                  >
                    <div className="message_group">
                      <textarea
                        id="myTextArea"
                        disabled={(!disableChat && finalMessage) || disableChat || disableFormStatus || isFurtherAssistance}
                        style={{
                          border: input?.user_input
                            ? "2px solid #be322b"
                            : "2px solid #dbdbdb",
                        }}
                        type="text"
                        onKeyDown={wordCount >= 500 ? undefined : handleKeyDown}
                        className="input_modify text_area_input chat_box_textarea"
                        name="user_input"
                        placeholder="Ask a question here"
                        value={input?.user_input}
                        onChange={handleChange}
                      />
                      <button
                        disabled={
                          loading ||
                          input?.user_input === "" ||
                          wordCount >= 500
                        }
                        className="chatbox_btn"
                        style={{
                          color: "white",
                          border: "none",
                          background:
                            loading ||
                            input?.user_input === "" ||
                            wordCount >= 500
                              ? "#E6E6E7"
                              : "#be322b",
                        }}
                        type="submit"
                      >
                        {loading ||
                        input?.user_input === "" ||
                        wordCount >= 500 ? (
                          <svg
                            width="29"
                            height="28"
                            viewBox="0 0 29 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.80554 23.2593V4.74075L25.7963 14L3.80554 23.2593ZM5.54165 20.5683L21.2824 14L5.54165 7.34492V12.206L12.544 14L5.54165 15.7361V20.5683Z"
                              fill="#B7B7B8"
                            />
                          </svg>
                        ) : (
                          <svg
                            width="29"
                            height="28"
                            viewBox="0 0 29 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.80554 23.2593V4.74075L25.7963 14L3.80554 23.2593ZM5.54165 20.5683L21.2824 14L5.54165 7.34492V12.206L12.544 14L5.54165 15.7361V20.5683Z"
                              fill="#fff"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div id="myModal" className="modal-feedback">
        <div className="modal-content-feedback">
          <div className="modal-body-feedback">
            <h2 className="text-heading">Session Expired !</h2>
            <p className="text-info">
              Since we haven't heard from you for some time, this chat session
              is now closed.
            </p>
            <div className="modal-footer-feedback">
              <button
                type="button"
                className="btn-feedback btn-primary"
                onClick={closeModal}
              >
                Start a new conversation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ChatThread.propTypes = {
  socket:PropTypes.instanceOf(WebSocket).isRequired,
  setdisableChat:PropTypes.func.isRequired,
  disableChat:PropTypes.bool.isRequired,
  userRole:PropTypes.string.isRequired
}
export default ChatThread;
