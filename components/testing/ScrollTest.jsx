import Settings from './Settings'
import Reader from './Reader'

const ScrollTest = ({ store }) => {
  return (
    <div className="training">
      <Settings
        settings={store.settings}
        onChange={(key, value) => store.updateSettings(key, value)}
      />
      <div className="training-right">
        <Reader store={store} />
      </div>
    </div>
  )
}

export default ScrollTest
