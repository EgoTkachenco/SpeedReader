import _ from 'lodash'
import { SettingsStore } from './settings'
import { ReaderStore } from './reader'
import { PresetsStore } from './presets'
import { StatisticStore } from './statistic'
import { makeAutoObservable, autorun, reaction } from 'mobx'
import { BOOKS_API } from '../api'

export class Store {
  books = []
  settings = null
  reader = null
  presets = null
  statistic = null

  constructor(useLocaleStorage = true) {
    makeAutoObservable(this)
    this.loadBooksList()
    this.settings = new SettingsStore(this, useLocaleStorage)
    this.reader = new ReaderStore(this)
    this.presets = new PresetsStore(this)
    this.statistic = new StatisticStore(this)
  }

  async loadBooksList() {
    try {
      this.books = await BOOKS_API.getBooks()
    } catch (err) {
      console.log(err.message)
    }
  }

  message = null
  messageTimeout = null

  addMessage(message, isAutoClose = true) {
    if (this.messageTimeout) clearTimeout(this.messageTimeout)
    this.message = message
    if (message && isAutoClose)
      this.messageTimeout = setTimeout(() => {
        this.clearMessage()
      }, 3000)
  }

  clearMessage() {
    this.message = null
    clearTimeout(this.messageTimeout)
  }

  reset() {
    this.reader.clear()
    this.presets.clear()
    this.presets.exercise = null
    this.settings.reset()
  }
}

const store = new Store()

reaction(
  () => store.settings.settings.book?.id || '',
  (book, prev_page) => {
    console.log('Reaction book')
    const isChanged = book !== prev_page
    if (!isChanged) return

    console.log('Handle reaction book')
    if (book && store.reader.mode !== 'reader') {
      store.reader.start()
    } else {
      store.reader.stop()
      store.reader.clear()
    }
  }
)

reaction(
  () => store.settings.settings.fontType || '',
  (fontType, prev_fontType) => {
    const isChanged = fontType?.key !== prev_fontType?.key
    if (!isChanged) return

    if (fontType) {
      console.log('reaction font')
      store.reader.clearText()
      if (store.reader.current_position !== -1) store.reader.loadText(true)
    }
  }
)

// Reaction for statistic collection
reaction(
  () => !!store.presets.exerciseTimeout,
  (isActive) => {
    if (isActive) {
      console.log('Activate Statistic')
      store.statistic.create()
    } else {
      console.log('Deactivate Statistic')
      store.statistic.destroy()
    }
  }
)

export default store
