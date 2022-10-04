import { useState, useEffect, useRef } from 'react'
import { SPEED_LEVELS } from '../../../store/constants'
import FullScreenButton from '../FullScreenButton'

export default function Zoom({
  settings,
  text,
  isFullScreen,
  onFullScreenChange,
}) {
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
      className="zoom-reader"
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
      <div
        style={{
          transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
        }}
      >
        <div
          key={text}
          ref={contentRef}
          className="zoom-reader-content animation"
        >
          {state &&
            state.map((row, i) => (
              <div key={i}>{row.map((w) => w.text).join(' ')}</div>
            ))}
        </div>
      </div>
    </div>
  )
}
