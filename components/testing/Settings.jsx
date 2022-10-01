import { Button, ColorPicker } from '../common'
import SpeedLottieAnimation from '../testing/SpeedLottieAnimation'

const TestingSettings = ({ settings, onChange }) => {
  const onSpeedChange = _.debounce((value) => onChange('speed', value), 10)
  return (
    <div className="training-settings">
      <Button onClick={() => onChange('type', 'book')}>Back to book</Button>

      <div className="training-settings__title">Speed</div>
      <input
        className="range-input"
        type="range"
        min={1}
        max={12}
        onChange={(e) => onSpeedChange(e.target.value)}
        value={settings.speed}
      />
      <SpeedLottieAnimation speed={settings.speed} />
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
      <Button variant="primary" onClick={() => onChange('book', null)}>
        Pass the exam
      </Button>
      <div className="training-settings__delimiter" />
      <Button variant="primary">Share the result</Button>
    </div>
  )
}

export default TestingSettings
