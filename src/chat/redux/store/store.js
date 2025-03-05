import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../reducers/chatReducer'

const store = configureStore({
  reducer: {
    chatReducer: chatReducer,
  },
})

export default store
