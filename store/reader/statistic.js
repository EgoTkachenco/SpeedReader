import { makeAutoObservable } from 'mobx'
import { STATISTIC_API } from '../api'
import GLOBAL_STORE from '../index'
import { format } from 'date-fns'

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

  async send() {
    if (
      this.last_position !== null &&
      this.parent.reader.current_position - this.last_position <= 0
    )
      return

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

    const user_id = GLOBAL_STORE.user?.id?.toString()
    const count = text.length
    let date = format(new Date(), 'yyyy-MM-dd HH:mm')
    date += ':00'
    const book = this.parent.settings.settings.book.id
    const speed = this.parent.settings.settings.speed
    try {
      await STATISTIC_API.send(user_id, count, date, book, speed)
      console.log('Send Statistic. Readed ', count)
    } catch (error) {
      console.log(error.message)
    }
  }
}
