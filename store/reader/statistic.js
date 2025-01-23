import { makeAutoObservable } from 'mobx'
import { STATISTIC_API } from '../api'
import GLOBAL_STORE from '../index'
import { format } from 'date-fns'
import { SPEED_LEVELS } from '../constants'
import { random } from 'lodash'

export class StatisticStore {
  parent = null
  interval = null
  last_position = null

  constructor(parent) {
    makeAutoObservable(this)
    this.parent = parent
  }

  create() {
    this.last_position = this.parent.reader.current_position
    this.interval = setInterval(() => this.send(), 10000)
  }

  destroy() {
    this.send()
    clearInterval(this.interval)
    this.interval = null
    this.last_position = null
  }

  getSessionStatistic() {
    const speed = this.parent.settings.settings.speed
    if (
      this.last_position !== null &&
      this.parent.reader.current_position - this.last_position <= 0
    )
      return { count: 0, speed }

    let text = []
    for (let i = 0; i < this.parent.reader.text.length; i++) {
      const row = this.parent.reader.text[i]
      if (row.position < this.last_position) continue
      text.push(row)
      if (row.position > this.parent.reader.current_position) {
        this.last_position = this.parent.reader.current_position
        break
      }
    }

    text = text
      .reduce((acc, { text }) => [...acc, ...text.trim().split(' ')], [])
      .filter((word) => !!word)

    const count = text.length

    return { count, speed }
  }

  getExerciseStatistic(exerciseData) {
    const speed = exerciseData[exerciseData.length - 1].action.speed
    const perMinuteCounts = []
    let rowsSum = 0
    let symbolsSum = 0
    let levelSymbolsSum
    let lastRowTime = 1000
    for (let index = 0; index < exerciseData.length; index++) {
      const level = exerciseData[index]
      lastRowTime = level.speed ? SPEED_LEVELS[level.speed] : lastRowTime
      const duration = level.duration
      const row_size = level.action?.fontType?.row
      const rowsCount = Math.floor(duration / lastRowTime)
      rowsSum += rowsCount
      if (row_size) levelSymbolsSum = rowsCount * row_size
      symbolsSum += levelSymbolsSum
      const levelPerMinuteCount = (60000 / lastRowTime) * (4 + random(4, false))
      perMinuteCounts.push(levelPerMinuteCount)
    }
    const perMinuteCount = (
      perMinuteCounts.reduce((acc, el) => acc + el, 0) / perMinuteCounts.length
    ).toFixed(0)
    return { speed, perMinuteCount, rowsSum, symbolsSum }
  }

  async send() {
    const user_id = GLOBAL_STORE.user?.id?.toString()
    let date = format(new Date(), 'yyyy-MM-dd HH:mm')
    date += ':00'
    const book = this.parent.settings.settings.book.id
    const { count, speed } = this.getSessionStatistic()
    if (!book) return
    try {
      await STATISTIC_API.send(user_id, count, date, book, speed)
      console.log('Send Statistic. Readed ', count)
    } catch (error) {
      console.log(error.message)
    }
  }
}
