import { useCallback, useState } from 'react'
import BookReader from './readers/Book'
import ZoomReader from './readers/Zoom'
import RollingReader from './readers/Rolling'
import ScrollReader from './readers/Scroll'
// import ScrambledReader from './readers/Scrambled'
import FullScreenButton from './FullScreenButton'
import MessageBox from './MessageBox'
import ExerciseHelper from './ExerciseHelper'
import ExerciseProgress from './ExerciseProgress'

const ReaderView = ({
  settings,
  text,
  currentText,
  currentPosition,
  rowsPerLine,
  page,
  changePage,
  maxPage,
  play,
  pause,
  message,
  onMessageClose,
  exercise,
  isExerciseActive,
  onExercisePlay,
  onExercisePause,
  startTime,
  exercise_duration,
}) => {
  const renderReader = useCallback(
    (key) => {
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
              changePage={changePage}
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
    },
    [
      settings.settings,
      settings.speed,
      currentText,
      currentPosition,
      text,
      page,
      changePage,
      maxPage,
      rowsPerLine,
      pause,
      play,
    ]
  )

  const size = !isNaN(Number(settings.settings.count))
    ? Number(settings.settings.count)
    : 1
  const isSmall = size > 1
  const wrapperClasses = `books-wrapper ${
    settings.settings.fullscreen ? 'fullscreen' : ''
  } ${size === 4 ? 'items-4' : ''}`

  return (
    <div className={wrapperClasses}>
      <FullScreenButton
        onChange={() =>
          settings.update('fullscreen', !settings.settings.fullscreen, false)
        }
        isFullScreen={settings.settings.fullscreen}
      />
      {new Array(size).fill(null).map((_, i) => (
        <div key={i} className={isSmall ? 'col-6 small' : 'col-12'}>
          {renderReader(i)}
        </div>
      ))}

      {exercise && (
        <ExerciseProgress
          exercise={exercise}
          isPlay={isExerciseActive}
          onPlay={(duration) => onExercisePlay(duration)}
          onPause={() => onExercisePause()}
          startTime={startTime}
          duration={exercise_duration}
        />
      )}

      {exercise && (
        <ExerciseHelper
          exercise={exercise}
          isExerciseActive={isExerciseActive}
        />
      )}

      <MessageBox message={message} onClose={onMessageClose} />
    </div>
  )
}

export default ReaderView
