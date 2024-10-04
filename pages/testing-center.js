import { useState } from 'react'
import Layout from '../components/layout/Layout'
import Dashboard from '../components/testing/Dashboard'
import QuizTest from '../components/testing/QuizTest'
import { Store as ReaderStore } from '../store/reader/global'
import GlobalStore from '../store'
import { observer } from 'mobx-react-lite'
import { submitQuiz } from '../store/api'

const store = new ReaderStore(false)

const TestingPage = observer(() => {
  const [activeTest, setActiveTest] = useState(null)
  // const isActiveTest = store.settings.settings.book?.id
  const startTest = (exercise) => {
    setActiveTest(exercise)
  }
  const onQuizSubmit = (data) => {
    data.user_id = GlobalStore.user.id.toString()
    submitQuiz(activeTest, data)
    setActiveTest(null)
  }
  return (
    <Layout title="Testing center">
      {!activeTest && (
        <Dashboard startTest={startTest} user={GlobalStore.user.id} />
      )}
      {activeTest && (
        <QuizTest
          settings={store.settings.settings}
          onSettingsChange={(key, value) => store.settings.update(key, value)}
          exercise={activeTest}
          onClose={() => setActiveTest(null)}
          onSubmit={onQuizSubmit}
        />
      )}
    </Layout>
  )
})

export default TestingPage
