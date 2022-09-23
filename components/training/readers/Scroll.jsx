import { useState, useEffect, useRef } from 'react'

let counter = 32

export default function Scroll({
  settings,
  pages,
  currentPosition,
  rowsPerLine,
}) {
  const contentRef = useRef()
  const animationTime = 1000 / settings.speed
  const [state, setState] = useState([])

  useEffect(() => {
    setState([])
    counter = 32
  }, [settings.book])
  useEffect(() => {
    if (pages && pages.length) {
      contentRef.current.style.transition = `all ${animationTime}ms linear`
      const old = [...state]
      setState([...old, ...pages])
    }
  }, [pages, settings.type])

  useEffect(() => {
    contentRef.current.style.transition = `all ${animationTime}ms linear`
    const margin = contentRef.current.style.marginTop
    if (counter <= 0) {
      console.log(
        `calc(-1 * ${Math.floor(currentPosition / settings.fontType.row)} *
			${settings.fontType.fontSize})`
      )
      contentRef.current.style.marginTop = `calc(-1 * ${Math.floor(
        currentPosition / settings.fontType.row
      )} * ${settings.fontType.fontSize})`
    } else {
      counter += -rowsPerLine
    }
  }, [currentPosition])

  return (
    <div
      className="scroll-reader"
      style={{
        transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
        backgroundColor: settings.pageColor,
        color: settings.textColor,
        fontSize: settings.fontType.fontSize,
      }}
    >
      <div
        ref={contentRef}
        className="scroll-reader-content"
        style={{ marginTop: '0' }}
      >
        {getRows(state, currentPosition).map(({ row, position }, i) => (
          <div key={position}>{row.map((w) => w.text).join(' ')}</div>
        ))}
      </div>
    </div>
  )
}

// const maxOffset = 24

const getRows = (pages, currentPosition) =>
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
