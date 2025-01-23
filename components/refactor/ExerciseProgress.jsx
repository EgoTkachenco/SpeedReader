import { useState, useEffect, useRef } from 'react'
import _ from 'lodash'

const ExerciseProgress = ({
  exercise,
  isPlay,
  onPlay,
  onPause,
  startTime,
  duration,
}) => {
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState('00:00')
  const audioRef = useRef()
  const [audioLoaded, setAudioLoaded] = useState(false)

  // reset audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        setAudioLoaded(false)
        audioRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (!audioLoaded) return
    if (!audioRef?.current) return
    // audioRef.current.volume = 0.2
    if (isPlay && startTime) {
      const currentTime = new Date().getTime() - startTime
      const currentTimePercent =
        currentTime < duration
          ? ((currentTime * 100) / duration).toFixed(0)
          : 100

      const audioDuration = audioRef.current.duration
      const audioCurrentTime = audioDuration * (currentTimePercent / 100)
      audioRef.current.currentTime = audioCurrentTime
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }

    // return () => {
    //   if (audioRef.current && !audioRef.current.paused) audioRef.current.pause()
    // }
  }, [isPlay, audioLoaded, startTime])

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

    if (new_progress) {
      setProgress(new_progress)
      setTime(formatTime(now - startTime))
    }
  }

  const isEnd = max_step === current_step && !isPlay

  return (
    <div className="exercise-progress">
      <div className="exercise-progress-top">
        {/* <div className="exercise-progress__step">
          {current_step} / {max_step}
        </div> */}
        <div className="exercise-progress__step">{time}</div>

        {/* audio volume */}
        <VolumeControl
          value={audioRef.current?.volume || 0}
          onChange={(value) => (audioRef.current.volume = value)}
        />

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

        <LineControll duration={duration} onPause={onPause} onPlay={onPlay} />
      </div>

      {exercise.audio ? (
        <audio
          ref={audioRef}
          src={exercise.audio}
          style={{ opacity: 0, height: 0, width: 0 }}
          loop
          volume={0.2}
          onCanPlayThrough={() => setAudioLoaded(true)}
        />
      ) : null}
    </div>
  )
}

export default ExerciseProgress

const LineControll = ({ duration, onPause, onPlay }) => {
  const ref = useRef()
  const [value, setValue] = useState(0)
  const [isActive, setIsActive] = useState(false)

  const handleMove = _.debounce((e) => {
    e.stopPropagation()
    // if (!isActive) return
    const { x, width } = ref.current.getBoundingClientRect()
    const new_value = ((e.clientX - x) * 100) / width
    setValue(new_value)
  }, 10)

  const submit = () => {
    const new_duration = (duration * (value / 100)).toFixed(0)
    console.log(new_duration)
    onPlay(Number(new_duration))
  }

  const activate = () => {
    onPause()
    setIsActive(true)
  }
  const deactivate = () => setIsActive(false)

  return (
    <div
      ref={ref}
      className="exercise-progress-line-controll"
      onMouseMove={handleMove}
      onMouseDown={activate}
      onMouseLeave={() => {
        deactivate()
        // onPlay()
      }}
      onMouseUp={() => {
        deactivate()
        submit()
      }}
      style={{ opacity: isActive ? 1 : 0 }}
    >
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

const formatTime = (miliseconds) => {
  let seconds = Math.floor(miliseconds / 1000)
  const minutes = Math.floor(seconds / 60)
  seconds = seconds - minutes * 60

  const f_t = (v) => (v.toString().length === 1 ? '0' + v : v)
  return `${f_t(minutes)}:${f_t(seconds)}`
}

const VolumeControl = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    return () => {
      setIsOpen(false)
    }
  }, [])

  return (
    <div className="exercise-progress__volume">
      <img
        src="/volume-icon.svg"
        alt="volume"
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  )
}
