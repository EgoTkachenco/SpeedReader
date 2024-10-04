import { SIZES } from '../../store/constants'
import { Button, ColorPicker } from '../common'
import Checkbox from '../common/Checkbox'
import SpeedLottieAnimation from '../testing/SpeedLottieAnimation'

const TestingSettings = ({ settings, onChange, onClose }) => {
  const onSpeedChange = _.debounce((value) => onChange('speed', value), 10)
  return (
    <div className="training-settings">
      {/* <div className="training-settings__title">Speed</div>
      <input
        className="range-input"
        type="range"
        min={1}
        max={12}
        onChange={(e) => onSpeedChange(e.target.value)}
        value={settings.speed}
      />
      <div className="speed-animation-card">
        <SpeedLottieAnimation speed={settings.speed} />
      </div> */}
      <div className="training-settings-list__vertical">
        {Object.values(SIZES).map((type) => (
          <Checkbox
            label={type.title}
            key={type.key}
            value={type.key === settings.fontType?.key}
            onChange={() => onChange('fontType', type)}
          />
        ))}
      </div>
      <div className="training-settings-list">
        <div>
          <div className="training-settings__title">Text color</div>
          <ColorPicker
            onChange={(color) => onChange('textColor', color)}
            value={settings.textColor}
          />
        </div>
        <div>
          <div className="training-settings__title">Page color</div>
          <ColorPicker
            onChange={(color) => onChange('pageColor', color)}
            value={settings.pageColor}
          />
        </div>
      </div>
      <div className="training-settings__delimiter" />
      <Button variant="primary" onClick={onClose}>
        Pass the exam
      </Button>
      <div className="training-settings__delimiter" />
      <Button variant="primary">Share the result</Button>
    </div>
  )
}

export default TestingSettings
