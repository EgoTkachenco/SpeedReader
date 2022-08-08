const ReaderView = ({ settings, text, currentPosition }) => {
  return (
    <div
      id="reader-view"
      className="zoom-reader"
      style={{
        transform: `${settings.rotate ? 'rotate(180deg)' : ''} ${
          settings.zoom ? 'scale(1.1)' : ''
        }`,
        backgroundColor: settings.pageColor,
        color: settings.textColor,
      }}
    >
      {text}
    </div>
  )
}

export default ReaderView
