import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store/store'
import Messages from './container/Messages/Messages'
import './index.css'
import './styles/main.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import FlaskMessages from './container/Messages/FlaskMessages'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Chatbot = () => {
  const localRunning = window.location.href === 'http://localhost:3000/';
  return (
    <div>
      <Provider store={store}>
        <ToastContainer />
       {localRunning ? <FlaskMessages /> : <Messages />}
      </Provider>
    </div>
  )
}

export default Chatbot
