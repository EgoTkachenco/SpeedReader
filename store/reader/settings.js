import { makeAutoObservable, computed } from 'mobx'
import {
  DEFAULT_SETTINGS,
  SETTINGS_LOCALE_STORAGE_KEY,
  SPEED_LEVELS,
} from '../constants'

export class SettingsStore {
  settings = { ...DEFAULT_SETTINGS }
  useLocaleStorage = false

  constructor(parent, useLocaleStorage = true) {
    makeAutoObservable(this, {
      speed: computed,
    })
    this.parent = parent
    this.useLocaleStorage = useLocaleStorage
    if (useLocaleStorage && process.browser) this.loadFromStorage(true)

    // if (this.settings.book) setTimeout(() => this.parent.reader.start(), 1000)
  }

  async loadFromStorage(initial = false) {
    let localeConfig = localStorage.getItem(SETTINGS_LOCALE_STORAGE_KEY)
    if (localeConfig) {
      const settings = JSON.parse(localeConfig)
      if (initial) {
        settings.book = null
        settings.count = 1
      }
      this.settings = settings
    } else this.reset()
  }

  reset(isUpdateLocalStorage = true) {
    const settings = { ...DEFAULT_SETTINGS }
    if (isUpdateLocalStorage && this.useLocaleStorage)
      localStorage.setItem(
        SETTINGS_LOCALE_STORAGE_KEY,
        JSON.stringify(settings)
      )
    this.settings = settings
  }

  update(key, value, isUpdateLocalStorage = true) {
    if (!this.settings.hasOwnProperty(key)) return

    let formatedValue = value
    let settings = { ...this.settings }
    switch (key) {
      case 'rotate':
        formatedValue = value
        break
      case 'highlightTypeS':
        settings.highlightTypeV = ''
        break
      case 'highlightTypeV':
        settings.highlightTypeS = ''
        break
    }
    if (key === 'book' && isUpdateLocalStorage) {
      this.parent.presets.setExercise(null)
      let localeConfig = localStorage.getItem(SETTINGS_LOCALE_STORAGE_KEY)
      if (localeConfig) settings = JSON.parse(localeConfig)
      settings.count = 1
    }

    this.settings = { ...settings, [key]: formatedValue }

    if (this.useLocaleStorage && isUpdateLocalStorage)
      localStorage.setItem(
        SETTINGS_LOCALE_STORAGE_KEY,
        JSON.stringify(this.settings)
      )
  }

  get speed() {
    return SPEED_LEVELS[parseInt(this.settings.speed)]
  }
}
