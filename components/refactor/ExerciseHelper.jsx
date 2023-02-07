import { useRef, useEffect, useState } from 'react'
import { Button, Modal } from '../common'
import ExerciseComments from './ExerciseComments'

const tutorial_video_url =
  'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'

const ExerciseHelper = ({ exercise, isExerciseActive, play, pause }) => {
  const audioRef = useRef()
  const [showTutorial, setShowTutorial] = useState(false)
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

  useEffect(() => {
    console.log(showTutorial, isExerciseActive)
    if (showTutorial && isExerciseActive) pause()
    else if (!showTutorial && !isExerciseActive) play()
  }, [showTutorial])

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

      {tutorial_video_url && (
        <Button onClick={() => setShowTutorial(true)}>How it works</Button>
      )}
      <Modal show={showTutorial} onClose={() => setShowTutorial(false)}>
        <div className="exercise-tutorial">
          <div className="exercise-tutorial__title">{exercise.name}</div>
          <video
            src={tutorial_video_url}
            controls
            className="exercise-tutorial__video"
          />
        </div>
      </Modal>

      <ExerciseComments exercise={exercise} />
    </div>
  )
}

export default ExerciseHelper
