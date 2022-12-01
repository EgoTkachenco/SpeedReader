import { makeAutoObservable, computed } from 'mobx'
import { STATISTIC_API } from './api'
import AuthStore from './index'

export default class Statistic_Store {
  limit = 9
  max_statistic_count = 0
  average_speed = 0
  words_count = 0
  statistics = null

  constructor() {
    makeAutoObservable(this, { statistic_params: computed })
    this.initStatistic()
  }

  async initStatistic() {
    try {
      this.max_statistic_count = await STATISTIC_API.getStatisticCount(
        this.statistic_params
      )
      const statistic = await STATISTIC_API.getStatistic({
        ...this.statistic_params,
        _limit: 1,
      })
      this.average_speed = statistic[0].statistic[0].average_speed
      this.words_count = statistic[0].statistic[0].count

      console.log(
        this.max_statistic_count,
        this.average_speed,
        this.words_count
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  async getStatistic(page = 1) {
    let params = {
      ...this.statistic_params,
      _limit: this.limit,
      _start: (page - 1) * this.limit,
    }
    try {
      this.statistics = await STATISTIC_API.getUserStatistic(
        AuthStore.user.id,
        params
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  get statistic_params() {
    return {
      user_id: AuthStore.user.id,
      _sort: 'date:DESC',
    }
  }
}
