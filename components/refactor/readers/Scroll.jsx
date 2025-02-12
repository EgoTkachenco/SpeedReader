import { useState, useEffect, useRef } from 'react'
import { SPEED_LEVELS } from '../../../store/constants'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Scroll = ({ settings, text, currentPosition, speed }) => {
  const ref = useRef()
  const [state, setState] = useState([])
  const setTopOffset = (text, isTransition) => {
    if (!ref.current) return
    const readedLinesCount = text.filter(
      (line) => line.position < currentPosition
    ).length
    if (isTransition) {
      ref.current.style.transitionDuration = SPEED_LEVELS[speed] + 'ms'
    } else {
      ref.current.style.transitionDuration = 0 + 'ms'
    }
    ref.current.style.marginTop = `calc(-${readedLinesCount} * ${settings.fontType.fontSize} * 1.2)`
  }
  useEffect(() => {
    setState([])
  }, [settings.book])

  useEffect(() => {
    setTopOffset(text, false)
    setState(text)
  }, [text])

  useEffect(() => {
    setTopOffset(state, true)
  }, [currentPosition])

  if (!state) return
  return (
    <div
      className="scroll-reader"
      style={{
        backgroundColor: settings.pageColor,
        color: settings.textColor,
        fontSize: settings.fontType.fontSize,
        transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
      }}
    >
      <div
        className="scroll-reader-content"
        style={{
          transitionTimingFunction: 'linear',
        }}
        ref={ref}
      >
        {state.map(({ text, position }, i) => (
          <pre
            key={position}
            style={{
              height: `calc(${settings.fontType.fontSize} * 1.2)`,
            }}
          >
            {text}
          </pre>
        ))}
      </div>
    </div>

    // return (
    //   <div
    //     className="scroll-reader"
    //     style={{
    //       backgroundColor: settings.pageColor,
    //       color: settings.textColor,
    //       fontSize: settings.fontType.fontSize,
    //     }}
    //   >
    //     <style>
    //       {`
    // 			.content-row-enter {
    // 				transition:  all ${speed}ms linear;

    // 			}
    // 				.content-row-exit-active {
    // 					margin-top: calc(-${settings.fontType.fontSize} * 1.2);
    // 					transition:  margin-top ${speed}ms linear;
    // 				}
    // 			`}
    //     </style>
    //     <div
    //       style={{
    //         transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
    //       }}
    //     >
    //       <TransitionGroup className="scroll-reader-content">
    //         {state.map(({ text, position }, i) => (
    //           <CSSTransition
    //             timeout={speed}
    //             key={position}
    //             classNames="content-row"
    //           >
    //             <pre
    //               style={{
    //                 height: `calc(${settings.fontType.fontSize} * 1.2)`,
    //               }}
    //             >
    //               {text}
    //             </pre>
    //           </CSSTransition>
    //         ))}
    //       </TransitionGroup>
    //     </div>
    //   </div>
  )
}

export default Scroll
