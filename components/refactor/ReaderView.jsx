import { useEffect, useRef } from 'react'
import BookReader from './readers/Book'
import ZoomReader from './readers/Zoom'
import RollingReader from './readers/Rolling'
import ScrollReader from './readers/Scroll'
// import ScrambledReader from './readers/Scrambled'
import FullScreenButton from './FullScreenButton'
import MessageBox from './MessageBox'

const ReaderView = ({
  settings,
  text,
  currentText,
  currentPosition,
  rowsPerLine,
  page,
  maxPage,
  play,
  pause,
  message,
  exercise,
  isExerciseActive,
}) => {
  const renderReader = (key) => {
    switch (settings.settings.type) {
      // switch ('scroll') {
      case 'zoom':
        return (
          <ZoomReader
            settings={settings.settings}
            text={currentText}
            speed={settings.speed}
          />
        )
      // case 'scrambled':
      //   return (
      //     <ScrambledReader
      //       settings={settings}
      //       isFullScreen={isFullScreen}
      //       onFullScreenChange={onFullScreenChange}
      //     />
      // 	)
      case 'rolling':
        return (
          <RollingReader
            settings={settings.settings}
            text={currentText}
            speed={settings.speed}
          />
        )
      case 'scroll':
        return (
          <ScrollReader
            settings={settings.settings}
            currentPosition={currentPosition}
            text={text}
            speed={settings.speed}
          />
        )
      case 'book':
        return (
          <BookReader
            settings={settings.settings}
            text={text}
            currentPosition={currentPosition}
            page={page}
            maxPage={maxPage}
            speed={settings.speed}
            rowsPerLine={rowsPerLine}
            animationKey={key}
            onAnimationStart={pause}
            onAnimationEnd={play}
          />
        )
      default:
        return '---'
    }
  }

  const size = !isNaN(Number(settings.settings.count))
    ? Number(settings.settings.count)
    : 1
  const isSmall = size > 1
  const wrapperClasses = `books-wrapper ${
    settings.settings.fullscreen ? 'fullscreen' : ''
  } ${size === 4 ? 'items-4' : ''}`
  const audioRef = useRef()
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2
      if (isExerciseActive && audioRef.current.paused) audioRef.current.play()
      else if (!isExerciseActive && !audioRef.current.paused)
        audioRef.current.pause()
    }

    return () => {
      if (audioRef.curren && !audioRef.current.pausedt) audioRef.current.pause()
    }
  }, [isExerciseActive])
  return (
    <div className={wrapperClasses}>
      <FullScreenButton
        onChange={() =>
          settings.update('fullscreen', !settings.settings.fullscreen)
        }
        isFullScreen={settings.settings.fullscreen}
      />
      {new Array(size).fill(null).map((_, i) => (
        <div key={i} className={isSmall ? 'col-6 small' : 'col-12'}>
          {renderReader(i)}
        </div>
      ))}

      {exercise && exercise.audio ? (
        <audio
          ref={audioRef}
          src={exercise.audio}
          style={{ opacity: 0, height: 0, width: 0 }}
          loop
        />
      ) : null}

      <MessageBox message={message} />
    </div>
  )
}

export default ReaderView
