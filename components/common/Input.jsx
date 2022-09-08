const Input = ({ error, hint, type, ...props }) => {
  const message = error ? (
    <div className="input-error">{error}</div>
  ) : hint ? (
    <div className="input-hint">{hint}</div>
  ) : null

  return (
    <div className="input-wrapper">
      <input
        {...props}
        type={type || 'text'}
        // onChange={(e) => onChange(e.target.value)}
      />
      {message}
    </div>
  )
}

export default Input
