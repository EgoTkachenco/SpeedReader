import { useEffect, useState, useRef } from 'react'
import Chart from 'chart.js/auto'
import {
  getTestingExercises,
  getTestingResults,
  getStatistics,
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
  const [statistics, setStatistics] = useState(null)
  useEffect(() => {
    getTestingResults(user)
      .then(setExerciseResults)
      .catch((error) => console.log(error.message))

    getStatistics(user)
      .then(setStatistics)
      .catch((error) => console.log(error.message))
  }, [user])

  return (
    <div className="testing-dashboard">
      <StatCard title="Speed level" value={2.34} />
      <StatCard title="Comprehension Level" value={10} position="left" />

      <TestExercisesTable data={exercises} onTestStart={startTest} />
      <TestResultsTable data={exerciseResults} />
      <TestResultsStatistics data={statistics} />
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

const TestResultsStatistics = ({ data = [] }) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (!data) return
    const ctx = chartRef.current.getContext('2d')

    const formattedData = {
      labels: data.map((item) => item.date),
      datasets: [
        // {
        //   label: 'Time',
        //   data: data.map((item) => ({
        //     value: new Date().getTime() - (new Date().getTime() - item.time),
        //     label: formatDistance(
        //       new Date(),
        //       new Date(new Date().getTime() - item.time)
        //     ),
        //   })),
        //   borderColor: 'rgba(75, 192, 192, 1)',
        //   backgroundColor: 'rgba(75, 192, 192, 0.2)',
        //   borderWidth: 2,
        //   fill: true,
        //   tension: 0.4, // For smooth curves
        // },
        {
          label: 'Score',
          data: data.map((item) =>
            isNaN(parseFloat(item.score)) ? 0 : parseFloat(item.score)
          ),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    }

    const chart = new Chart(ctx, {
      type: 'line',
      data: formattedData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: 'white', // Legend text color
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'white', // X-axis label color
            },
          },
          y: {
            ticks: {
              color: 'white', // Y-axis label color,
              stepSize: 0.1,
            },
          },
        },
      },
    })

    return () => {
      chart.destroy() // Clean up chart on unmount
    }
  }, [data])

  return (
    <div
      className="testing-dashboard-item test-table"
      style={{ width: '100%' }}
    >
      <div className="testing-dashboard-item__title">Statistics</div>
      <div style={{ backgroundColor: 'black', padding: '20px' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  )
}
