const MessageBox = ({ message }) => {
  if (!message) return

  return <div className="message-box">{message}</div>
}

export default MessageBox
