import ExerciseComments from './ExerciseComments'

const ExerciseHelper = ({ exercise }) => {
  return (
    <div className="exercise-helper">
      <ExerciseComments exercise={exercise} />
    </div>
  )
}

export default ExerciseHelper
