import { useEffect, useState } from 'react'
import Settings from './Settings'
import { getTestingExercise } from '../../store/api'
import Button from '../common/Button'
import Checkbox from '../common/Checkbox'

const QuizTest = ({
  settings,
  onSettingsChange,
  exercise,
  onClose,
  onSubmit,
}) => {
  const [data, setData] = useState()
  const [isReading, setIsReading] = useState(false)
  const [startDate, setStartDate] = useState(null)
  const [readingTime, setReadingTime] = useState(null)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    if (!exercise) return
    getTestingExercise(exercise)
      .then((data) => {
        setData(data)
        setIsReading(true)
        setStartDate(new Date())
      })

      .catch((error) => console.log(error.message))
  }, [exercise])

  useEffect(() => {
    if (!isReading) return

    const interval = setInterval(() => setTimer(getTimeDiff(startDate)), 1000)

    return () => interval && clearInterval(interval)
  }, [isReading])

  const onReadingFinish = () => {
    setIsReading(false)
    setReadingTime(new Date().getTime() - new Date(startDate).getTime())
  }

  const handleSubmit = (answers) => {
    onSubmit({ answers, reading_time: readingTime })
  }

  if (!data) return

  return (
    <div className="training">
      <Settings
        settings={settings}
        onChange={onSettingsChange}
        onClose={onClose}
      />

      <div className="training-right">
        {isReading ? (
          <ReadingBlock
            text={data?.book}
            settings={settings}
            onReadingFinish={onReadingFinish}
            timer={timer}
          />
        ) : (
          <QuizBlock questions={data.questions} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  )
}

export default QuizTest

const ReadingBlock = ({ settings, onReadingFinish, text, timer }) => {
  return (
    <div
      className="scroll-reader"
      style={{
        padding: '48px 32px 16px',
        backgroundColor: settings.pageColor,
        color: settings.textColor,
        fontSize: settings.fontType.fontSize,
        transform: `${settings.rotate ? 'rotate(180deg)' : ''}`,
      }}
    >
      <div className="training__timer">{timer}</div>
      <div
        className="scroll-reader-content"
        style={{ overflow: 'auto', width: '100%' }}
      >
        <div style={{ maxWidth: '450px', margin: 'auto' }}>
          <pre style={{ marginBottom: '16px' }}>{text}</pre>

          <Button onClick={onReadingFinish}>Start Quiz</Button>
        </div>
      </div>
    </div>
  )
}
const QuizBlock = ({ questions = [], onSubmit }) => {
  const [answers, setAnswers] = useState([])
  useEffect(() => {
    setAnswers(new Array(questions.length).fill(null))
  }, [questions])
  const onAnswer = (question, variant) => {
    const newAnswers = [...answers]
    newAnswers[question] = variant
    setAnswers(newAnswers)
  }
  return (
    <div
      className="scroll-reader"
      style={{
        padding: '48px 32px 16px',
      }}
    >
      <div
        className="scroll-reader-content"
        style={{ overflow: 'auto', width: '100%' }}
      >
        <div className="quiz" style={{ maxWidth: '450px', margin: 'auto' }}>
          {questions.map((block, i) => (
            <div className="quiz-container" key={i}>
              <div className="quiz__question">
                {i + 1}. {block.question}
              </div>
              {block.variants.map((variant, j) => (
                <Checkbox
                  key={j}
                  label={variant.text}
                  value={answers[i] === variant.id}
                  onChange={(value) => onAnswer(i, value ? variant.id : null)}
                />
              ))}
            </div>
          ))}

          <Button onClick={() => onSubmit(answers)}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

const getTimeDiff = (date) => {
  const now = new Date()
  const diff = Math.max(now - new Date(date), 0) // Difference in milliseconds

  const minutes = Math.floor(diff / 60000) // 60000 ms in a minute
  const seconds = Math.floor((diff % 60000) / 1000) // Calculate remaining seconds

  // Format time to always show two digits for minutes and seconds
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return `${formattedMinutes}:${formattedSeconds}`
}
