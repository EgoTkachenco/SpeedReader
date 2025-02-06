import Image from 'next/image'
import { useState, useEffect, useMemo, useCallback } from 'react'
const ANIMATION_DURATION = 600

export default function Book({
  settings,
  text = [],
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
  const [prevPage, setPrevPage] = useState(0)
  const [pageAnimation, setPageAnimation] = useState(0)
  const highlightType = settings.highlightTypeS ? 'S' : 'V'
  const [pageTurnTimeout, setPageTurnTimeout] = useState(null)

  // Call onAnimationEnd when component unmounts before timeout ends
  useEffect(() => {
    return () => {
      console.log('unmount')
      if (pageTurnTimeout) {
        console.log('Clearing timeout')
        clearTimeout(pageTurnTimeout)
        setPageTurnTimeout(null)
        onAnimationEnd()
      }
    }
  }, [settings])

  const currentPages = useMemo(() => {
    const pageSize = settings.fontType.page
    // Split text into pages by page size
    const allPages = []
    for (let i = 0; i < text.length; i += pageSize) {
      allPages.push(text.slice(i, i + pageSize))
    }

    const currentPageNumber = page || 1
    const isOdd = currentPageNumber % 2 == 1
    const currentPagesStart = isOdd
      ? currentPageNumber - 1
      : currentPageNumber - 2

    const currentPages = allPages.slice(
      currentPagesStart,
      currentPagesStart + 4
    )

    return currentPages
  }, [page, text, settings])

  useEffect(() => {
    const isChanged = prevPage !== page
    const isOdd = page % 2 == 1
    const isNextPage = prevPage < page

    // if (pageTurnTimeout) clearTimeout(pageTurnTimeout)

    setPrevPage(page)

    if (isChanged && page === 0) setState([], [], [], [])
    else if (!isChanged || prevPage === 0) setState(currentPages)
    else if (isNextPage && isOdd && page !== 1) turnPage(currentPages)
    else if (!isNextPage && isOdd) turnPage(currentPages, true)
  }, [currentPages])

  const turnPage = (pages, isReverse = false) => {
    onAnimationStart()
    setPageAnimation(isReverse ? -1 : 1)

    setState((state) => [...state.slice(0, 2), ...pages])

    setTimeout(() => {
      setState([...pages])
      setPageAnimation(0)
    }, ANIMATION_DURATION)

    const timeout = setTimeout(() => {
      clearTimeout(pageTurnTimeout)
      setPageTurnTimeout(null)
      onAnimationEnd()
    }, ANIMATION_DURATION + 100)

    setPageTurnTimeout(timeout)
  }

  // Odd animation indicator toggle every iteration
  const [isOddAnimation, setIsOddAnimation] = useState(false)
  useEffect(() => {
    setIsOddAnimation(!isOddAnimation)
  }, [currentPosition])

  const getPage = useCallback(
    (page = [], key) => {
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
    },
    [settings, rowsPerLine, highlightType, currentPosition]
  )

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
          checked={pageAnimation !== 0}
          className={pageAnimation == -1 ? 'reverse' : ''}
          readOnly
        />

        <input
          type="radio"
          name={page2Name}
          id={page2Name}
          checked={pageAnimation !== 0}
          className={pageAnimation == -1 ? 'reverse' : ''}
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
