import { useState } from 'react'
import { Button, Modal } from '../common'

const TABLE_SIZE = 8

const BookListModal = ({ value, onChange, books, settings }) => {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)

  const start = TABLE_SIZE * page
  const maxPage = Math.ceil(books.length / TABLE_SIZE)
  const filteredBooks = books
    .slice(start, start + TABLE_SIZE)
    .map((b, i) => ({ ...b, position: i + 1 }))

  const changePage = (direction = true) => {
    if (direction) {
      if (page < maxPage - 1) setPage(page + 1)
    } else {
      if (page > 0) setPage(page - 1)
    }
  }
  const onSubmit = (book) => {
    onChange(book)
    setOpen(false)
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Choose books</Button>

      <Modal show={open} onClose={() => setOpen(false)}>
        <div className="books-modal__title">Books</div>

        <div className="books-modal-content">
          <table className="books-modal__table">
            <tr className="head">
              <th></th>
              <th>Name Books</th>
              <th>Author of books</th>
              <th>Number of pages</th>
              <th>Number of words</th>
              <th></th>
            </tr>
            {filteredBooks.map((book, i) => (
              <tr key={i}>
                <td>{book.position}.</td>
                <td>{book.name}</td>
                <td>{book.author || '---'}</td>
                <td>
                  {Math.floor(book.size / settings.fontType.page) || '---'}{' '}
                  pages
                </td>
                <td>{book.words || '---'} words</td>
                <td>
                  <Button
                    variant="light-primary"
                    onClick={() => onSubmit(book)}
                  >
                    Reading
                  </Button>
                </td>
              </tr>
            ))}
          </table>
        </div>
        <div className="books-modal__pagination">
          <img
            onClick={() => changePage(false)}
            className="books-modal__pagination__arrow left"
            src="/arrow-left.svg"
          />
          <div className="books-modal__pagination__pages">
            {page + 1}/{maxPage}
          </div>
          <img
            onClick={() => changePage(true)}
            className="books-modal__pagination__arrow right"
            src="/arrow-right.svg"
          />
        </div>
      </Modal>
    </>
  )
}

export default BookListModal
