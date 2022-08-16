import BookReader from './readers/Book'
import ZoomReader from './readers/Zoom'
import RollingReader from './readers/Rolling'
import ScrollReader from './readers/Scroll'

const ReaderView = ({
  settings,
  text,
  pages,
  currentPosition,
  onAnimationEnd,
}) => {
  switch (settings.type) {
    case 'zoom':
      return <ZoomReader settings={settings} text={text} />
    case 'rolling':
      return <RollingReader settings={settings} text={text} />
    case 'scroll':
      return (
        <ScrollReader
          pages={pages}
          settings={settings}
          currentPosition={currentPosition}
          onAnimationEnd={onAnimationEnd}
        />
      )
    case 'book':
    default:
      return (
        <BookReader
          pages={pages}
          settings={settings}
          currentPosition={currentPosition}
          onAnimationEnd={onAnimationEnd}
        />
      )
  }
}

export default ReaderView
