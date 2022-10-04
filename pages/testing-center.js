import Layout from '../components/layout/Layout'
import Dashboard from '../components/testing/Dashboard'
import ScrollTest from '../components/testing/ScrollTest'
import { Store as ReaderStore } from '../store/reader'
import { observer } from 'mobx-react-lite'

const store = new ReaderStore(false)

const TestingPage = observer(() => {
  const isActiveTest = store.settings.book?.id
  const startTest = () => {
    store.updateSettings('type', 'scroll')
    store.updateSettings('book', store.books[1].id)
  }
  return (
    <Layout title="Testing center">
      {!isActiveTest && <Dashboard startTest={startTest} />}
      {isActiveTest && <ScrollTest store={store} />}
    </Layout>
  )
})

export default TestingPage
