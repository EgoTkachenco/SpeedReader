import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

export default function Zoom({ settings, text, speed }) {
  const [state, setState] = useState(null)
  useEffect(() => {
    setState(false)
    const timeout = setTimeout(() => setState(true), 1)

    return () => {
      setState(false)
      clearTimeout(timeout)
    }
  }, [text])

  return (
    <div
      className="zoom-reader"
      style={{
        backgroundColor: settings.pageColor,
        color: settings.textColor,
        fontSize: `calc(${settings.fontType.fontSize}  * 1.2)`,
        transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
      }}
    >
      <style>
        {`
					.zoom-enter-active {
						animation-duration: ${speed}ms;
					}
				`}
      </style>
      <div className="zoom-reader-content">
        <CSSTransition in={state} timeout={2000} classNames="zoom">
          <div>
            {text.map(({ text, position }) => (
              <pre key={position}>{text}</pre>
            ))}
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}
