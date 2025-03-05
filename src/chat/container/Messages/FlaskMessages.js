/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import FlaskChatThread from './FlaskChatThread'
import { loggedIn } from '../../redux/action/chatAction'
import { io } from 'socket.io-client'
import { useDispatch } from 'react-redux'


const FlaskMessages = () => {
  const socketUrl = 'http://127.0.0.1:5000'
  const socket = io(socketUrl, { autoConnect: true })
  const [disableChat, setdisableChat] = useState(true)
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  let userRole = localStorage.getItem('role')
  const closeVA = () => {
    setShow(!show)
    localStorage.removeItem('va_email')
    dispatch(loggedIn(null))
  }

  useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected')
    })
    socket.on('disconnect', (err) => console.log(err))
  }, [socket])

  return (
    <div className={userRole === 'admin' ? 'va-chatbot-wrapper' : 'va-chatbot-wrapper-user'}>
        <FlaskChatThread
          socket={socket}
          disableChat={disableChat}
          setdisableChat={setdisableChat}
          closeVA={closeVA}
          userRole={userRole}
        />
    </div>
  )
}

export default FlaskMessages
