import { Button } from '../common'

const FullScreenButton = ({ isFullScreen, onChange }) => {
  return (
    <div className="book-top">
      {!isFullScreen ? (
        <Button variant="text" onClick={() => onChange(true)}>
          <FullIcon /> Open full screen version
        </Button>
      ) : (
        <Button variant="text" onClick={() => onChange(false)}>
          <img className="book-bottom__arrow left" src="/arrow-left.svg" />
          Back
        </Button>
      )}
    </div>
  )
}

export default FullScreenButton

const FullIcon = () => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_229_2055)">
      <path
        d="M5.4335 15.836C5.1575 15.836 4.9335 15.6125 4.9335 15.336V10.9265H0.5C0.224 10.9265 0 10.703 0 10.4265C0 10.15 0.224 9.9265 0.5 9.9265H5.4335C5.7095 9.9265 5.9335 10.15 5.9335 10.4265V15.336C5.9335 15.6125 5.7095 15.836 5.4335 15.836V15.836ZM10.5665 15.8235C10.2905 15.8235 10.0665 15.6 10.0665 15.3235V10.3895C10.0665 10.113 10.2905 9.8895 10.5665 9.8895H15.476C15.752 9.8895 15.976 10.113 15.976 10.3895C15.976 10.666 15.752 10.8895 15.476 10.8895H11.0665V15.3235C11.0665 15.6 10.8425 15.8235 10.5665 15.8235V15.8235ZM5.4335 6.1105H0.524C0.248 6.1105 0.024 5.887 0.024 5.6105C0.024 5.334 0.248 5.1105 0.524 5.1105H4.9335V0.676502C4.9335 0.400002 5.1575 0.176501 5.4335 0.176501C5.7095 0.176501 5.9335 0.400002 5.9335 0.676502V5.6105C5.9335 5.8865 5.7095 6.1105 5.4335 6.1105ZM15.5 6.0735H10.5665C10.2905 6.0735 10.0665 5.85 10.0665 5.5735V0.664001C10.0665 0.387501 10.2905 0.164001 10.5665 0.164001C10.8425 0.164001 11.0665 0.387501 11.0665 0.664001V5.0735H15.5C15.776 5.0735 16 5.297 16 5.5735C16 5.85 15.776 6.0735 15.5 6.0735Z"
        fill="#2BA7DF"
      />
    </g>
    <defs>
      <clipPath id="clip0_229_2055">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
