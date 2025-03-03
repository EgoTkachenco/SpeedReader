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
                  initialBook={
                    settings?.settings?.book?.id
                      ? settings?.settings?.book?.id + i + 1
                      : null
                  }
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
    const exceptions_keys = ['fullscreen', 'count']
    let i = 0
    for (const key in settings.settings) {
      if (exceptions_keys.includes(key)) continue
      for (const store of additionalReaders) {
        i++
        if (key === 'book') {
          store.reader.parent.settings.update(
            key,
            books.find((book) => book.id === settings.settings.book.id + 1), //next book
            false
          )
        } else
          store.reader.parent.settings.update(
            key,
            settings.settings[key],
            false
          )
      }
    }
  }, [additionalReaders])

  useEffect(() => {
    console.log('Book changed', settings.book)
  }, [settings.book])

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
    initialBook,
  }) => {
    const key = order
    useEffect(() => {
      if (initialBook) {
        onBookChange(books.find((book) => book.id === initialBook))
      }
    }, [initialBook])

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

    if (!settings.book) return null

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
