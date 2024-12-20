import { makeAutoObservable, computed } from 'mobx'
// import { PRESETS } from '../presets'
// import PRESETS from '../updated-presets.json'
import EXERCISES from '../EXERCISES.json'

export class PresetsStore {
  reader = null
  settings = null
  exercises = EXERCISES // list of exercises
  exercise = null // active exercise
  exerciseTimeout = null // next action in exercise timeout
  isExerciseFinished = false
  startTimeout = null
  startTime = null
  pauseTime = null

  constructor(global) {
    makeAutoObservable(this, {
      exercise_duration: computed,
    })
    this.global = global
    this.reader = global.reader
    this.settings = global.settings
  }

  // setPreset(preset) {
  //   this.preset = _.cloneDeep(preset)
  //   this.exercise = null
  //   this.clear()
  //   this.finish(false)
  // }

  setExercise(exercise) {
    this.exercise = _.cloneDeep(exercise)
    this.start()
  }

  start() {
    this.reader.clear()
    this.clear()
    this.settings.reset(false)
    this.startTime = null

    if (this.startTimeout) {
      clearTimeout(this.startTimeout)
    }
    this.reader.stop()
    this.global.addMessage('3')
    this.startTimeout = setTimeout(() => {
      this.global.addMessage('2')
      clearTimeout(this.startTimeout)
      this.setTimeout = setTimeout(() => {
        this.global.addMessage('1')
        clearTimeout(this.startTimeout)
        this.setTimeout = setTimeout(() => {
          this.global.addMessage(null)
          this.startTime = new Date().getTime()
          this.next()
        }, 1000)
      }, 1000)
    }, 1000)
  }

  finish(isComplete = true) {
    this.isExerciseFinished = true
    this.startTime = null

    if (isComplete) {
      const { perMinuteCount, speed } =
        this.global.statistic.getExerciseStatistic(this.exercise.data)
      this.global.addMessage(
        `exercise-statistic:${perMinuteCount}:${speed}`,
        false
      )
    }
    this.reader.clear()
    this.settings.loadFromStorage()
    clearTimeout(this.exerciseTimeout)
    this.exerciseTimeout = null
  }

  clear() {
    this.isExerciseFinished = false
    clearTimeout(this.exerciseTimeout)
    this.exerciseTimeout = null
  }

  next(customDuration = null) {
    this.clear()
    const result = this.exercise.data.reduce((acc, el, i) => {
      return acc ? acc : !el.passed ? { el, i } : null
    }, null)
    if (!result) return this.finish()

    const { el: nextAction, i: nextActionIndex } = result

    for (const key in nextAction.action) {
      if (key === 'book') {
        const book = this.global.books.find(
          (book) => book.id == nextAction.action[key]
        )
        this.settings.update(key, book || this.global.books[0], false)
      } else {
        this.settings.update(key, nextAction.action[key], false)
      }
    }

    let duration = customDuration || nextAction.duration

    this.exerciseTimeout = setTimeout(() => this.next(), duration)
  }

  play(exercise_time) {
    // 1. repass levels
    // 2. calculate current level duration
    // 3. call next with custom level duration
    const levels = this.exercise.data
    let duration_sum = 0
    let exercise_passed_time = this.isExerciseFinished
      ? 0
      : this.pauseTime - this.startTime
    if (!exercise_time) exercise_time = exercise_passed_time || 0
    let customDuration = 0
    for (let i = 0; i < levels.length; i++) {
      const level = levels[i]
      duration_sum = duration_sum + (level.duration || 0)
      if (!customDuration && exercise_time < duration_sum) {
        customDuration = duration_sum - exercise_time
      }
      if (this.isExerciseFinished || exercise_time < duration_sum) {
        this.exercise.data[i].passed = false
      }
      if (exercise_time > duration_sum) {
        this.exercise.data[i].passed = true
      }
    }

    const now = new Date().getTime()
    this.startTime = now - exercise_time
    this.pauseTime = null

    this.reader.next()
    if (this.isExerciseFinished) return this.start()
    this.next(customDuration)
  }

  pause() {
    this.clear()
    this.reader.stop()
    this.pauseTime = new Date().getTime()
  }

  // All exercise time
  get exercise_duration() {
    if (!this.exercise) return 0
    return this.exercise.data.reduce(
      (acc, { duration }) => (acc += duration || 0),
      0
    )
  }
}
