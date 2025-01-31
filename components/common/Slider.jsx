export default function Slider({
  value,
  onChange,
  options = [],
  id = 'speed',
  name = 'speed',
}) {
  const hasOptions = options.length > 0

  return (
    <div className="slider">
      <input
        id={id}
        name={name}
        type="range"
        min={1}
        max={options.length || 10}
        onChange={(e) =>
          onChange(hasOptions ? options[e.target.value - 1] : e.target.value)
        }
        value={value}
      />
      <div className="slider-labels">
        {(hasOptions ? options : new Array(10).fill(null)).map((option, i) => (
          <div
            className={`slider-labels__item ${i + 1 <= value ? 'active' : ''}`}
            key={i}
          >
            {option ? option : i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
