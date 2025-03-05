import React, { useEffect, useRef } from 'react'

export const ScrollView = () => {
    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        // eslint-disable-next-line no-unused-expressions
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  
    useEffect(() => {
        scrollToBottom()
    }, []);
  return (
    <div ref={messagesEndRef} />
  )
}
