import Image from 'next/image'
import { useState, useEffect } from 'react'
const ANIMATION_DURATION = 600

export default function Book({
  settings,
  text,
  currentPosition,
  page,
  changePage,
  maxPage,
  rowsPerLine,
  animationKey,
  speed,
  onAnimationStart,
  onAnimationEnd,
}) {
  const [state, setState] = useState([[], [], [], []])
  const [pageAnimation, setPageAnimation] = useState(false)
  const [isOddAnimation, setIsOddAnimation] = useState(false)
  const highlightType = settings.highlightTypeS ? 'S' : 'V'

  const turnPage = () => {
    onAnimationStart()
    setPageAnimation(true)
    const new_pages = getNewPages(state[1][state[1].length - 1].position)
    setState((state) => [...state.slice(0, 2), ...new_pages])

    setTimeout(() => {
      setState((state) => [...state.slice(2, 4), [], []])
      setPageAnimation(false)
      setTimeout(() => onAnimationEnd(), 100)
    }, ANIMATION_DURATION)
  }
  useEffect(() => {
    // first load
    if (state[0].length === 0) {
      const new_pages = getNewPages(currentPosition - 1 || 0)
      setState([...new_pages, [], []])
      return
    }
    const last_position = state[1][state[1].length - 1].position
    if (last_position < currentPosition && !pageAnimation) turnPage()
    return
  }, [currentPosition])

  useEffect(() => {
    setIsOddAnimation(!isOddAnimation)
  }, [currentPosition])

  useEffect(() => {
    if (settings.book) {
      const new_pages = getNewPages(0)
      setState([...new_pages, [], []])
    } else {
      setState([[], [], [], []])
    }
  }, [settings.book])

  useEffect(() => {
    setState([[], [], [], []])
  }, [settings.fontType])

  const getNewPages = (lastPosition) => {
    const result = [[], []]
    const page_size = settings.fontType.page
    const start = page_size * (isOddAnimation ? page - 2 : page - 1 || 0)
    for (let i = 0; i < text.length; i++) {
      const line = text[i]
      if (line.position <= start) continue

      if (result[0].length < page_size) {
        result[0].push(line)
      } else if (result[1].length < page_size) {
        result[1].push(line)
      } else {
        break
      }
    }
    return result
  }

  const getPage = (page, key) => {
    if (page.length === 0) return

    return page.map((line, i) => (
      <Row
        key={key + '-' + line.position}
        isRead={line.position <= currentPosition}
        background={settings.highlightColor}
        color={settings.textColor}
        transition={speed}
        isOdd={isOddAnimation}
        // isOdd={Math.floor(i / rowsPerLine) % 2 === 0}
        fontType={settings.fontType}
        isTransition={rowsPerLine === 1 || highlightType !== 'V'}
      >
        {line.text}
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
      <div className="book-inner">
        <label
          htmlFor={page1Name}
          className="book__page book__page--1"
          style={{ background: settings.pageColor }}
        >
          <div className="page__content">
            <div className="page__content-text">{getPage(state[0], 0)}</div>
          </div>
        </label>

        <label
          htmlFor={page2Name}
          className="book__page book__page--4"
          style={{ background: settings.pageColor }}
        >
          <div className="page__content">
            <div className="page__content-text">{getPage(state[3], 3)}</div>
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
              <div className="page__content-text">{getPage(state[1], 1)}</div>
            </div>
          </div>
          <div className="book__page-back">
            <div className="page__content">
              <div className="page__content-text">{getPage(state[2], 2)}</div>
            </div>
          </div>
        </label>
      </div>

      <div className="book-bottom">
        <Image
          width={69}
          height={20}
          className="book-bottom__arrow left"
          src="/arrow-left.svg"
          alt="arrow left"
          onClick={() => changePage(false)}
        />
        <div className="book-bottom__pages">
          {page}/{maxPage}
        </div>
        <Image
          className="book-bottom__arrow right"
          src="/arrow-right.svg"
          alt="arrow right"
          width={69}
          height={20}
          onClick={() => changePage(true)}
        />
      </div>
    </BookWrapper>
  )
}

const Row = ({
  children,
  isRead,
  background,
  color,
  transition,
  isOdd,
  fontType,
  isTransition,
}) => {
  return (
    <div
      className={`book-row ${isRead ? 'active' : ''} ${isOdd ? 'odd' : ''}`}
      style={{
        color: color,
      }}
    >
      <div
        className="row-back"
        style={{
          background:
            isRead && children.trim().length ? background : 'transparent',
          transition: `all ${isTransition ? transition : 0}ms`,
        }}
      />
      <pre>{children}</pre>
    </div>
  )
}

const BookWrapper = ({ children, rotate, type, fontType }) => {
  return (
    <div
      className={`wrapper ${type} ${rotate ? 'rotate' : ''} ${fontType.key}`}
      style={{
        fontSize: fontType.fontSize,
      }}
    >
      <style>
        {`.book-row {
					min-height: ${fontType.fontSize};
				}
				.page__content {
					min-height: calc((${fontType.fontSize} + 0.25rem) * ${fontType.page});
				}`}
      </style>
      <div className="book">{children}</div>
    </div>
  )
}
