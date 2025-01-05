import { useState, useEffect, useMemo } from 'react'
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

  const rotateAngle = useMemo(() => {
    if (typeof settings.rotate === 'boolean') return settings.rotate ? 180 : 0

    return Number(settings.rotate)
  }, [settings.rotate])

  return (
    <div
      className="zoom-reader"
      style={{
        backgroundColor: settings.pageColor,
        color: settings.textColor,
        fontSize: `calc(${settings.fontType.fontSize}  * 1.2)`,
        // transform: `rotate(${rotateAngle}deg)`,
      }}
    >
      <style>
        {`
					.zoom-enter-active {
						animation-duration: ${speed > 100 ? speed : 0}ms;
					}
				`}
      </style>
      <div
        className="zoom-reader-content"
        style={{ transform: `rotate(${rotateAngle}deg)` }}
      >
        <CSSTransition
          in={state}
          timeout={speed > 100 ? speed : 0}
          classNames="zoom"
        >
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
