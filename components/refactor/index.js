import { useEffect } from 'react'
import _ from 'lodash'
import store from '../../store/reader/global'
import { observer } from 'mobx-react-lite'
import ReaderSettings from './ReaderSettings'
import Layout from '../layout/Layout'
import BooksList from './BooksList'
import ReaderView from './ReaderView'

const TrainingPage = observer(() => {
  useEffect(() => {
    if (process.browser) store.settings.loadFromStorage()
  }, [])
  useEffect(() => {
    return () => {
      store.reader.clear()
    }
  }, [])

  if (store.books.length === 0) return null

  const settings = store.settings.settings
  const reader = store.reader

  return (
    <Layout title="Training center">
      <div className="training">
        {store.presets.level_process}
        <ReaderSettings
          settings={settings}
          onReset={() => store.reset()}
          onChange={(key, val) =>
            store.settings.update(key, val, !store.presets.startTime)
          }
          presets={store.presets.presets}
          preset={store.presets.preset}
          exercise={store.presets.exercise}
          onPresetOpen={(preset) => store.presets.setPreset(preset)}
          onExerciseOpen={(exercise) => store.presets.setExercise(exercise)}
          startTime={store.presets.startTime}
          isExerciseActive={store.presets.exerciseTimeout}
          onExercisePlay={(duration) => store.presets.play(duration)}
          onExercisePause={() => store.presets.pause()}
          exercise_duration={store.presets.exercise_duration}
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
              exercise={store.presets.exercise}
              isExerciseActive={store.presets.exerciseTimeout}
              onExercisePlay={() => store.presets.play()}
              onExercisePause={() => store.presets.pause()}
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
