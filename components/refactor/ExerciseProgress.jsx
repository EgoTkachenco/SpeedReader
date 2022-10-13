import { useState, useEffect, useRef } from 'react'

const ExerciseProgress = ({
  exercise,
  isPlay,
  onPlay,
  onPause,
  levelStartTime,
}) => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!exercise || !isPlay) return
    progressIteration(false)
    const interval = setInterval(progressIteration, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [levelStartTime, isPlay])
  const ref = useRef()
  if (!exercise) return ''

  const max_step = exercise.data.length
  const current_step = exercise.data.filter((el) => el.passed).length
  let duration = exercise.data[current_step - 1]
    ? (exercise.data[current_step - 1].duration / 1000).toFixed(0)
    : 0
  if (isNaN(duration)) duration = 0
  const progressIteration = (isTransition = true) => {
    if (!isPlay) return
    const level = exercise.data[current_step - 1]
    const time = new Date().getTime() - levelStartTime
    let new_progress =
      time < level.duration ? ((time * 100) / level.duration).toFixed(0) : 0
    ref.current.style.transition = isTransition ? 'all 1s linear' : 'none'
    if (new_progress) setProgress(new_progress)
  }

  const isEnd = max_step === current_step && !isPlay
  return (
    <div className="exercise-progress">
      <div className="exercise-progress-top">
        <div className="exercise-progress__step">
          {current_step} / {max_step}
        </div>
        {!isPlay ? (
          <div
            className="exercise-progress__btn play"
            onClick={() => onPlay()}
          />
        ) : (
          <div className="exercise-progress__btn pause" onClick={onPause} />
        )}
      </div>
      <div className="exercise-progress-line">
        <div
          ref={ref}
          className="exercise-progress-line__value"
          style={{
            width: progress + '%',
            background: isEnd ? '#009e65' : '#1893d5',
          }}
        />
        <LineControll
          duration={duration}
          onChange={(duration) => {
            onPause()
            onPlay(duration)
          }}
        />
      </div>
    </div>
  )
}

export default ExerciseProgress

const LineControll = ({ duration, onChange }) => {
  const [active, setActive] = useState(null)
  const onEnter = (i) => setActive(i)
  const onLeave = () => setActive(null)
  return (
    <div className="exercise-progress-line-controll">
      {new Array(Number(duration)).fill(null).map((_, i) => (
        <div
          className={`exercise-progress-line__cell ${
            active !== null && i <= active ? 'active' : ''
          }`}
          style={{
            borderRadius: i === active ? '0 0.5rem 0.5rem 0' : '0',
          }}
          key={i}
          onClick={() => onChange((i + 1) * 1000)}
          onMouseEnter={() => onEnter(i)}
          onMouseLeave={() => onLeave()}
        />
      ))}
    </div>
  )
}
