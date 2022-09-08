import { useState } from 'react'
import { useClickOutside } from '@mantine/hooks'

const Select = ({
  value,
  onChange,
  options = [],
  renderValue,
  renderOption,
  top,
}) => {
  const [show, setShow] = useState(false)
  const ref = useClickOutside(() => setShow(false))

  return (
    <div
      className={`select-wrapper ${show ? 'show' : ''} ${top ? 'top' : ''}`}
      ref={ref}
    >
      <div className="select" onClick={() => setShow(!show)}>
        {renderValue ? renderValue(value) : value}

        <img className="select-arrow" src="/arrow.svg" alt="arrow" />
      </div>
      <div className="select-content">
        {options.map((option, key) => (
          <div
            className="select-content-item"
            key={key}
            onClick={() => {
              if (onChange) onChange(option)
              setShow(false)
            }}
          >
            {renderOption ? renderOption(option) : option}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Select
