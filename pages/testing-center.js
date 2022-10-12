import Layout from '../components/layout/Layout'
import Dashboard from '../components/testing/Dashboard'
import ScrollTest from '../components/testing/ScrollTest'
import { Store as ReaderStore } from '../store/reader/global'
import { observer } from 'mobx-react-lite'

const store = new ReaderStore(false)

const TestingPage = observer(() => {
  const isActiveTest = store.settings.settings.book?.id
  const startTest = () => {
    console.log(store, store.settings.settings.book)
    store.settings.update('type', 'scroll')
    store.settings.update('book', store.books[0])
    store.reader.start()
  }
  return (
    <Layout title="Testing center">
      {!isActiveTest && <Dashboard startTest={startTest} />}
      {isActiveTest && <ScrollTest store={store} />}
    </Layout>
  )
})

export default TestingPage
