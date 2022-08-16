import { useEffect } from 'react'
import store from '../store'
import { observer } from 'mobx-react-lite'

import SettingsForm from './SettingsForm'
import ReaderView from './ReaderView'

const SpeedReader = observer(() => {
  useEffect(() => {
    if (process.browser) store.initSettings()
  }, [])

  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col-12 col-lg-4 custom-form">
          {store.inited && (
            <SettingsForm
              settings={{ ...store.settings, books: store.books }}
              onChange={(key, value) => store.updateSettings(key, value)}
            />
          )}
        </div>
        <div className="col-12 col-lg-8 align-self-center py-5">
          {store.isBookEnd ? (
            'This is the end'
          ) : (
            <ReaderView
              settings={store.settings}
              text={store.current_text}
              pages={store.current_pages}
              onAnimationEnd={() => store.nextPosition()}
              currentPosition={store.current_position}
            />
          )}
        </div>
      </div>
    </div>
  )
})

export default SpeedReader
