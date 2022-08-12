import { useState, useEffect } from 'react'

const ANIMATION_DURATION = 900

export default function BookReader({
  pages,
  settings,
  currentPosition,
  oldPages,
}) {
  const [pageAnimation, setPageAnimation] = useState(false)
  useEffect(() => {
    if (!pages || currentPosition === 0) return
    setPageAnimation(true)
    setTimeout(() => {
      setPageAnimation(false)
    }, ANIMATION_DURATION)
  }, [pages])

  if (!pages) return null

  const getPage = (page) =>
    page
      ? page.map((row, i) => (
          <div key={i}>
            {row.map((word, j) => (
              <span
                key={word.position}
                style={{
                  backgroundColor:
                    currentPosition > word.position
                      ? settings.highlightColor
                      : 'transparent',
                }}
              >
                {word.text}{' '}
              </span>
            ))}
          </div>
        ))
      : ''

  return (
    <div className="cover">
      <div className="book">
        <label htmlFor="page-1" className="book__page book__page--1">
          <div className="page__content">
            <div className="page__content-text">
              {getPage(pageAnimation ? oldPages[0] : pages[0])}
            </div>
            {/* <div className="page__number">1</div> */}
          </div>
        </label>

        <label htmlFor="page-2" className="book__page book__page--4">
          <div className="page__content">
            <div className="page__content-text">
              {pageAnimation && getPage(pages[1])}
            </div>
            {/* <div className="page__number">4</div> */}
          </div>
        </label>

        <input
          type="radio"
          name="page"
          id="page-1"
          checked={!pageAnimation}
          readOnly
        />

        <input
          type="radio"
          name="page"
          id="page-2"
          checked={pageAnimation}
          readOnly
        />

        <label className="book__page book__page--2">
          <div className="book__page-front">
            <div className="page__content">
              <div className="page__content-text">
                {getPage(pageAnimation ? oldPages[1] : pages[1])}
              </div>
            </div>
            {/* <div className="page__number">2</div> */}
          </div>
          <div className="book__page-back">
            <div className="page__content">
              <div className="page__content-text">
                {pageAnimation && getPage(pages[0])}
              </div>
              {/* <div className="page__number">3</div> */}
            </div>
          </div>
        </label>
      </div>
    </div>
  )
}
