import { useCallback, useEffect, useMemo, useState } from 'react'
import BookReader from './readers/Book'
import ZoomReader from './readers/Zoom'
import RollingReader from './readers/Rolling'
import ScrollReader from './readers/Scroll'
// import ScrambledReader from './readers/Scrambled'
import FullScreenButton from './FullScreenButton'
import MessageBox from './MessageBox'
import ExerciseHelper from './ExerciseHelper'
import ExerciseProgress from './ExerciseProgress'
import ReaderModeFinish from './ReaderModeFinish'
import { Store as GlobalStore } from '../../store/reader/global'
import BookListModal from './BookListModal'
import { observer } from 'mobx-react-lite'
import { ReaderStore } from '../../store/reader/reader'
import { reaction } from 'mobx'

const ReaderView = ({
  reader,
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
  showReaderStats,
  user,
  books,
}) => {
  // const renderReader = (key, store) => {
  //   const currentTextValue = store ? store.reader.currentText : currentText
  //   const textValue = store ? store.reader.text : text
  //   const currentPositionValue = store
  //     ? store.reader.currentPosition
  //     : currentPosition
  //   const pageValue = store ? store.reader.page : page
  //   const changePageValue = store ? store.reader.changePage : changePage
  //   const maxPageValue = store ? store.reader.last_page : maxPage
  //   const pauseValue = store
  //     ? () => {
  //         debugger
  //         store.reader.pause()
  //       }
  //     : pause
  //   const playValue = store
  //     ? () => {
  //         debugger
  //         store.reader.play()
  //       }
  //     : play

  //   const isBookChosen = store ? store.settings.settings.book : true

  //   if (!isBookChosen) {
  //     return (
  //       <div>
  //         <BookListModal
  //           books={books}
  //           settings={settings.settings}
  //           onChange={(book) => {
  //             store.settings.update('book', book, false)
  //             debugger
  //             store.reader.start()
  //           }}
  //         />
  //       </div>
  //     )
  //   }

  //   switch (settings.settings.type) {
  //     // switch ('scroll') {
  //     case 'zoom':
  //       return (
  //         <ZoomReader
  //           settings={settings.settings}
  //           text={currentTextValue}
  //           speed={settings.speed}
  //         />
  //       )
  //     // case 'scrambled':
  //     //   return (
  //     //     <ScrambledReader
  //     //       settings={settings}
  //     //       isFullScreen={isFullScreen}
  //     //       onFullScreenChange={onFullScreenChange}
  //     //     />
  //     // 	)
  //     case 'rolling':
  //       return (
  //         <RollingReader
  //           settings={settings.settings}
  //           text={currentTextValue}
  //           speed={settings.speed}
  //         />
  //       )
  //     case 'scroll':
  //       return (
  //         <ScrollReader
  //           settings={settings.settings}
  //           currentPosition={currentPositionValue}
  //           text={textValue}
  //           speed={settings.speed}
  //         />
  //       )
  //     case 'book':
  //       return (
  //         <BookReader
  //           settings={settings.settings}
  //           text={textValue}
  //           currentPosition={currentPositionValue}
  //           page={pageValue}
  //           changePage={changePageValue}
  //           maxPage={maxPageValue}
  //           speed={settings.speed}
  //           rowsPerLine={rowsPerLine}
  //           animationKey={key}
  //           onAnimationStart={pauseValue}
  //           onAnimationEnd={playValue}
  //         />
  //       )
  //     default:
  //       return '---'
  //   }
  // }

  const booksCount = useMemo(
    () =>
      !isNaN(Number(settings.settings.count))
        ? Number(settings.settings.count) || 1
        : 1,
    [settings.settings.count]
  )
  const [additionalReaders, setAdditionalReaders] = useState([])
  useEffect(() => {
    if (booksCount > 1) {
      setAdditionalReaders(
        new Array(booksCount - 1).fill(null).map((_, i) => {
          const reader = new ReaderStore(new GlobalStore(false))
          reaction(
            () => reader.parent.settings.settings.fontType || '',
            (fontType, prev_fontType) => {
              const isChanged = fontType?.key !== prev_fontType?.key
              if (!isChanged) return

              if (fontType) {
                console.log('reaction font')
                reader.clearText()
                if (reader.current_position !== -1) {
                  reader.loadText(true)
                }
              }
            }
          )
          const Component = observer(({ reader }) => {
            return (
              <div
                key={i + 1}
                className={booksCount > 1 ? 'col-6 small' : 'col-12'}
              >
                <RenderReader
                  key={i + 1}
                  order={i + 1}
                  text={reader.text}
                  currentText={reader.current_text}
                  currentPosition={reader.current_position}
                  page={reader.page}
                  changePage={() => reader.changePage()}
                  maxPage={reader.last_page}
                  pause={() => reader.stop()}
                  play={() => reader.play()}
                  settings={settings.settings}
                  rowsPerLine={rowsPerLine}
                  books={books}
                  onBookChange={(book) => {
                    reader.parent.settings.update('book', book, false)
                    reader.start()
                  }}
                  isBookChosen={reader?.parent?.settings.settings.book}
                />
              </div>
            )
          })
          return { component: <Component reader={reader} />, reader }
        })
      )
    } else {
      setAdditionalReaders([])
    }
  }, [booksCount])

  useEffect(() => {
    updateAdditionalReadersSettings()
  }, [settings.settings, additionalReaders])

  const updateAdditionalReadersSettings = useCallback(() => {
    const exceptions_keys = ['book', 'fullscreen']
    for (const key in settings.settings) {
      if (exceptions_keys.includes(key)) continue
      for (const store of additionalReaders) {
        store.reader.parent.settings.update(key, settings.settings[key], false)
      }
    }
  }, [additionalReaders])

  // const isBookChosen = !!settings.settings.book
  // if (!isBookChosen) return null

  return (
    <div
      className={`books-wrapper ${
        settings.settings.fullscreen ? 'fullscreen' : ''
      } items-${booksCount}`}
    >
      <FullScreenButton
        onChange={() =>
          settings.update('fullscreen', !settings.settings.fullscreen, false)
        }
        isFullScreen={settings.settings.fullscreen}
      />
      {/* MAIN READER */}
      <div
        // className="col-12"
        className={booksCount > 1 ? 'col-6 small' : 'col-12'}
      >
        <RenderReader
          key={0}
          order={0}
          text={text}
          currentText={currentText}
          currentPosition={currentPosition}
          page={page}
          changePage={changePage}
          maxPage={maxPage}
          pause={pause}
          play={play}
          settings={settings.settings}
          rowsPerLine={rowsPerLine}
        />
      </div>

      {additionalReaders.map(({ component }) => component)}

      {showReaderStats && (
        <ReaderModeFinish
          reader={reader}
          settings={settings.settings}
          user={user}
        />
      )}

      {exercise && (
        <ExerciseProgress
          exercise={exercise}
          isPlay={!!isExerciseActive}
          onPlay={(duration) => onExercisePlay(duration)}
          onPause={() => onExercisePause()}
          startTime={startTime}
          duration={exercise_duration}
        />
      )}

      {exercise && (
        <ExerciseHelper
          exercise={exercise}
          isExerciseActive={!!isExerciseActive}
          startTime={startTime}
          duration={exercise_duration}
        />
      )}

      <MessageBox message={message} onClose={onMessageClose} />
    </div>
  )
}

