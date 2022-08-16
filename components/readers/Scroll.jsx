import { useState, useEffect, useRef } from 'react'

export default function Scroll({ settings, pages, currentPosition }) {
  const contentRef = useRef()
  const animationTime = 10000 / settings.speed
  const [state, setState] = useState([])

  useEffect(() => {
    if (pages && pages.length) {
      contentRef.current.style.transition = `all ${0}ms linear`
      setScroll(false)
      setState([...state, ...pages])
    }
  }, [pages, settings.type])

  const setScroll = (isTransition) => {
    if (!state.length) return

    const rows = getRows(state)
    for (let i = 0; i < rows.length; i++) {
      const { position } = rows[i]
      if (position === currentPosition) {
        const newScrollValue = -1.5 * (i + 1) + 'em'
        contentRef.current.style.transition = `all ${
          isTransition ? animationTime : 0
        }ms`
        contentRef.current.style.top = newScrollValue
        return
      }
    }
  }

  useEffect(() => {
    setScroll(true)
  }, [currentPosition])

  return (
    <div
      className="scroll-reader"
      style={{
        transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
        backgroundColor: settings.pageColor,
        color: settings.textColor,
      }}
    >
      <div ref={contentRef} className="scroll-reader-content">
        {getRows(state).map(({ row, position }, i) => (
          <div
            key={position}
            style={{
              backgroundColor:
                position <= currentPosition
                  ? settings.highlightColor
                  : 'transparent',
            }}
          >
            {row.map((w) => w.text).join(' ')}
          </div>
        ))}
      </div>
    </div>
  )
}
const getRows = (pages) =>
  pages.reduce(
    (rows, page) => [
      ...rows,
      ...page.map((row) => ({
        row,
        position: row[row.length - 1].position,
      })),
    ],
    []
  )
