import { Checkbox, Button, Select, ColorPicker } from '../common'
import { useState } from 'react'
import user_store from '../../store/'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import ExerciseProgress from './ExerciseProgress'
import { SPEED_LEVELS, SIZES } from '../../store/constants'
import _ from 'lodash'
import BookListModal from './BookListModal'

const ReaderSettings = observer(
  ({
    settings,
    onReset,
    onChange,
    presets,
    preset,
    exercise,
    onPresetOpen,
    onExerciseOpen,
    isExerciseActive,
    startTime,
    onExercisePlay,
    onExercisePause,
    exercise_duration,
    book,
    books,
  }) => {
    const [showCustom, setShowCustom] = useState(false)
    const router = useRouter()

    return (
      <div className="training-settings">
        <BookListModal
          value={book}
          onChange={(book) => onChange('book', book, !isExerciseActive)}
          books={books}
          settings={settings}
        />
        <div className="training-settings__delimiter" />
        <div className="training-settings__title">Power learning sets</div>
        <div className="training-settings-list__vertical">
          {presets.map((el, i) => (
            <Checkbox
              key={i}
              label={el.name}
              value={el.name === preset?.name}
              onChange={() => onPresetOpen(el)}
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
                onClick={() => onExerciseOpen(el)}
              >
                {el.name}
              </Button>
            ))}
        </div>
        {exercise && (
          <ExerciseProgress
            exercise={exercise}
            isPlay={!!isExerciseActive}
            onPlay={(duration) => onExercisePlay(duration)}
            onPause={() => onExercisePause()}
            startTime={startTime}
            duration={exercise_duration}
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
              options={Object.keys(SPEED_LEVELS)}
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
        {/* <div className="training-settings__delimiter" />
        <Button
          variant="text"
          onClick={() => {
            user_store.logout()
            router.push('/login')
          }}
        >
          Log out
        </Button> */}
      </div>
    )
  }
)

export default ReaderSettings