export default ReaderView

const RenderReader = observer(
  ({
    order,
    currentText,
    text,
    currentPosition,
    page,
    changePage,
    maxPage,
    pause,
    play,
    books,
    settings,
    rowsPerLine,
    isBookChosen = true,
    onBookChange = () => {},
  }) => {
    // const currentTextValue = store ? store.reader.currentText : currentText
    // const textValue = store ? store.reader.text : text
    // const currentPositionValue = store
    //   ? store.reader.currentPosition
    //   : currentPosition
    // const pageValue = store ? store.reader.page : page
    // const changePageValue = store ? store.reader.changePage : changePage
    // const maxPageValue = store ? store.reader.last_page : maxPage
    // const pauseValue = store ? store.reader.pause : pause
    // const playValue = store ? store.reader.play : play

    // const isBookChosen = store ? store.settings.settings.book : true
    const key = order

    if (!isBookChosen) {
      return (
        <div>
          <BookListModal
            books={books}
            settings={settings}
            onChange={onBookChange}
          />
        </div>
      )
    }

    switch (settings.type) {
      // switch ('scroll') {
      case 'zoom':
        return (
          <ZoomReader
            settings={settings}
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
            settings={settings}
            text={currentText}
            speed={settings.speed}
          />
        )
      case 'scroll':
        return (
          <ScrollReader
            settings={settings}
            currentPosition={currentPosition}
            text={text}
            speed={settings.speed}
          />
        )
      case 'book':
        return (
          <BookReader
            settings={settings}
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
  }
)
