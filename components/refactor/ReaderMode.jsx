import _ from 'lodash'
import { Button } from '../common'
import {} from 'date-fns'
import { observer } from 'mobx-react-lite'

const ReaderMode = observer(({ reader, settings }) => {
  const time = reader.reader_session_time
  const isReader = reader.mode === 'reader'
  const isBookChosen = !!settings.book
  const isStarted = reader.reader_session_statistic !== null
  const isPlay = reader.reader_session_statistic_timeout !== null

  if (!isReader || !isBookChosen)
    return (
      <Container>
        <Button onClick={() => reader.openReaderStatistic()}>
          Show Statistics
        </Button>
        <Button onClick={() => reader.handleReaderSessionEnd()}>
          Exit Reader
        </Button>
      </Container>
    )

  if (!isStarted)
    return (
      <Container>
        <Button onClick={() => reader.handleReaderSessionStart()}>Start</Button>
        <Button onClick={() => reader.handleReaderSessionEnd()}>
          Exit Reader
        </Button>
      </Container>
    )

  return (
    <Container>
      <span style={{ color: 'white' }}>{time}</span>
      {isPlay ? (
        <Button onClick={() => reader.handleReaderSessionPause()}>Pause</Button>
      ) : (
        <Button onClick={() => reader.handleReaderSessionPlay()}>Play</Button>
      )}

      <Button onClick={() => reader.handleReaderSessionEnd()}>
        Exit Reader
      </Button>
    </Container>
  )
})

export default ReaderMode

const Container = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '1rem',
    }}
  >
    {children}
  </div>
)
