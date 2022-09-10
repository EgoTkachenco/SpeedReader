import { TwitterPicker } from 'react-color'
import { useState, useRef } from 'react'
import { useOutsideClick } from 'rooks'
import { COLORS } from '../../store/constants'

export default function ColorPicker({ value, onChange }) {
  const [show, setShow] = useState(false)
  const ref = useRef()
  useOutsideClick(ref, () => setShow(false))

  return (
    <div className="color-picker select-wrapper" ref={ref}>
      <div className="select" onClick={() => setShow(!show)}>
        <div className="color-picker__value" style={{ background: value }} />
        <img className="select-arrow" src="/arrow.svg" alt="arrow" />
      </div>
      {show && (
        <div className="color-picker__form">
          <TwitterPicker
            colors={Object.values(COLORS)}
            onChangeComplete={(color) => {
              onChange(color.hex)
              setShow(false)
            }}
            color={value}
          />
        </div>
      )}
    </div>
  )
}
