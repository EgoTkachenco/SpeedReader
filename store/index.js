import axios from 'axios'
import { makeAutoObservable } from 'mobx'
const BLOCK_SIZE = 800
const API_URL = 'https://speed-read-admin.herokuapp.com'
// const API_URL = 'http://localhost:1337'

class Store {
  settings = {
    speed: 10,
    highlightColor: '#afff83',
    textColor: '#000000',
    pageColor: '#ffffff',
    rotate: false,
    zoom: false,
    book: '',
    wordsCount: 1,
  }

  books = []
  bookText = []

  current_text = ''
  current_position = 0
  last_block_position = 0
  last_position = 0
  timeout = null
  isBookEnd = false

  constructor() {
    makeAutoObservable(this)
    // load settings from local storage
    this.initSettings()
    // load books list
    this.loadBooksList()
  }

  initSettings() {
    if (!process.browser) return
    // let localeConfig = localStorage.getItem('speed-reader-config')
    // let settings
    // if (localeConfig) {
    //   settings = JSON.parse(localeConfig)
    //   this.settings = settings
    // }
  }

  async loadBooksList() {
    console.log('load book list')
    try {
      const books = await axios.get(`${API_URL}/books`).then((res) => res.data)
      this.books = books
    } catch (err) {
      console.log(err.message)
    }
  }

  async loadBook() {
    if (!this.settings?.book?.id) return
    const text = await axios.get(
      `${API_URL}/books/${this.settings.book.id}/text`,
      {
        params: {
          _start: this.last_block_position,
          _limit: BLOCK_SIZE,
        },
      }
    )
    this.bookText = [
      ...this.bookText.slice(-BLOCK_SIZE),
      ...text.data.map((text, i) => ({
        text,
        position: this.last_block_position + i,
      })),
    ]
    console.log('Book size is: ', this.bookText.length)
    this.last_block_position += BLOCK_SIZE

    if (this.current_position === 0) {
      console.log('Start animation')
      this.last_position = this.settings.book.size
      this.nextPosition()
    } else {
      console.log(
        'Continue animation, Block ',
        this.last_block_position / BLOCK_SIZE
      )
    }
  }

  updateSettings(key, value) {
    if (!this.settings.hasOwnProperty(key)) return

    let formatedValue = value
    let isTextUpdate = false

    switch (key) {
      case 'wordsCount':
        formatedValue = Number(value)
        break
      case 'speed':
        break
      case 'rotate':
      case 'zoom':
        formatedValue = !this.settings[key]
        break
      case 'highlightColor':
      case 'textColor':
      case 'pageColor':
        break
      case `book`:
        isTextUpdate = true
        this.stopAnimation()
        this.isBookEnd = false
        this.current_position = 0
        this.last_block_position = 0
        this.bookText = []
        formatedValue = value
          ? this.books.find((book) => book.id === Number(value))
          : null
        break
    }
    this.settings = { ...this.settings, [key]: formatedValue }

    if (isTextUpdate) this.loadBook()
  }

  async nextPosition() {
    let text = this.bookText.filter(
      (word) =>
        word.position >= this.current_position &&
        word.position < this.current_position + this.settings.wordsCount
    )
    this.current_text = text.map(({ text }) => text).join(' ')
    this.current_position += this.settings.wordsCount

    // if left less than 100 words, increment last_block_position and load new text
    if (
      this.last_block_position - this.current_position < 100 &&
      this.last_block_position < this.last_position
    ) {
      await this.loadBook()
    }

    // Calculate time for next action
    const timeoutTime = 10000 / this.settings.speed

    if (this.timeout) clearTimeout(this.timeout)
    if (this.current_position !== this.last_position) {
      this.timeout = setTimeout(() => this.nextPosition(), timeoutTime)
    } else {
      this.isBookEnd = true
    }
  }
  stopAnimation() {
    clearTimeout(this.timeout)
    this.timeout = null
  }
}

const store = new Store()

export default store

// localStorage.setItem(
// 	'speed-reader-config',
// 	JSON.stringify({ ...newConfig, animationData: null })
// )
