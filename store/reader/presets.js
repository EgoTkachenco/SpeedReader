import { makeAutoObservable } from 'mobx'
import { PRESETS } from '../presets'

export class PresetsStore {
  reader = null
  settings = null
  presets = PRESETS // list of presets
  preset = PRESETS[0] // active preset
  exercise = null // active exercise
  exerciseTimeout = null // next action in exercise timeout
  isExerciseFinished = false
  startTimeout = null
  levelStartTime = null
  levelPauseTime = null

  constructor(global) {
    makeAutoObservable(this)
    this.global = global
    this.reader = global.reader
    this.settings = global.settings
  }

  setPreset(preset) {
    this.preset = _.cloneDeep(preset)
  }

  setExercise(exercise) {
    this.exercise = _.cloneDeep(exercise)
    this.start()
  }

  start() {
    this.clear()
    if (this.startTimeout) {
      clearTimeout(this.startTimeout)
    }
    this.reader.stop()
    this.global.addMessage('1')
    this.startTimeout = setTimeout(() => {
      this.global.addMessage('2')
      clearTimeout(this.startTimeout)
      this.setTimeout = setTimeout(() => {
        this.global.addMessage('3')
        clearTimeout(this.startTimeout)
        this.setTimeout = setTimeout(() => {
          this.global.addMessage(null)
          this.reader.play()
          this.next()
        }, 1000)
      }, 1000)
    }, 1000)
  }

  finish() {
    this.isExerciseFinished = true
    this.global.addMessage('Completed. Congratulations!')
    this.settings.loadFromStorage()
  }

  clear() {
    this.isExerciseFinished = false
    clearTimeout(this.exerciseTimeout)
    this.exerciseTimeout = null
  }

  next(isContinue = false, customDuration = null) {
    this.clear()
    const result = this.exercise.data.reduce((acc, el, i) => {
      return acc ? acc : !el.passed ? { el, i } : null
    }, null)
    if (!result) return this.finish()

    const { el: nextAction, i: nextActionIndex } = result
    this.exercise.data[nextActionIndex].passed = true

    for (const key in nextAction.action) {
      this.settings.update(key, nextAction.action[key], false)
    }

    let duration = nextAction.duration
    const now = new Date().getTime()
    if (!isContinue) {
      this.levelStartTime = new Date().getTime()
    } else if (customDuration) {
      const level_passed_time = customDuration
      duration = duration - level_passed_time
      this.levelPauseTime = null
      this.levelStartTime = now - level_passed_time
    } else {
      const level_passed_time = this.levelPauseTime - this.levelStartTime
      duration = duration - level_passed_time
      this.levelPauseTime = null
      this.levelStartTime = now - level_passed_time
    }
    console.log('DURATION: ', duration)
    this.exerciseTimeout = setTimeout(() => this.next(), duration)
  }

  play(customDuration = null) {
    console.log('PLay with:', customDuration)
    if (this.isExerciseFinished) {
      // repass all actions
      this.clear()
      this.exercise.data = this.exercise.data.map((level) => ({
        ...level,
        passed: false,
      }))
    } else {
      // repass last action
      const result = this.exercise.data.reduce((acc, el, i) => {
        return !el.passed ? acc : { el, i }
      }, null)
      const lastIndex = result ? result.i : 0
      this.exercise.data[lastIndex].passed = false
    }
    this.reader.next()
    this.next(true, customDuration)
  }
  pause() {
    this.clear()
    this.reader.stop()
    this.levelPauseTime = new Date().getTime()
  }
}
