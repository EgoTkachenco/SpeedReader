import _ from 'lodash'
import { SettingsStore } from './settings'
import { ReaderStore } from './reader'
import { PresetsStore } from './presets'
import { makeAutoObservable, autorun, reaction } from 'mobx'
import { BOOKS_API } from '../api'

export class Store {
  books = []

  constructor(useLocaleStorage = true) {
    makeAutoObservable(this)
    this.loadBooksList()
    this.settings = new SettingsStore(useLocaleStorage)
    this.reader = new ReaderStore(this.settings)
    this.presets = new PresetsStore(this)
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

  addMessage(message) {
    if (this.messageTimeout) clearTimeout(this.messageTimeout)
    this.message = message
    if (!message)
      this.messageTimeout = setTimeout(() => {
        this.message = null
      }, 3000)
  }
}

const store = new Store()

reaction(
  () => store.settings.settings.book?.id || '',
  (book) => {
    console.log('reaction', store.settings.settings.book)
    if (book) store.reader.start()
  }
)

export default store