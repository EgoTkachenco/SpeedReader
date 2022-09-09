import { Checkbox, Button, Select, ColorPicker } from '../common'
import { useState, useEffect } from 'react'
import store from '../../store/reader'
import { observer } from 'mobx-react-lite'

const ReaderSettings = observer(() => {
  useEffect(() => {
    if (process.browser) store.initSettings()
  }, [])
  const settings = store.settings
  const onChange = (key, val) => store.updateSettings(key, val)
  const onReset = () => store.resetConfig()
  // settings, onChange, onReset
  const [showCustom, setShowCustom] = useState(false)
  return (
    <div className="training-settings">
      <div className="training-settings__title">Power learning sets</div>
      <div className="training-settings-list__vertical">
        <Checkbox label="Standard" value={true} onChange={() => {}} />
        <Checkbox label="Challenging" value={false} onChange={() => {}} />
        <Checkbox label="Extra challenging" value={false} onChange={() => {}} />
      </div>
      <div className="training-settings-list">
        <Button variant="success">Excercise 1</Button>
        <Button variant="success">Excercise 2</Button>
        <Button variant="success">Excercise 3</Button>
        <Button variant="success">Excercise 4</Button>
        <Button variant="success">Excercise 5</Button>
      </div>
      <div className="training-settings__delimiter" />
      <div className="training-settings__title">Fonts</div>
      <div className="training-settings-list__vertical">
        <Checkbox label="Small" value={true} onChange={() => {}} />
        <Checkbox label="Medium" value={false} onChange={() => {}} />
        <Checkbox label="Large" value={false} onChange={() => {}} />
        <Checkbox label="Extra large" value={false} onChange={() => {}} />
      </div>
      <div className="training-settings__delimiter" />
      <Button onClick={() => setShowCustom(!showCustom)}>
        Custom <img src="/arrow.svg" />
      </Button>
      {showCustom && (
        <>
          <div className="training-settings__title">№ of book</div>
          <Select
            value={settings.count}
            onChange={(value) => onChange('count', value)}
            options={[1, 2, 3, 4]}
          />
          <div className="training-settings__title">Speed</div>
          <Select
            onChange={(value) => onChange('speed', value)}
            value={settings.speed}
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          />
          <div className="training-settings-list">
            <div>
              <div className="training-settings__title">Highlight color</div>
              <ColorPicker
                onChange={(color) => onChange('highlightColor', color)}
                value={settings.highlightColor}
              />
            </div>
            <div>
              <div className="training-settings__title">Text color</div>
              <ColorPicker
                onChange={(color) => onChange('textColor', color)}
                value={settings.textColor}
              />
            </div>
          </div>
          <div className="training-settings-list">
            <div>
              <div className="training-settings__title">Page color</div>
              <ColorPicker
                onChange={(color) => onChange('pageColor', color)}
                value={settings.pageColor}
              />
            </div>
            <div>
              <div className="training-settings__title">Rotate (180deg)</div>
              <Select
                renderValue={(value) => (value ? '180deg' : '0deg')}
                renderOption={(value) => (value ? '180deg' : '0deg')}
                options={[false, true]}
                onChange={(value) => onChange('rotate', value)}
                value={settings.rotate}
              />
            </div>
          </div>
        </>
      )}

      <div className="training-settings__delimiter" />
      <div className="training-settings__title">Highlight type (S)</div>
      <Select
        value={settings.highlightTypeS}
        onChange={(value) => onChange('highlightTypeS', value)}
        options={[1, 2, 4, 6]}
        top="true"
      />

      <div className="training-settings__title">Highlight type (V)</div>
      <Select
        value={settings.highlightTypeV}
        onChange={(value) => onChange('highlightTypeV', value)}
        options={['smooth', 2, 4, 6]}
        top="true"
      />
    </div>
  )
})

export default ReaderSettings
