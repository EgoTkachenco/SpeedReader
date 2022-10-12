import { useState, useEffect, useRef } from 'react'
import { BOOKS_API } from '../../../store/api'
import _ from 'lodash'
import FlipMove from 'react-flip-move'

export default function Scrambled({ settings }) {
  const [state, setState] = useState({
    text: '',
    start: 0,
    isScrumbled: false,
  })

  useEffect(() => {
    if (settings.book) updateText()
  }, [settings.book])

  const updateText = async () => {
    const size = 48 * 16
    const start = Math.floor(Math.random() * settings.book.size) - size
    let text = await BOOKS_API.getBookText(settings.book.id, {
      _start: start,
      _limit: size,
    })
    text = text.split(' ').map((word, i) => ({ word: word, key: word + i }))
    setState({ text: text, start, isScrumbled: false })
  }

  const scrambleText = () => {
    let newText = [...state.text]
    newText = _.shuffle(newText)
    setState({ ...state, text: newText, isScrumbled: true })
  }

  const handleClick = () => {
    if (!state.text || state.isScrumbled) return updateText()
    return scrambleText()
  }
  return (
    <>
      <div
        className="scrambled-reader"
        style={{
          transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
          backgroundColor: settings.pageColor,
          color: settings.textColor,
        }}
      >
        <div>
          {state.text && (
            <FlipMove className="scrambled-reader-content">
              {state.text.map((el) => (
                <span key={el.key}>{el.word}</span>
              ))}
            </FlipMove>
          )}
        </div>
      </div>
      <button
        className={`btn m-auto d-block mt-3 ${
          state.isScrumbled ? 'btn-success' : 'btn-primary'
        }`}
        onClick={handleClick}
      >
        {state.isScrumbled ? 'Update text' : 'Scrumble'}
      </button>
    </>
  )
}
