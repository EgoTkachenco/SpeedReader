import store from '../../store/reader'
import { observer } from 'mobx-react-lite'

const BookList = observer(() => {
  const books = store.books
  return (
    <div className="book-list">
      {books.map((book) => (
        <div
          key={book.id}
          className="book-slide"
          onClick={() => {
            debugger
            store.updateSettings('book', book.id)
          }}
        >
          {book.image ? (
            <img className="book-slide__pic" src="/book.png" alt="" />
          ) : (
            <div className="book-slide__pic">{book.name.slice(0, 2)}</div>
          )}
          <div className="book-slide-content">
            <div className="book-slide__title">{book.name}</div>
            <div className="book-slide__author">{book.author}</div>
          </div>
        </div>
      ))}
    </div>
  )
})

export default BookList
