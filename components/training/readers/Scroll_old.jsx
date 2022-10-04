import { useState, useEffect, useRef } from 'react'
import { SPEED_LEVELS } from '../../../store/constants'

export default function Scroll({
  settings,
  text,
  currentPosition,
  rowsPerLine,
}) {
  const contentRef = useRef()
  const [state, setState] = useState([])

  useEffect(() => {
    const animationTime = SPEED_LEVELS[parseInt(settings.speed)]
    contentRef.current.style.transition = `all ${animationTime}ms linear`
  }, [settings.speed])

  useEffect(() => {
    setState([])
  }, [settings.book])

  useEffect(() => {
    console.log('TEXT EFFECT')
    if (text && text.length) {
      const rows = getRows(text, settings)
      const isNewText = !!state.text
      if (isNewText) {
        // concat text
        let rows_hash = state.text.reduce(
          (acc, row) => ({ ...acc, [row.position]: true }),
          {}
        )
        const acceptedRows = rows.filter(
          (row) => !rows_hash.hasOwnProperty(row.position)
        )
        setState({
          ...state,
          text: [...state.text, ...acceptedRows],
        })
      } else {
        setState({
          ...state,
          text: rows,
        })
      }
    }
  }, [text, settings.type])

  useEffect(() => {
    console.log(
      'POSITION EFFECT',
      currentPosition,
      Math.floor(currentPosition / settings.fontType.row)
    )
    // console.log(state.text)
    contentRef.current.style.marginTop = `calc(-1 * ${Math.floor(
      currentPosition / settings.fontType.row
    )} * ${settings.fontType.fontSize})`
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
          <div
            key={position}
            style={{
              minHeight: `calc(${settings.fontType.fontSize} * 0.8)`,
              background:
                position < currentPosition
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
    //   pages.push(page)
    //   page = []
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
