import { useState, useEffect, useRef } from 'react'
import { SPEED_LEVELS } from '../../../store/constants'

export default function Rolling({ settings, text }) {
  const contentRef = useRef()
  const [state, setState] = useState(null)
  useEffect(() => {
    if (text) {
      setState('')
      contentRef.current.style.animationDuration =
        SPEED_LEVELS[parseInt(settings.speed)] + 'ms'
      setTimeout(() => setState(text), 1)
    }
  }, [text])

  return (
    <div
      className="rolling-reader"
      style={{
        transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
        backgroundColor: settings.pageColor,
        color: settings.textColor,
        fontSize: settings.fontType.fontSize,
      }}
    >
      <div
        key={text}
        ref={contentRef}
        className="rolling-reader-content animation"
      >
        {state &&
          state.map((row, i) => (
            <div key={i}>{row.map((w) => w.text).join(' ')}</div>
          ))}
      </div>
    </div>
  )
}
