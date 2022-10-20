const Modal = ({ show, onClose, children }) => {
  if (!show) return

  return (
    <div className="modal-wrapper">
      <div className="modal">
        <button className="modal-btn__close" onClick={onClose}>
          <CloseSvg />
        </button>

        {children}
      </div>
    </div>
  )
}

export default Modal

const CloseSvg = () => (
  <svg
    width="23"
    height="23"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="6.00977"
      y="5.30371"
      width="16"
      height="1"
      transform="rotate(45 6.00977 5.30371)"
      fill="white"
      fillOpacity="0.5"
    />
    <rect
      x="17.3223"
      y="6.01074"
      width="16"
      height="1"
      transform="rotate(135 17.3223 6.01074)"
      fill="white"
      fillOpacity="0.5"
    />
  </svg>
)
