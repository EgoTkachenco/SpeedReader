import { useRef, useEffect, useState } from 'react'
import ExerciseComments from './ExerciseComments'

const ExerciseHelper = ({
  exercise,
  isExerciseActive,
  startTime,
  duration,
}) => {
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

    audioRef.current.volume = 0.2
    if (isExerciseActive && startTime) {
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
  }, [isExerciseActive, audioLoaded, startTime])

  return (
    <div className="exercise-helper">
      {exercise.audio ? (
        <audio
          ref={audioRef}
          src={exercise.audio}
          style={{ opacity: 0, height: 0, width: 0 }}
          loop
          onCanPlayThrough={() => setAudioLoaded(true)}
        />
      ) : null}

      <ExerciseComments exercise={exercise} />
    </div>
  )
}

export default ExerciseHelper
