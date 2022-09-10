import Layout from '../components/layout/Layout'
import BooksList from '../components/training/BooksList'
import ReaderSettings from '../components/training/ReaderSettings'
import Reader from '../components/training/Reader'

const TrainingPage = () => {
  return (
    <Layout title="Training center">
      <div className="training">
        <ReaderSettings />
        <div className="training-right">
          <BooksList />
          <Reader />
        </div>
      </div>
    </Layout>
  )
}

export default TrainingPage
