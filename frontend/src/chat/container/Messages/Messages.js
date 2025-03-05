/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import ChatThread from './ChatThread'
import { loggedIn } from '../../redux/action/chatAction'
import { useDispatch } from 'react-redux'
// import { BASE_URL } from 'chat/config'
// import { io } from 'socket.io-client'

const Messages = () => {
  const socketUrl = process.env.REACT_APP_SOCKET_URL
  const [ws, setWs] = useState(null)
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
    const newWs = new WebSocket(socketUrl)
    setWs(newWs)
    return () => {
      newWs.close()
    }
  }, [])

  useEffect(() => {
    if (ws) {
      ws.onopen = function () {
        console.log('socket connected')
      }
      ws.onerror = function (error) {
        console.error(error)
      }
      ws.onclose = function (error) {
        console.log('socket disconnected')
      }
    }
  }, [ws])

  return (
    <div className={userRole === 'admin' ? 'va-chatbot-wrapper' : 'va-chatbot-wrapper-user'}>
        <ChatThread
          socket={ws}
          disableChat={disableChat}
          setdisableChat={setdisableChat}
          closeVA={closeVA}
          userRole={userRole}
        />
    </div>
  )
}

export default Messages
