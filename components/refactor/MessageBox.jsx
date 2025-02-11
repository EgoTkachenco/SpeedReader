import { useMemo } from 'react'
import {
  CurrentSpeedReadingStatistic,
  PerMinuteReadingStatistic,
} from '../dashboard/Dashboard'
import Button from '../common/Button'

const MessageBox = ({ message, onClose }) => {
  const customMessage = useMemo(() => {
    if (!message) return null

    if (message.search('exercise-statistic') !== -1) {
      const [perMinuteCount, speed] = message.split(':').slice(1)
      return (
        <ExerciseMessage
          perMinuteCount={perMinuteCount}
          speed={speed}
          onClose={onClose}
        />
      )
    }

    return null
  }, [message])

  if (!message) return

  return <div className="message-box">{customMessage || message}</div>
}

export default MessageBox

const ExerciseMessage = ({ perMinuteCount, speed, onClose = () => {} }) => {
  return (
    <div className="message-box-animation">
      <div
        className="dashboard-statistic"
        style={{ width: '100%', alignSelf: 'flex-start', textAlign: 'center' }}
      >
        <h4 style={{ width: '100%', margin: '24px 0' }}>
          Congratulations on completing the exercise! Keep up the great work!
        </h4>
        <h6 style={{ width: '100%', margin: '12px 0' }}>Exercise Statistics</h6>

        <PerMinuteReadingStatistic value={perMinuteCount} />
        <CurrentSpeedReadingStatistic value={speed} />

        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  )
}
