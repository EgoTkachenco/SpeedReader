import SettingsForm from './SettingsForm'
import ReaderView from './ReaderView'
import { observer } from 'mobx-react-lite'
import store from '../store'

const SpeedReader = observer(() => {
  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col-12 col-md-4 custom-form">
          <SettingsForm
            settings={{ ...store.settings, books: store.books }}
            onChange={(key, value) => store.updateSettings(key, value)}
          />
        </div>
        <div className="col-12 col-md-8 align-self-center">
          <ReaderView
            settings={store.settings}
            allText={store.bookText}
            text={store.current_text}
            currentPosition={store.current_position}
          />
        </div>
      </div>
    </div>
  )
})

export default SpeedReader
