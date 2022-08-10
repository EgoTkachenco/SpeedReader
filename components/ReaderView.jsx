import { observer } from 'mobx-react-lite'
import store from '../store'

const PAGE_SIZE = 200

const ReaderView = observer(() => {
  if (store.isBookEnd) return <div id="reader-view">This is the end</div>

  // Zoom mode
  if (store.settings.zoom)
    return (
      <div
        id="reader-view"
        className="zoom-reader"
        style={{
          transform: `${store.settings.rotate ? 'rotate(180deg)' : ''}`,
          backgroundColor: store.settings.pageColor,
          color: store.settings.textColor,
        }}
      >
        {store.current_text}
      </div>
    )
  // default mode
  // Split current text to pages
  const pages = store.bookText.reduce(
    (acc, text) => {
      if (acc[acc.length - 1].length < PAGE_SIZE) {
        acc[acc.length - 1].push(text)
      } else {
        acc.push([text])
      }
      return acc
    },
    [[]]
  )

  // .slice(0, 4)

  // Get 2 current pages
  const current_pages = pages.reduce((acc, page, i, pages) => {
    if (acc) return acc
    const isCurrentPage = page.find(
      (text) => text.position === store.current_position
    )
    if (isCurrentPage)
      return i % 2 === 0 ? [pages[i], pages[i + 1]] : [pages[i - 1], pages[i]]

    return false
  }, false)
  return (
    <div id="reader-view" className="book-reader">
      {current_pages
        ? current_pages.map((page, i) => (
            <div
              className="book-reader-page"
              style={{
                transform: `${store.settings.rotate ? 'rotate(180deg)' : ''}`,
                backgroundColor: store.settings.pageColor,
                color: store.settings.textColor,
              }}
              key={i}
            >
              {page &&
                page.map((word) => (
                  <span
                    key={word.position}
                    style={{
                      backgroundColor:
                        store.current_position > word.position
                          ? store.settings.highlightColor
                          : store.settings.pageColor,
                    }}
                  >
                    {word.text}{' '}
                  </span>
                ))}
            </div>
          ))
        : 'Choose book'}
    </div>
  )
})

export default ReaderView
