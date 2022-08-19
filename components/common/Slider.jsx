export default function Slider({ value, onChange }) {
  return (
    <div className="slider">
      <input
        id="speed"
        name="speed"
        type="range"
        min="1"
        max="10"
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <div className="slider-labels">
        {new Array(10).fill(null).map((_, i) => (
          <div
            className={`slider-labels__item ${i + 1 <= value ? 'active' : ''}`}
            key={i}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
