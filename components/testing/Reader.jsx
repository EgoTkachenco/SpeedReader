import { observer } from 'mobx-react-lite'

import ReaderView from '../training/ReaderView'
import _ from 'lodash'

const SpeedReader = observer(({ store }) => {
  const endAnimation = _.debounce(() => store.resetAnimation(), 50)
  if (!store.settings.book) return <NoBook />
  if (store.isBookEnd) return <BookEnd />
  return (
    <ReaderView
      settings={store.settings}
      text={store.current_text}
      pages={store.current_pages}
      showAnimation={store.show_animation}
      onAnimationEnd={endAnimation}
      currentPosition={store.current_position}
      rowsPerLine={store.getRowsPerLine()}
      allText={store.all_text}
      page={store.page}
      maxPage={store.maxPage}
      isFullScreen={store.isFullScreen}
      onFullScreenChange={(val) => store.changeFullScreen(val)}
    />
  )
})

export default SpeedReader

const NoBook = () => <div className="no-book">Choose book to start</div>
const BookEnd = () => <div className="book-end">Book End</div>
