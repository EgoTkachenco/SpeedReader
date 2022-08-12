import BookReader from './BookReader'

const ReaderView = ({
  settings,
  text,
  pages,
  currentPosition,
  onAnimationEnd,
}) => {
  // Zoom mode
  if (settings.zoom)
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
  return (
    <div id="reader-view" className="book-reader">
      <BookReader
        pages={pages}
        settings={settings}
        currentPosition={currentPosition}
        onAnimationEnd={onAnimationEnd}
      />
    </div>
  )
}

export default ReaderView
