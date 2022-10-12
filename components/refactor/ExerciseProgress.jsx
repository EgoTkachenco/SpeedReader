const ExerciseProgress = ({ exercise, isPlay, onPlay, onPause }) => {
  if (!exercise) return ''

  const max_step = exercise.data.length
  const current_step = exercise.data.filter((el) => el.passed).length
  const progress = ((current_step * 100) / max_step).toFixed(2) + '%'
  const isEnd = max_step === current_step && !isPlay
  return (
    <div className="exercise-progress">
      <div className="exercise-progress-top">
        <div className="exercise-progress__step">
          {current_step} / {max_step}
        </div>
        {!isPlay ? (
          <div className="exercise-progress__btn play" onClick={onPlay} />
        ) : (
          <div className="exercise-progress__btn pause" onClick={onPause} />
        )}
      </div>
      <div className="exercise-progress-line">
        <div
          className="exercise-progress-line__value"
          style={{ width: progress, background: isEnd ? '#009e65' : '#1893d5' }}
        />
      </div>
    </div>
  )
}

export default ExerciseProgress
