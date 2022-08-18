import { useState, useEffect } from 'react'

const ANIMATION_DURATION = 600

export default function Book({
  pages,
  settings,
  rowsPerLine,
  currentPosition,
  onAnimationEnd,
  animationKey,
}) {
  const [current_pages, setCurrent_pages] = useState([])
  const [pageAnimation, setPageAnimation] = useState(false)
  const highlightType = settings.highlightTypeS ? 'S' : 'V'

  useEffect(() => {
    if (!pages.length) return

    if (currentPosition === 0) {
      setCurrent_pages(pages)
      return
    }
    setCurrent_pages([...current_pages, ...pages])
    setPageAnimation(true)
    setTimeout(() => {
      setPageAnimation(false)
      setCurrent_pages(pages)
      onAnimationEnd()
    }, ANIMATION_DURATION)
  }, [pages])

  if (!pages) return null

  const getPage = (page) => {
    if (!page) return
    return page.map((row, i) => (
      <Row
        key={i + row[row.length - 1].position}
        isRead={row[row.length - 1].position <= currentPosition}
        background={settings.highlightColor}
        transition={10000 / settings.speed}
        isOdd={Math.floor(i / rowsPerLine) % 2 === 0}
      >
        {row.map((word, j) => (
          <Word
            key={word.position}
            isRead={currentPosition >= word.position}
            background={settings.highlightColor || 'transparent'}
            color={settings.textColor || 'inherite'}
            text={word.text}
            addSpace={j !== row.length - 1}
            isTransition={rowsPerLine === 1 && highlightType !== 'S'}
          />
        ))}
      </Row>
    ))
  }

  const page1Name = 'page-1_' + animationKey
  const page2Name = 'page-2_' + animationKey

  return (
    <BookWrapper rotate={settings.rotate} type={highlightType}>
      <label
        htmlFor={page1Name}
        className="book__page book__page--1"
        style={{ background: settings.pageColor }}
      >
        <div className="page__content">
          <div className="page__content-text">{getPage(current_pages[0])}</div>
          {/* <div className="page__number">1</div> */}
        </div>
      </label>

      <label
        htmlFor={page2Name}
        className="book__page book__page--4"
        style={{ background: settings.pageColor }}
      >
        <div className="page__content">
          <div className="page__content-text">{getPage(current_pages[3])}</div>
          {/* <div className="page__number">4</div> */}
        </div>
      </label>

      <input
        type="radio"
        name={page1Name}
        id={page1Name}
        checked={!pageAnimation}
        readOnly
      />

      <input
        type="radio"
        name={page2Name}
        id={page2Name}
        checked={pageAnimation}
        readOnly
      />

      <label
        className="book__page book__page--2"
        style={{ background: settings.pageColor }}
      >
        <div className="book__page-front">
          <div className="page__content">
            <div className="page__content-text">
              {getPage(current_pages[1])}
            </div>
          </div>
          {/* <div className="page__number">2</div> */}
        </div>
        <div className="book__page-back">
          <div className="page__content">
            <div className="page__content-text">
              {getPage(current_pages[2])}
            </div>
            {/* <div className="page__number">3</div> */}
          </div>
        </div>
      </label>
    </BookWrapper>
  )
}

const Row = ({ children, isRead, background, transition, isOdd }) => {
  return (
    <div className={`book-row ${isRead ? 'active' : ''} ${isOdd ? 'odd' : ''}`}>
      {children}
      {/* {isOdd ? 'odd' : 'even'} */}
      <div
        className="row-back"
        style={{
          background: isRead ? background : 'transparent',
          transition: `width ${transition}ms`,
        }}
      />
    </div>
  )
}

const Word = ({ text, isRead, background, color, addSpace, isTransition }) => (
  <div className="book-word">
    <span
      className={`word-back ${isRead ? 'active' : ''}`}
      style={{ background, transition: isTransition ? 'height 0.3s' : 'unset' }}
    />
    <span className="word-text" style={{ color }}>
      {text}
      {addSpace ? ' ' : ''}{' '}
    </span>
  </div>
)

const BookWrapper = ({ children, rotate, type }) => {
  return (
    <div
      className={`wrapper ${type}`}
      style={{
        transform: `${rotate ? 'rotate(180deg)' : ''}`,
      }}
    >
      <div className="cover">
        <div className="pages">
          <div className="pages">
            <div className="pages">
              <div className="book">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
