import { Checkbox, Button, Select, ColorPicker } from '../common'
import { useState, useEffect } from 'react'
import store from '../../store/reader'
import user_store from '../../store/'
import { observer } from 'mobx-react-lite'
import { SIZES } from '../../store/constants'
import { useRouter } from 'next/router'
import ExerciseProgress from './ExerciseProgress'
import SpeedLottieAnimation from './SpeedLottieAnimation'

const ReaderSettings = observer(() => {
  useEffect(() => {
    if (process.browser) store.initSettings()
  }, [])
  const settings = store.settings
  const presets = store.presets
  const preset = store.preset
  const exercise = store.exercise
  const onChange = (key, val) => store.updateSettings(key, val)
  const onReset = () => store.resetConfig()
  // settings, onChange, onReset
  const [showCustom, setShowCustom] = useState(false)
  const router = useRouter()
  if (settings.type === 'scroll')
    return <ScrollSettings settings={settings} onChange={onChange} />

  return (
    <div className="training-settings">
      <Button onClick={() => onChange('type', 'scroll')}>Scroll Test</Button>
      <div className="training-settings__delimiter" />
      <div className="training-settings__title">Power learning sets</div>
      <div className="training-settings-list__vertical">
        {presets.map((el, i) => (
          <Checkbox
            key={i}
            label={el.name}
            value={el.name === preset?.name}
            onChange={() => store.setPreset(el)}
          />
        ))}
      </div>
      <div className="training-settings-list">
        {preset &&
          preset.exercises.map((el, i) => (
            <Button
              variant={
                exercise?.name === el.name ? 'success' : 'success-outline'
              }
              key={i}
              onClick={() => store.setExercise(el)}
            >
              {el.name}
            </Button>
          ))}
      </div>
      {exercise && (
        <ExerciseProgress
          exercise={exercise}
          isPlay={!!store.exerciseTimeout}
          onPlay={() => store.playPreset()}
          onPause={() => store.pausePreset()}
        />
      )}
      <div className="training-settings__delimiter" />
      <div className="training-settings__title">Fonts</div>
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
            options={[1, 2, 4]}
          />
          <div className="training-settings__title">Speed</div>
          <Select
            onChange={(value) => onChange('speed', value)}
            value={settings.speed}
            options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
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
      <div className="training-settings__delimiter" />
      <Button onClick={onReset}>Reset Setting</Button>
      <div className="training-settings__delimiter" />
      <Button
        variant="text"
        onClick={() => {
          user_store.logout()
          router.push('/login')
        }}
      >
        Log out
      </Button>
    </div>
  )
})

export default ReaderSettings

const ScrollSettings = ({ settings, onChange }) => {
  return (
    <div className="training-settings">
      <Button onClick={() => onChange('type', 'book')}>Back to book</Button>

      <div className="training-settings__title">Speed</div>
      <Select
        onChange={(value) => onChange('speed', value)}
        value={settings.speed}
        options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
      />
      <SpeedLottieAnimation speed={settings.speed} />
      <div className="training-settings-list">
        <div>
          <div className="training-settings__title">Highlight color</div>
          <ColorPicker
            onChange={(color) => onChange('highlightColor', color)}
            value={settings.highlightColor}
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
    </div>
  )
}
