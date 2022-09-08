const Checkbox = ({ value, onChange, label }) => {
  return (
    <div className="checkbox-wrapper">
      <div
        className={`checkbox ${value ? 'active' : ''}`}
        onClick={() => onChange(!value)}
      ></div>
      <div className="checkbox-label">{label}</div>
    </div>
  )
}

export default Checkbox
