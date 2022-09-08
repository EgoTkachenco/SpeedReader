import { useEffect } from 'react'
import store from '../../store/reader'
import { observer } from 'mobx-react-lite'

import SettingsForm from './SettingsForm'
import ReaderView from './ReaderView'
import _ from 'lodash'

const SpeedReader = observer(() => {
  useEffect(() => {
    if (process.browser) store.initSettings()
  }, [])

  const endAnimation = _.debounce(() => store.resetAnimation(), 50)

  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col-12 col-lg-4 custom-form">
          {store.inited && (
            <SettingsForm
              onReset={() => store.resetConfig()}
              settings={{ ...store.settings, books: store.books }}
              onChange={(key, value) => store.updateSettings(key, value)}
            />
          )}
        </div>
        <div className="col-12 col-lg-8 align-self-center py-5">
          {!store.settings.book ? (
            <NoBook />
          ) : store.isBookEnd ? (
            <BookEnd />
          ) : (
            <ReaderView
              settings={store.settings}
              text={store.current_text}
              pages={store.current_pages}
              onAnimationEnd={endAnimation}
              currentPosition={store.current_position}
              rowsPerLine={store.getRowsPerLine()}
            />
          )}
        </div>
      </div>
    </div>
  )
})

export default SpeedReader

const NoBook = () => <div className="no-book">Choose book to start</div>
const BookEnd = () => <div className="book-end">Book End</div>
