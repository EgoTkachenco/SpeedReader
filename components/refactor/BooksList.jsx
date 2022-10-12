import Carousel from 'react-multi-carousel'

const BookList = ({ value, onChange, list }) => {
  const activeBookId = value?.id || null
  return (
    <Carousel
      className="book-list"
      showDots={true}
      autoPlay={false}
      customRightArrow={<ArrowRight />}
      customLeftArrow={<ArrowLeft />}
      responsive={{
        desktop: {
          breakpoint: { max: 3000, min: 0 },
          items: 3,
          slidesToSlide: 3,
        },
      }}
    >
      {list &&
        list.length > 0 &&
        list.map((book) => (
          <div
            key={book.id}
            className={`book-slide ${book.id === activeBookId ? 'active' : ''}`}
            onClick={() => onChange(book)}
          >
            {book.picture ? (
              <img
                className="book-slide__pic"
                src={process.env.NEXT_PUBLIC_SERVER_URL + book.picture.url}
                alt={book.name}
              />
            ) : (
              <div className="book-slide__pic">{book.name.slice(0, 2)}</div>
            )}
            <div className="book-slide-content">
              <div className="book-slide__title" title={book.name}>
                {book.name}
              </div>
              <div className="book-slide__author">{book.author}</div>
            </div>
          </div>
        ))}
    </Carousel>
  )
}

export default BookList

const ArrowLeft = ({ onClick, ...rest }) => (
  <svg
    onClick={() => onClick()}
    {...rest}
    className="book-list-arrow left"
    viewBox="0 0 69 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0.146447 3.64645C-0.0488155 3.84171 -0.0488155 4.15829 0.146447 4.35355L3.32843 7.53553C3.52369 7.7308 3.84027 7.7308 4.03553 7.53553C4.2308 7.34027 4.2308 7.02369 4.03553 6.82843L1.20711 4L4.03553 1.17157C4.2308 0.976311 4.2308 0.659728 4.03553 0.464466C3.84027 0.269204 3.52369 0.269204 3.32843 0.464466L0.146447 3.64645ZM0.5 4.5H68.5V3.5H0.5V4.5Z"
      fill="#2BA7DF"
    />
  </svg>
)
const ArrowRight = ({ onClick, ...rest }) => (
  <svg
    onClick={() => onClick()}
    {...rest}
    className="book-list-arrow right"
    viewBox="0 0 69 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M68.3536 3.64645C68.5488 3.84171 68.5488 4.15829 68.3536 4.35355L65.1716 7.53553C64.9763 7.7308 64.6597 7.7308 64.4645 7.53553C64.2692 7.34027 64.2692 7.02369 64.4645 6.82843L67.2929 4L64.4645 1.17157C64.2692 0.976311 64.2692 0.659728 64.4645 0.464466C64.6597 0.269204 64.9763 0.269204 65.1716 0.464466L68.3536 3.64645ZM68 4.5H0V3.5H68V4.5Z"
      fill="#2BA7DF"
    />
  </svg>
)
