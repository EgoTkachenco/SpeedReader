import { useState, useEffect, useRef } from 'react'
export default function Rolling({ settings, text }) {
  const contentRef = useRef()
  const [state, setState] = useState(null)
  useEffect(() => {
    if (text) {
      console.log('rolling effect')
      contentRef.current.classList.remove('animation')
      setState(text)
      contentRef.current.classList.add('animation')
    }
  }, [text, settings.type])
  return (
    <div
      className="rolling-reader"
      style={{
        transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
        backgroundColor: settings.pageColor,
        color: settings.textColor,
      }}
    >
      <div
        ref={contentRef}
        className="rolling-reader-content"
        style={{ animationDuration: 10000 / settings.speed + 'ms' }}
      >
        {state &&
          state.map((row, i) => (
            <div key={i}>{row.map((w) => w.text).join(' ')}</div>
          ))}
      </div>
    </div>
  )
}
