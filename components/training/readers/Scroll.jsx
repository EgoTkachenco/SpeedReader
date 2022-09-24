import { useState, useEffect, useRef } from 'react'

let counter = 32

export default function Scroll({
  settings,
  text,
  currentPosition,
  rowsPerLine,
}) {
  const contentRef = useRef()
  const animationTime = getAnimationTime(settings.speed)
  const [state, setState] = useState([])
  console.log('animationTime: ', animationTime)
  useEffect(() => {
    contentRef.current.style.transition = `all ${animationTime}ms linear`
  }, [settings.speed])
  useEffect(() => {
    setState([])
    // counter = 32
  }, [settings.book])
  useEffect(() => {
    if (text && text.length) {
      const rows = getRows(text, settings)
      const isNewText = !!state.text
      if (isNewText) {
        // concat text
        let rows_hash = state.text.reduce(
          (acc, row) => ({ ...acc, [row.position]: true }),
          {}
        )
        console.log(rows_hash)
        const acceptedRows = rows.filter(
          (row) => !rows_hash.hasOwnProperty(row.position)
        )
        setState({
          ...state,
          text: [...state.text, ...acceptedRows],
        })
        console.log('ADD TEXT: ', acceptedRows)
      } else {
        setState({
          ...state,
          text: rows,
        })
        console.log('TEXT: ', rows)
      }
    }
  }, [text, settings.type])
  useEffect(() => {
    contentRef.current.style.transition = `all ${animationTime}ms linear`
    contentRef.current.style.marginTop = `calc(-1 * ${Math.floor(
      currentPosition / settings.fontType.row
    )} * ${settings.fontType.fontSize})`

    // if (counter <= 0) {
    // } else {
    // counter += -rowsPerLine
    // }
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
        {state.text?.map(({ row, position }, i) => (
          <div key={position}>{row.map((w) => w.text).join(' ')}</div>
        ))}
      </div>
    </div>
  )
}

// const maxOffset = 24

// const getRows = (pages, currentPosition) =>
//   pages.reduce(
//     (rows, page) => [
//       ...rows,
//       ...page.map((row) => ({
//         row,
//         position: row[row.length - 1].position,
//       })),
//     ],
//     []
//   )

const getRows = (all_text, settings) => {
  let text = all_text
  const { page: PAGE_SIZE, row: ROW_SIZE } = settings.fontType
  let pages = []
  let page = []
  let row = []
  let word = ''

  const isLowerCaseLetter = (char) => char === char.toLowerCase()
  const getRowSize = (str) =>
    Math.round(
      str
        .split('')
        .reduce((acc, char) => acc + (isLowerCaseLetter(char) ? 1 : 1.25), 0)
    )
  const addRow = () => {
    // if (page.length === PAGE_SIZE) {
    // pages.push(page)
    // page = []
    // }
    page.push({
      row,
      position: row[row.length - 1].position,
    })
    row = []
  }
  const addWord = (position) => {
    if (
      getRowSize(
        row
          .map((word) => word.text)
          .join(' ')
          .concat(` ${word}`)
      ) > ROW_SIZE
    ) {
      addRow()
    }
    row.push({ text: word, position })
    word = ''
  }
  for (let i = 0; i < text.length; i++) {
    let char = text[i]
    switch (char.text) {
      case '\n':
        addWord(char.position)
        addRow()
        break
      case ' ':
        addWord(char.position)
        break
      default:
        word += char.text
    }
  }
  addWord(text[text.length - 1].position)
  addRow()
  return page
}

const getAnimationTime = (speed) => {
  let result
  if (speed > 1 && speed < 7) {
    result = 1000 - (speed - 1) * 100
  } else {
    const times = {
      1: 700,
      7: 125,
      8: 100,
      9: 70,
      10: 20,
      11: 25,
      12: 10,
    }
    result = times.hasOwnProperty(speed) ? times[speed] : time[10]
  }
  return result
}
