const TYPES = {
  primary: 'btn-primary',
  success: 'btn-success',
  'success-outline': 'btn-success-outline',
  text: 'btn-text',
}

const Button = ({ children, type, variant, onClick }) => {
  const getType = (variant) => (TYPES[variant] ? TYPES[variant] : TYPES.primary)
  return (
    <button
      className={`btn ${getType(variant)}`}
      onClick={onClick}
      type={type || 'button'}
    >
      {children}
    </button>
  )
}

export default Button
