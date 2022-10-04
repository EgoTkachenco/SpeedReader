import BookReader from './readers/Book'
import ZoomReader from './readers/Zoom'
import RollingReader from './readers/Rolling'
import ScrollReader from './readers/Scroll_New'
import ScrambledReader from './readers/Scrambled'
import Button from '../common/Button'

const ReaderView = ({
  settings,
  text,
  pages,
  currentPosition,
  onAnimationEnd,
  rowsPerLine,
  page,
  maxPage,
  showAnimation,
  isFullScreen,
  onFullScreenChange,
  allText,
}) => {
  const renderReader = (key) => {
    switch (settings.type) {
      case 'zoom':
        return (
          <ZoomReader
            settings={settings}
            text={text}
            isFullScreen={isFullScreen}
            onFullScreenChange={onFullScreenChange}
          />
        )
      case 'scrambled':
        return (
          <ScrambledReader
            settings={settings}
            isFullScreen={isFullScreen}
            onFullScreenChange={onFullScreenChange}
          />
        )
      case 'rolling':
        return (
          <RollingReader
            settings={settings}
            text={text}
            isFullScreen={isFullScreen}
            onFullScreenChange={onFullScreenChange}
          />
        )
      case 'scroll':
        return (
          <ScrollReader
            text={allText}
            settings={settings}
            currentPosition={currentPosition}
            rowsPerLine={rowsPerLine}
            isFullScreen={isFullScreen}
            onFullScreenChange={onFullScreenChange}
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
            rowsPerLine={rowsPerLine}
            animationKey={key}
            page={page}
            maxPage={maxPage}
            showAnimation={showAnimation}
            isFullScreen={isFullScreen}
            onFullScreenChange={onFullScreenChange}
          />
        )
    }
  }

  const renderAllReaders = () => {
    const size = !isNaN(Number(settings.count)) ? Number(settings.count) : 1
    const className = size === 1 ? 'col-12' : 'col-6 small'

    return new Array(size).fill(null).map((_, i) => (
      <div className={className} key={i}>
        {renderReader(i)}
      </div>
    ))
  }

  return (
    <div className={`books-wrapper ${isFullScreen ? 'fullscreen' : ''}`}>
      {settings.count != 1 && isFullScreen && (
        <div className="fullscreen-close">
          <Button
            className=""
            variant="text"
            onClick={() => onFullScreenChange(false)}
          >
            <img className="book-bottom__arrow left" src="/arrow-left.svg" />
            Back
          </Button>
        </div>
      )}
      {renderAllReaders()}
    </div>
  )
}

export default ReaderView
