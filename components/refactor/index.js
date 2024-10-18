import { useEffect } from 'react'
import _ from 'lodash'
import store from '../../store/reader/global'
import { observer } from 'mobx-react-lite'
import ReaderSettings from './ReaderSettings'
import Layout from '../layout/Layout'
import ReaderView from './ReaderView'

const TrainingPage = observer(() => {
  useEffect(() => {
    if (process.browser) store.settings.loadFromStorage()
    return () => {
      store.reader.clear()
    }
  }, [])

  if (!process.browser || store.books.length === 0) return ''

  const settings = store.settings.settings
  const reader = store.reader
  return (
    <Layout title="Training center">
      <div className="training">
        <ReaderSettings
          settings={settings}
          onReset={() => store.reset()}
          onChange={(key, val) =>
            store.settings.update(key, val, !store.presets.startTime)
          }
          exercises={store.presets.exercises}
          exercise={store.presets.exercise}
          onExerciseOpen={(exercise) => store.presets.setExercise(exercise)}
          isExerciseActive={store.presets.exerciseTimeout}
          book={settings.book}
          books={store.books}
        />
        <div className="training-right">
          {/* <BooksList
            value={settings.book}
            onChange={(value) =>
              store.settings.update(
                'book',
                value,
                !store.presets.exerciseTimeout
              )
            }
            list={store.books}
          /> */}
          {reader.isEnd ? (
            <BookEnd />
          ) : (
            <ReaderView
              settings={store.settings}
              text={reader.text}
              currentText={reader.current_text}
              currentPosition={reader.current_position}
              page={reader.page}
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
