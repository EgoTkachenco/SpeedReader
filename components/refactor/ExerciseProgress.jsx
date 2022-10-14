import { useState, useEffect, useRef } from 'react'

const ExerciseProgress = ({
  exercise,
  isPlay,
  onPlay,
  onPause,
  startTime,
  duration,
}) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!exercise) setProgress(0)
    if (!exercise || !isPlay) return
    progressIteration(false)
    const interval = setInterval(progressIteration, 50)
    return () => {
      clearInterval(interval)
      progressIteration()
    }
  }, [exercise, startTime, isPlay])

  const ref = useRef()
  if (!exercise) return ''

  const max_step = exercise.data.length
  const current_step = exercise.data.filter((el) => el.passed).length

  const progressIteration = (isTransition = true) => {
    if (!isPlay) return
    const now = new Date().getTime()
    const time = now - startTime || now
    let new_progress =
      time < duration ? ((time * 100) / duration).toFixed(0) : 100
    if (ref.current)
      ref.current.style.transition = isTransition ? 'all 50ms linear' : 'none'
    // console.log(time, duration, new_progress)
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

        {/* <LineControll
          duration={duration}
          onChange={(duration) => {
            // onPause()
            // onPlay(duration)
          }}
        /> */}
      </div>
    </div>
  )
}

export default ExerciseProgress

const LineControll = ({ duration, onChange }) => {
  // const ref = useRef()
  const [value, setValue] = useState(0)
  // const onEnter = (i) => setActive(i)
  // const onLeave = () => setActive(null)

  const handleMove = (e) => {
    e.stopPropagation()
    const { x, width } = e.target.getBoundingClientRect()
    const new_value = ((e.clientX - x) * 100) / width
    // console.log(
    //   `Client X: ${
    //     e.clientX
    //   }; Element X: ${x}, Element width: ${width}, Value Width: ${
    //     e.clientX - x
    //   }, Value: ${new_value.toFixed(0)}`
    // )
    setValue(new_value)
  }

  return (
    <div className="exercise-progress-line-controll" onMouseMove={handleMove}>
      <div
        className="exercise-progress-line__value"
        style={{
          width: value + '%',
          transition: 'none',
          background: '#1893d5',
        }}
      />
    </div>
  )
}
