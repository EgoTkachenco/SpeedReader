import store from '../../store/reader'
import { observer } from 'mobx-react-lite'

import ReaderView from './ReaderView'
import _ from 'lodash'

const SpeedReader = observer(() => {
  const endAnimation = _.debounce(() => store.resetAnimation(), 50)
  if (!store.settings.book) return <NoBook />
  if (store.isBookEnd) return <BookEnd />
  return (
    <ReaderView
      settings={store.settings}
      text={store.current_text}
      pages={store.current_pages}
      onAnimationEnd={endAnimation}
      currentPosition={store.current_position}
      rowsPerLine={store.getRowsPerLine()}
    />
  )
})

export default SpeedReader

const NoBook = () => <div className="no-book">Choose book to start</div>
const BookEnd = () => <div className="book-end">Book End</div>