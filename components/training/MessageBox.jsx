import { useState, useEffect } from 'react'

const MessageBox = ({ message, messageClearTimeout, onMessageClear }) => {
  const [messageTimeout, setMessageTimeout] = useState(null)

  useEffect(() => {
    if (!message) return

    if (messageTimeout) clearTimeout(messageTimeout)

    const timeout = setTimeout(() => {
      onMessageClear()
      clearTimeout(messageTimeout)
      setMessageTimeout(null)
    }, messageClearTimeout)

    setMessageTimeout(timeout)
  }, [message])

  if (!message) return

  return <div className="message-box">{message}</div>
}

export default MessageBox
