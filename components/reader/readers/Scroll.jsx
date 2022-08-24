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
    if (pages && pages.length) {
      contentRef.current.style.transition = `all ${animationTime}ms linear`
      const old = [...state]
      // const last2Pages = old.splice(state.length - 2, 2)
      setState([...old, ...pages])
    }
  }, [pages, settings.type])

  useEffect(() => {
    contentRef.current.style.transition = `all ${animationTime}ms linear`
    const margin = contentRef.current.style.marginTop
    if (counter <= 0) {
      contentRef.current.style.marginTop = `calc(${margin} - (1.5em * ${rowsPerLine}))`
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
      }}
    >
      <div
        ref={contentRef}
        className="scroll-reader-content"
        style={{ marginTop: '0' }}
      >
        {getRows(state, currentPosition).map(({ row, position }, i) => (
          <div
            key={position}
            // style={{
            //   backgroundColor:
            //     position <= currentPosition
            //       ? settings.highlightColor
            //       : 'transparent',
            // }}
          >
            {row.map((w) => w.text).join(' ')}
          </div>
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
// .reverse()
// .reduce(
//   ({ rows, offset }, row) => {
//     if (row.position <= currentPosition) {
//       // if (offset > maxOffset)
//       return { rows, offset }
//       // offset++
//     }
//     return { rows: [...rows, row], offset }
//   },
//   { rows: [], offset: 0 }
// )
// .rows.reverse()
