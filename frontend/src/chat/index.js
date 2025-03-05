import React from 'react'
import ReactDOM from 'react-dom'
import Chatbot from './Chatbot'

const initializeChatbot = () => {
  const chatbotContainer = document.createElement('div')
  chatbotContainer.id = 'chatbot-container'
  document.body.appendChild(chatbotContainer)
  ReactDOM.render(<Chatbot />, chatbotContainer)
}

initializeChatbot()
