import SettingsForm from './SettingsForm'
import ReaderView from './ReaderView'
import { observer } from 'mobx-react-lite'
import store from '../store'

const SpeedReader = observer(() => {
  const { settings, books, current_text } = store

  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col-12 col-md-4 custom-form">
          <SettingsForm
            settings={{ ...settings, books }}
            onChange={(key, value) => store.updateSettings(key, value)}
          />
        </div>
        <div className="col-12 col-md-8 align-self-center">
          {current_text && (
            <ReaderView settings={settings} text={current_text} />
          )}
        </div>
      </div>
    </div>
  )
})

export default SpeedReader
