import Button from '../common/Button'

const ReaderModeStatistics = ({ reader }) => {
  const stat = {
    start_date: 1735318472453,
    time_seconds: 23,
    end_date: 1735318520310,
    comprehension: 5,
    wordsReaded: 1413,
    result: 706.5,
  }

  const wpm = ((stat.wordsReaded * 60) / stat.time_seconds).toFixed(0)
  const comprehensionLevel = stat.comprehension * 10
  const comprehensionResult = stat.result.toFixed(0)
  return (
    <div className="reader-statistics">
      <StatCard
        title={`WPM: ${wpm}`}
        subtitle={`You've read ${wpm} words per minute`}
      />
      <StatCard
        title={`Comprehension level: ${comprehensionLevel}%`}
        subtitle={`You understand ${comprehensionResult} words`}
        position="left"
      />
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
