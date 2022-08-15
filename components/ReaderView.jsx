import BookReader from './readers/Book'
import ZoomReader from './readers/Zoom'

const ReaderView = ({
  settings,
  text,
  pages,
  currentPosition,
  onAnimationEnd,
}) => {
  // Zoom mode
  if (settings.zoom) return <ZoomReader settings={settings} text={text} />

  // Book mode
  return (
    <BookReader
      pages={pages}
      settings={settings}
      currentPosition={currentPosition}
      onAnimationEnd={onAnimationEnd}
    />
  )
}

export default ReaderView
