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
  // return (

  // )
  return (
    <div
      className="dashboard-statistic message-box-animation"
      style={{ width: '100%', alignSelf: 'flex-start', textAlign: 'center' }}
    >
      <video
        src="/Deep Male Voice opt1 v2.webm"
        autoPlay
        style={{ width: '100%', height: '100%' }}
      />
      {/* <h6 style={{ width: '100%', margin: '12px 0' }}>Exercise Statistics</h6> */}

      <PerMinuteReadingStatistic value={perMinuteCount} />
      <CurrentSpeedReadingStatistic value={speed} />
      <Button onClick={onClose}>Close</Button>
    </div>
  )
}
