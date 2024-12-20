import { Button } from '../common'

const ReaderModeFinish = ({ reader, settings }) => {
  const wordsReaded = reader.text
    .filter((line) => line.position <= reader.current_position)
    .map((line) => line.text)
    .join(' ')
    .split(' ')
    .filter((el) => !!el).length
  const time = reader.reader_session_time

  const milliseconds =
    new Date().getTime() - new Date(reader.reader_session_start_time).getTime()
  const minutes = (milliseconds / 1000 / 60).toFixed(2)
  const wpm = (wordsReaded / Number(minutes)).toFixed(2)

  return (
    <div className="message-box reader-mode-finish">
      <div>
        <div>Summary</div>
        <p>Words readed: {wordsReaded}</p>
        <p>Time: {time}</p>
        <p>WPM: {wpm}</p>
      </div>
      <div>
        <div>Comprehension</div>
        <p>Select your comprehension level</p>
        <div className="reader-mode-finish__comprehension">
          {new Array(10).fill(null).map((_, i) => (
            <Button
              key={i}
              onClick={() => reader.handleReaderSessionEnd(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReaderModeFinish
