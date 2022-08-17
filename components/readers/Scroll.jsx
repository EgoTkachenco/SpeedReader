import { useState, useEffect, useRef } from 'react'

export default function Scroll({
  settings,
  pages,
  currentPosition,
  rowsPerLine,
}) {
  const contentRef = useRef()
  const animationTime = 10000 / settings.speed
  const [state, setState] = useState([])

  useEffect(() => {
    if (pages && pages.length) {
      setState([...state.splice(state.length - 2, 2), ...pages])
    }
  }, [pages, settings.type])

  useEffect(() => {
    contentRef.current.style.transition = `all ${animationTime}ms linear`
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

const maxOffset = 12

const getRows = (pages, currentPosition) =>
  pages
    .reduce(
      (rows, page) => [
        ...rows,
        ...page.map((row) => ({
          row,
          position: row[row.length - 1].position,
        })),
      ],
      []
    )
    .reverse()
    .reduce(
      ({ rows, offset }, row) => {
        if (row.position <= currentPosition) {
          if (offset > maxOffset) return { rows, offset }
          offset++
        }
        return { rows: [...rows, row], offset }
      },
      { rows: [], offset: 0 }
    )
    .rows.reverse()
