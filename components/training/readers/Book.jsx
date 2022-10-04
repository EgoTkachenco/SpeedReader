import { useState, useEffect } from 'react'
import { Button } from '../../common'

import FullScreenButton from '../FullScreenButton'

const ANIMATION_DURATION = 600

export default function Book({
  pages,
  settings,
  rowsPerLine,
  currentPosition,
  onAnimationEnd,
  animationKey,
  page,
  maxPage,
  showAnimation,
  onFullScreenChange,
  isFullScreen,
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
    if (showAnimation) setPageAnimation(true)
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
        transition={1000 / settings.speed}
        isOdd={Math.floor(i / rowsPerLine) % 2 === 0}
        fontType={settings.fontType}
        isTransition={rowsPerLine === 1 || highlightType !== 'V'}
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
            // isTransition={rowsPerLine === 1}
          />
        ))}
      </Row>
    ))
  }

  const page1Name = 'page-1_' + animationKey
  const page2Name = 'page-2_' + animationKey

  return (
    <BookWrapper
      rotate={settings.rotate}
      type={highlightType}
      fontType={settings.fontType}
    >
      <FullScreenButton
        isFullScreen={isFullScreen}
        onChange={(value) => onFullScreenChange(value)}
      />

      <div className="book-inner">
        <label
          htmlFor={page1Name}
          className="book__page book__page--1"
          style={{ background: settings.pageColor }}
        >
          <div className="page__content">
            <div className="page__content-text">
              {getPage(current_pages[0])}
            </div>
          </div>
        </label>

        <label
          htmlFor={page2Name}
          className="book__page book__page--4"
          style={{ background: settings.pageColor }}
        >
          <div className="page__content">
            <div className="page__content-text">
              {getPage(current_pages[3])}
            </div>
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
          </div>
          <div className="book__page-back">
            <div className="page__content">
              <div className="page__content-text">
                {getPage(current_pages[2])}
              </div>
            </div>
          </div>
        </label>
      </div>

      <div className="book-bottom">
        <img className="book-bottom__arrow left" src="/arrow-left.svg" />
        <div className="book-bottom__pages">
          {page}/{maxPage}
        </div>
        <img className="book-bottom__arrow right" src="/arrow-right.svg" />
      </div>
    </BookWrapper>
  )
}

const Row = ({
  children,
  isRead,
  background,
  transition,
  isOdd,
  fontType,
  isTransition,
}) => {
  return (
    <div
      className={`book-row ${isRead ? 'active' : ''} ${isOdd ? 'odd' : ''}`}
      style={{ minHeight: `calc(${fontType.fontSize} * 0.8)` }}
    >
      {children}
      {/* {isOdd ? 'odd' : 'even'} */}
      <div
        className="row-back"
        style={{
          background: isRead ? background : 'transparent',
          transition: `all ${isTransition ? transition : 0}ms`,
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

const BookWrapper = ({ children, rotate, type, fontType }) => {
  return (
    <div
      className={`wrapper ${type} ${rotate ? 'rotate' : ''}`}
      style={{
        fontSize: fontType.fontSize,
        minHeight: `calc(${fontType.row} * ${fontType.fontSize})`,
      }}
    >
      <div className="book">{children}</div>
    </div>
  )
}
