import React from 'react'
import ReactDOM from 'react-dom'
import Chatbot from './chat/Chatbot'

const app = (
  <React.StrictMode>
    <Chatbot />
  </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'))
