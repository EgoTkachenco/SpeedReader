/* eslint-disable @next/next/no-img-element */
import { Button } from '../common'
import Statistic_Store from '../../store/StatisticStore'
import { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { format } from 'date-fns'
import SpeedAnimation from '../testing/SpeedLottieAnimation'

const Dashboard = observer(() => {
  const [store, setStore] = useState(null)
  useEffect(() => setStore(new Statistic_Store()), [])

  if (!store) return

  const { average_speed, words_count, statistics } = store
  return (
    <div className="dashboard-statistic">
      <PerMinuteReadingStatistic value={words_count} />
      <CurrentSpeedReadingStatistic value={average_speed} />

      <GoalsTable />

      <SpeedTable
        statistics={statistics?.statistic}
        maxPage={Math.ceil(store.max_statistic_count / store.limit)}
        getStatistic={(page) => store.getStatistic(page)}
      />
    </div>
  )
})

const SpeedTable = ({ statistics, maxPage, getStatistic }) => {
  const [page, setPage] = useState(1)

  useEffect(() => {
    getStatistic(page)
  }, [page])

  const changePage = (direction = true) => {
    if (direction) {
      if (page < maxPage) setPage(page + 1)
    } else {
      if (page > 1) setPage(page - 1)
    }
  }
  const pages = getPagesButtons(page, maxPage)
  return (
    <div className="table-card">
      <div className="table-card-header">
        <div className="table-card-header__text">Reading speed statistics</div>
        <Button variant="text">Set standard speed</Button>
      </div>

      <table className="table">
        <tr className="head">
          <th></th>
          <th>Speed</th>
          <th>Book</th>
        </tr>
        {statistics &&
          statistics.map((item, i) => (
            <tr key={i}>
              <td>{format(new Date(item.date), 'yyyy/MM/dd HH:mm')}</td>
              <td>{item.average_speed.toFixed(2)}</td>
              <td>{item.book?.name}</td>
            </tr>
          ))}
      </table>
      <div className="pagination">
        <button className="pagination__btn" onClick={() => changePage(false)}>
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="4.75732"
              y="8.48535"
              width="6"
              height="1.2"
              transform="rotate(-135 4.75732 8.48535)"
              fill="#1893D5"
            />
            <rect
              x="0.514648"
              y="4.24268"
              width="6"
              height="1.2"
              transform="rotate(-45 0.514648 4.24268)"
              fill="#1893D5"
            />
          </svg>
        </button>
        {pages.map((p, i) =>
          p ? (
            <button
              className={`pagination__btn ${i + 1 === page ? 'active' : ''}`}
              key={i}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ) : (
            <p className="pagination__space" key={i}>
              ...
            </p>
          )
        )}
        <button className="pagination__btn" onClick={() => changePage(true)}>
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="6"
              height="1.2"
              transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 4.24268 8.48535)"
              fill="#1893D5"
            />
            <rect
              width="6"
              height="1.2"
              transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 8.48535 4.24268)"
              fill="#1893D5"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

function getPagesButtons(page, max) {
  if (!max) return []
  if (max === 1) return [1]
  if (max === 2) return [1, 2]
  if (max === 3) return [1, 2, 3]
  if (max === 4) return [1, 2, 3, 4]
  if (page === 1) return [1, 2, null, max]
  if (page === 2) return [1, 2, 3, null, max]
  if (page === 3 && max === 5) return [1, 2, 3, 4, max]
  if (page === 3) return [1, 2, 3, 4, null, max]

  if (page > 3 && page < max - 2)
    return [1, null, page - 1, page, page + 1, null, max]

  if (page === max - 2) return [1, null, page - 1, page, page + 1, max]
  if (page === max - 1) return [1, null, page - 1, page, max]
  if (page === max) return [1, null, page - 1, max]
}

const GoalsTable = () => {
  return (
    <div className="table-card">
      <div className="table-card-header">
        <div className="table-card-header__text">Goals</div>
        <Button variant="text">Add new</Button>
      </div>

      <div className="inprogress">Will be soon</div>
    </div>
  )
}

export const PerMinuteReadingStatistic = ({ value }) => {
  return (
    <div className="statistic-card per-minute">
      <div className="statistic-card-content">
        <div className="statistic-card__animation">
          <SpeedAnimation
            speed={(value / 1000).toFixed(2)}
            id="per-minute"
            key="per-minute"
          />
        </div>
        <div className="statistic-card__value">{value}</div>
        <div className="statistic-card__label">
          Word per minute reading speed
        </div>
      </div>
    </div>
  )
}

export const CurrentSpeedReadingStatistic = ({ value }) => {
  return (
    <div className="statistic-card current-speed">
      <div className="statistic-card-content">
        <div className="statistic-card__animation">
          <SpeedAnimation
            speed={value}
            id="current-speed"
            key="current-speed"
          />
        </div>
        <div className="statistic-card__value">{value}</div>
        <div className="statistic-card__label">Current Speed Reading</div>
      </div>
    </div>
  )
}

export default Dashboard
