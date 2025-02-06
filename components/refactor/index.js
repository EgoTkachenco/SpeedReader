import { useEffect } from 'react'
import _ from 'lodash'
import store from '../../store/reader/global'
import { observer } from 'mobx-react-lite'
import ReaderSettings from './ReaderSettings'
import Layout from '../layout/Layout'
import ReaderView from './ReaderView'
import ReaderModeStatistics from './ReaderModeStatistics'
import AuthStore from '../../store'

const TrainingPage = observer(() => {
  useEffect(() => {
    if (process.browser && store.settings.settings.book) store.reader.start()

    return () => {
      store.reader.clear()
    }
  }, [])

  if (!process.browser || store.books.length === 0) return ''

  const settings = store.settings.settings
  const reader = store.reader

  const showReaderStatistics = reader.mode === 'reader-statistics'

  if (showReaderStatistics) {
    return (
      <Layout title="Reader Statistics">
        <ReaderModeStatistics reader={reader} user={AuthStore.user?.id} />
      </Layout>
    )
  }
  return (
    <Layout title="Training center">
      <div className="training">
        <ReaderSettings
          settings={settings}
          onReset={() => store.reset()}
          onChange={(key, val, bool = undefined) =>
            store.settings.update(
              key,
              val,
              bool !== undefined ? bool : !store.presets.startTime
            )
          }
          exercises={store.presets.exercises}
          exercise={store.presets.exercise}
          onExerciseOpen={(exercise) => store.presets.setExercise(exercise)}
          isExerciseActive={store.presets.exerciseTimeout}
          book={settings.book}
          books={store.books}
          reader={reader}
          onReaderReset={() => reader.resetReaderSettings()}
        />
        <div className="training-right">
          {reader.isEnd ? (
            <BookEnd />
          ) : (
            <ReaderView
              books={store.books}
              reader={reader}
              settings={store.settings}
              text={reader.text}
              currentText={reader.current_text}
              currentPosition={reader.current_position}
              page={reader.page}
              changePage={(direction) => reader.changePage(direction)}
              maxPage={reader.last_page}
              rowsPerLine={reader.active_lines_count}
              play={() => reader.play()}
              pause={() => reader.stop()}
              message={store.message}
              onMessageClose={() => store.clearMessage()}
              exercise={store.presets.exercise}
              isExerciseActive={store.presets.exerciseTimeout}
              onExercisePlay={(duration) => store.presets.play(duration)}
              onExercisePause={() => store.presets.pause()}
              startTime={store.presets.startTime}
              exercise_duration={store.presets.exercise_duration}
              isActive={!!store.reader.timeout}
              showReaderStats={
                reader.mode === 'reader' &&
                reader.reader_session_statistic_timeout === null &&
                reader.current_position !== -1
              }
              user={AuthStore.user?.id}
            />
          )}
        </div>
      </div>
    </Layout>
  )
})

export default TrainingPage

const NoBook = () => <div className="no-book">Choose book to start</div>
const BookEnd = () => <div className="book-end">Book End</div>
