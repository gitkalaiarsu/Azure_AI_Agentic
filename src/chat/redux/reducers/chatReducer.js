import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorageData } from "chat/utility/constant";
const loginInfo = getLocalStorageData("userInfo", null);

const initialState = {
  messages: [],
  userChats: [],
  SubmittedFormChats: [],
  chatFeedback: "",
  username: localStorage.getItem("username") ?? null,
  email: "",
  accordianOpen: [],
  login_info: loginInfo,
};

export const chatReducer = createSlice({
  name: "chatReducer",
  initialState,
  reducers: {
    getMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    updateChat: (state, action) => {
      state.userChats = action.payload;
    },
    updateChatStatus: (state, action) => {
      state.SubmittedFormChats = [...state.SubmittedFormChats, action.payload];
    },

    getFeedBackQuery: (state, action) => {
      state.chatFeedback = action.payload;
    },
    userLoggedIn: (state, action) => {
      state.username = action.payload;
    },
    setAccordianOpen: (state, action) => {
      const newKey = action.payload;
      state.accordianOpen = state.accordianOpen.includes(newKey)
        ? state.accordianOpen.filter((key) => key !== newKey)
        : [...state.accordianOpen, newKey];
    },
    setLogin: (state, action) => {
      localStorage.setItem("userInfo", JSON.stringify(action?.payload));
      state.login_info = action.payload;
    },
  },
});

export const {
  updateChat,
  getMessages,
  getFeedBackQuery,
  userLoggedIn,
  setAccordianOpen,
  setLogin,
  updateChatStatus,
} = chatReducer?.actions;

export default chatReducer.reducer;
