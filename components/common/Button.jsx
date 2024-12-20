const TYPES = {
  primary: 'btn-primary',
  success: 'btn-success',
  'success-outline': 'btn-success-outline',
  text: 'btn-text',
  'light-primary': 'btn-light-primary',
  dark: 'btn-dark',
}

const Button = ({ children, type, variant, onClick, disabled }) => {
  const getType = (variant) => (TYPES[variant] ? TYPES[variant] : TYPES.primary)
  return (
    <button
      className={`btn ${getType(variant)}`}
      onClick={onClick}
      type={type || 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
