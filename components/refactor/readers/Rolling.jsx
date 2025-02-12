import { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { SPEED_LEVELS } from '../../../store/constants'

export default function Rolling({ settings, text, speed }) {
  const [state, setState] = useState(null)
  useEffect(() => {
    setState(false)
    setTimeout(() => setState(true), 1)
  }, [text])

  return (
    <div
      className="rolling-reader"
      style={{
        backgroundColor: settings.pageColor,
        color: settings.textColor,
        fontSize: `calc(${settings.fontType.fontSize}  * 1.2)`,
        transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
      }}
    >
      <style>
        {`
					.rolling-enter-active, .rolling-exit-active {
						transition: transform ${SPEED_LEVELS[speed]}ms;
					}
				`}
      </style>
      <div className="rolling-reader-content">
        <CSSTransition
          in={state}
          timeout={SPEED_LEVELS[speed]}
          classNames="rolling"
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
