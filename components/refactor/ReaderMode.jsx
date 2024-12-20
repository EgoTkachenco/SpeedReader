import { useState, useEffect } from 'react'
import _ from 'lodash'
import { Button } from '../common'
import {} from 'date-fns'

const ReaderMode = ({ reader, settings }) => {
  const time = reader.reader_session_time
  const isReader = reader.mode === 'reader'
  const isBookChosen = !!settings.book
  const isStarted = reader.current_position !== -1
  const isPlay = !!reader.timeout

  useEffect(() => {
    if (!isStarted) reader.handleReaderSessionStart()
  }, [isStarted])

  if (!isReader || !isBookChosen) return null

  if (!isStarted) return <Button onClick={() => reader.start()}>Start</Button>

  return (
    <div>
      <span style={{ color: 'white' }}>{time}</span>
      {isPlay ? (
        <Button onClick={() => reader.stop()}>Pause</Button>
      ) : (
        <Button onClick={() => reader.play()}>Play</Button>
      )}
    </div>
  )
}

export default ReaderMode
