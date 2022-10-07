import BookReader from './readers/Book'
import ZoomReader from './readers/Zoom'
import RollingReader from './readers/Rolling'
import ScrollReader from './readers/Scroll_New'
import ScrambledReader from './readers/Scrambled'
import FullScreenButton from './FullScreenButton'
import MessageBox from './MessageBox'

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
  message,
  onClearMessage,
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

  const size = !isNaN(Number(settings.count)) ? Number(settings.count) : 1
  const isSmall = size > 1
  const wrapperClasses = `books-wrapper ${isFullScreen ? 'fullscreen' : ''}`

  return (
    <div className={wrapperClasses}>
      {isSmall && isFullScreen && (
        <FullScreenButton
          onChange={() => onFullScreenChange(false)}
          isFullScreen={isFullScreen}
        />
      )}
      {new Array(size).fill(null).map((_, i) => (
        <div key={i} className={isSmall ? 'col-6 small' : 'col-12'}>
          {renderReader(i)}
        </div>
      ))}

      <MessageBox
        message={message}
        messageClearTimeout={2000}
        onMessageClear={onClearMessage}
      />
    </div>
  )
}

export default ReaderView
