import { useRef, useEffect } from 'react'
import ExerciseComments from './ExerciseComments'

const ExerciseHelper = ({ exercise, isExerciseActive }) => {
  const audioRef = useRef()
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2
      if (isExerciseActive && audioRef.current.paused) audioRef.current.play()
      else if (!isExerciseActive && !audioRef.current.paused)
        audioRef.current.pause()
    }
    return () => {
      if (audioRef.curren && !audioRef.current.pausedt) audioRef.current.pause()
    }
  }, [isExerciseActive])

  return (
    <div className="exercise-helper">
      {exercise.audio ? (
        <audio
          ref={audioRef}
          src={exercise.audio}
          style={{ opacity: 0, height: 0, width: 0 }}
          loop
        />
      ) : null}

      <ExerciseComments exercise={exercise} />
    </div>
  )
}

export default ExerciseHelper
