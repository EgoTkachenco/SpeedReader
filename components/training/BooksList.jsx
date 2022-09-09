import store from '../../store/reader'
import { observer } from 'mobx-react-lite'
import Carousel from 'react-multi-carousel'

const BookList = observer(() => {
  const books = store.books
  return (
    <Carousel
      className="book-list"
      showDots={true}
      removeArrowOnDeviceType={['desktop']}
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 0 },
          items: 3,
          slidesToSlide: 3,
        },
      }}
    >
      {books.map((book) => (
        <div
          key={book.id}
          className="book-slide"
          onClick={() => {
            store.updateSettings('book', book.id)
          }}
        >
          {book.picture ? (
            <img
              className="book-slide__pic"
              src={process.env.NEXT_PUBLIC_SERVER_URL + book.picture.url}
              alt=""
            />
          ) : (
            <div className="book-slide__pic">{book.name.slice(0, 2)}</div>
          )}
          <div className="book-slide-content">
            <div className="book-slide__title">{book.name}</div>
            <div className="book-slide__author">{book.author}</div>
          </div>
        </div>
      ))}
    </Carousel>
  )
})

export default BookList
