import { useEffect, useState } from 'react'
import {
  getTestingExercise,
  getTestingExercises,
  getTestingResults,
} from '../../store/api'
import { Button } from '../common'
import { format, formatDistance, formatDistanceStrict } from 'date-fns'

const Dashboard = ({ startTest, user }) => {
  const [exercises, setExercises] = useState(null)
  useEffect(() => {
    getTestingExercises()
      .then(setExercises)
      .catch((error) => console.log(error.message))
  }, [])
  const [exerciseResults, setExerciseResults] = useState(null)
  useEffect(() => {
    getTestingResults(user)
      .then(setExerciseResults)
      .catch((error) => console.log(error.message))
  }, [user])

  return (
    <div className="testing-dashboard">
      <StatCard title="Speed level" value={2.34} />
      <StatCard title="Comprehension Level" value={10} position="left" />

      <TestExercisesTable data={exercises} onTestStart={startTest} />
      <TestResultsTable data={exerciseResults} />
    </div>
  )
}

export default Dashboard

const StatCard = ({ title, value, position = 'right' }) => (
  <div className="testing-dashboard-item">
    <div className="testing-dashboard-item__title">{title}</div>
    <div className={`illustration-card ${position}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={
          position === 'right'
            ? '/testing-illustration_1.png'
            : 'testing-illustration_2.png'
        }
        alt={title}
        className="illustration-card__illustration"
      />
      <div className="illustration-card-content">
        <div className="illustration-card-content__title">{value}</div>
        <div className="illustration-card-content__subtitle">{title}</div>
      </div>
    </div>
  </div>
)

const TestExercisesTable = ({ data = [], onTestStart }) => {
  return (
    <div className="testing-dashboard-item test-table">
      <div className="testing-dashboard-item__title">Tests</div>
      <table className="test-table">
        <tbody>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Description</th>
            <th>Words number</th>
            <th>Level</th>
            <th></th>
          </tr>
          {data &&
            data.map((exercise) => (
              <tr key={exercise.id}>
                <td>
                  <img src="/test-blue-icon.png" alt="exercise" />
                </td>
                <td>{exercise.name}</td>
                <td>{exercise.description}</td>
                <td>{exercise.words}</td>
                <td>{exercise.difficulty}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => onTestStart(exercise.id)}
                  >
                    Start
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

const TestResultsTable = ({ data = [] }) => {
  return (
    <div className="testing-dashboard-item test-table">
      <div className="testing-dashboard-item__title">History</div>
      <table className="test-table">
        <tbody>
          <tr>
            <th>Date</th>
            <th>Test</th>
            <th>Reading time</th>
            <th>Result</th>
          </tr>
          {data &&
            data.map((el) => (
              <tr key={el.id}>
                <td>{format(new Date(el.created_at), 'yyyy/MM/dd')}</td>
                <td>{el.exercise.name}</td>
                <td>
                  {formatDistanceStrict(
                    new Date(),
                    new Date(new Date().getTime() - el.reading_time)
                  )}
                </td>
                <td>
                  {el.correct_answers_count || 0}/{el.questions_count || 0}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
