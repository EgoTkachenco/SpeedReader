import Settings from './Settings'
import ReaderView from '../refactor/ReaderView'
import { observer } from 'mobx-react-lite'
const ScrollTest = observer(({ store }) => {
  const reader = store.reader
  return (
    <div className="training">
      <Settings
        settings={store.settings.settings}
        onChange={(key, value) => store.settings.update(key, value)}
      />
      <div className="training-right">
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
        />
      </div>
    </div>
  )
})

export default ScrollTest
