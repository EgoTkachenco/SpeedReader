export default function Zoom({ settings, text }) {
  return (
    <div
      id="reader-view"
      className="zoom-reader"
      style={{
        transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
        backgroundColor: settings.pageColor,
        color: settings.textColor,
      }}
    >
      {text}
    </div>
  )
}
