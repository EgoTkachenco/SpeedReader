import { makeAutoObservable, computed } from 'mobx'
import {
  DEFAULT_SETTINGS,
  SETTINGS_LOCALE_STORAGE_KEY,
  SPEED_LEVELS,
} from '../constants'

export class SettingsStore {
  settings = { ...DEFAULT_SETTINGS }
  useLocaleStorage = false

  constructor(useLocaleStorage = true) {
    makeAutoObservable(this, {
      speed: computed,
    })
    this.useLocaleStorage = useLocaleStorage
    if (useLocaleStorage && process.browser) this.loadFromStorage()
  }

  async loadFromStorage() {
    let localeConfig = localStorage.getItem(SETTINGS_LOCALE_STORAGE_KEY)
    if (localeConfig) this.settings = JSON.parse(localeConfig)
    else this.reset()
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
        formatedValue = !!value
        break
      case 'highlightTypeS':
        settings.highlightTypeV = ''
        break
      case 'highlightTypeV':
        settings.highlightTypeS = ''
        break
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
