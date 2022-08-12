import SettingsForm from './SettingsForm'
import ReaderView from './ReaderView'
import { observer } from 'mobx-react-lite'
import store from '../store'
import { useEffect } from 'react'

const SpeedReader = observer(() => {
  useEffect(() => {
    if (process.browser) store.initReader()
  }, [])
  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col-12 col-md-4 custom-form">
          {store.inited && (
            <SettingsForm
              settings={{ ...store.settings, books: store.books }}
              onChange={(key, value) => store.updateSettings(key, value)}
            />
          )}
        </div>
        <div className="col-12 col-md-8 align-self-center">
          {store.isBookEnd ? (
            <div id="reader-view">This is the end</div>
          ) : (
            <ReaderView
              settings={store.settings}
              text={store.current_text}
              pages={store.current_pages}
              oldPages={store.old_pages}
              currentPosition={store.current_position}
            />
          )}
        </div>
      </div>
    </div>
  )
})

export default SpeedReader
