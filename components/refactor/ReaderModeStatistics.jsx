import { useEffect, useMemo, useState } from 'react'
import Button from '../common/Button'
import { getReaderModeStatistic } from '../../store/api'
import { format } from 'date-fns'
import { timeDifferenceInMinutesAndSeconds } from '../../utils'

const ReaderModeStatistics = ({ reader, user }) => {
  const [statistics, setStatistics] = useState(null)

  useEffect(() => {
    getReaderModeStatistic(user)
      .then(setStatistics)
      .catch((error) => console.log(error.message))
  }, [])

  const { wpm, comprehensionLevel, comprehensionResult } = useMemo(() => {
    if (!statistics)
      return {
        wpm: 0,
        comprehensionLevel: 0,
        comprehensionResult: 0,
      }

    return {
      wpm: statistics[0].wpm,
      comprehensionLevel: statistics[0].comprehension * 10,
      comprehensionResult:
        statistics[0].words * (statistics[0].comprehension / 10),
    }
  }, [statistics])

  return (
    <div className="reader-statistics">
      <div
        style={{
          width: '100%',
          color: '#fff',
          fontSize: '2rem',
          textTransform: 'uppercase',
          fontWeight: 500,
          marginLeft: '2.5rem',
        }}
      >
        Last reading session
      </div>
      <StatCard
        title={`WPM: ${wpm}`}
        subtitle={`You've read ${wpm} words per minute`}
      />
      <StatCard
        title={`Comprehension level: ${comprehensionLevel}%`}
        subtitle={`You understand ${comprehensionResult} words`}
        position="left"
      />
      <TestResultsTable data={statistics} />
      <Button onClick={() => reader.closeReaderStatistic()}>Back</Button>
    </div>
  )
}

export default ReaderModeStatistics

const StatCard = ({ title, subtitle, position = 'right' }) => (
  <div className="testing-dashboard-item">
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
        <div className="illustration-card-content__title">{title}</div>
        <div className="illustration-card-content__subtitle">{subtitle}</div>
      </div>
    </div>
  </div>
)

const TestResultsTable = ({ data = [] }) => {
  return (
    <div className="testing-dashboard-item test-table">
      <div className="testing-dashboard-item__title">History</div>
      <table className="test-table">
        <tbody>
          <tr>
            <th>Date</th>
            <th>Book</th>
            <th>Reading time</th>
            <th>Words Readed</th>
            <th>WPM</th>
            <th>Comprehension</th>
          </tr>
          {data &&
            data.map((el) => (
              <tr key={el.id}>
                <td>{format(new Date(el.date), 'yyyy/MM/dd')}</td>
                <td>{el.book.name}</td>
                <td>{timeDifferenceInMinutesAndSeconds(el.time)}</td>
                <td>{el.words}</td>
                <td>{el.wpm}</td>
                <td>{el.comprehension * 10}%</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
