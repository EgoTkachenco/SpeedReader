import { useState, useEffect } from 'react'
import { SPEED_LEVELS } from '../../../store/constants'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import FullScreenButton from '../FullScreenButton'

const Scroll = ({
  settings,
  text,
  currentPosition,
  rowsPerLine,
  isFullScreen,
  onFullScreenChange,
}) => {
  const [state, setState] = useState([])

  useEffect(() => {
    setState([])
  }, [settings.book])

  useEffect(() => {
    // console.log('TEXT EFFECT')
    if (!text || !text.length) return
    const rows = getRows(text, settings).filter(
      (el) => el.position >= currentPosition
    )
    setState(rows)
  }, [text, settings.type])

  useEffect(() => {
    if (state && state.length)
      setState((state) => state.filter((el) => el.position >= currentPosition))
  }, [currentPosition])

  if (!state) return
  return (
    <div
      className="scroll-reader"
      style={{
        // transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
        backgroundColor: settings.pageColor,
        color: settings.textColor,
        fontSize: settings.fontType.fontSize,
      }}
    >
      <FullScreenButton
        isFullScreen={isFullScreen}
        onChange={(value) => onFullScreenChange(value)}
      />
      <style>
        {`
					.content-row-exit-active {
						margin-top: calc(-${settings.fontType.fontSize} * 1.1);
						transition: margin-top ${SPEED_LEVELS[parseInt(settings.speed)]}ms linear;
					}
				`}
      </style>
      <div
        style={{
          transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
        }}
      >
        <TransitionGroup className="scroll-reader-content">
          {state.map(({ row, position }, i) => (
            <CSSTransition
              timeout={SPEED_LEVELS[parseInt(settings.speed)]}
              key={position}
              classNames="content-row"
            >
              <div
                style={{
                  height: `calc(${settings.fontType.fontSize} * 1.1)`,
                  // minWidth: `calc(${settings.fontType.fontSize} * ${settings.fontType.row} * 0.55)`,
                  // maxWidth: `calc(${settings.fontType.fontSize} * ${settings.fontType.row} * 0.55)`,
                }}
              >
                {row.map((w) => w.text).join(' ')}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}

export default Scroll

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
