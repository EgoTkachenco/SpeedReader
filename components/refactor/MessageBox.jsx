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
    <div
      className="dashboard-statistic"
      style={{ width: '100%', alignSelf: 'flex-start' }}
    >
      <h4 style={{ width: '100%', textAlign: 'center', margin: '24px 0' }}>
        Exercise Statistics
      </h4>

      <PerMinuteReadingStatistic value={perMinuteCount} />
      <CurrentSpeedReadingStatistic value={speed} />

      <Button onClick={onClose}>Close</Button>
    </div>
  )
}
