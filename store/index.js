import axios from 'axios'
import { makeAutoObservable, action } from 'mobx'

const SETTINGS_LOCALE_STORAGE_KEY = 'sra_conf'
const ANIMATION_TIME = 900
const BLOCK_SIZE = 4800
const PAGE_SIZE = 24
let ROW_SIZE = 30
const API_URL = 'https://speed-read-admin.herokuapp.com'
// const API_URL = 'http://localhost:1337'

class Store {
  inited = false
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

  books = [] // books list
  all_text = []
  current_pages = []
  old_pages = []
  isBookFetching = false

  current_text = '' // text that user currently reading
  current_position = 0 // position of text that user is currently reading
  last_block_position = 0 // position of last element in block
  last_position = 0 // position of last element in book
  timeout = null // timeout of next animation action
  isBookEnd = false // is user end reading book

  constructor() {
    makeAutoObservable(this, { changePages: action })
    // load books list
    this.loadBooksList()
  }

  async initReader() {
    // const reader = document.getElementById('reader-view')
    // book width divided by 2 minus padding divide by average symbol width
    let wordsCount = (900 / 2 - 64) / 8.5
    wordsCount = Math.floor(wordsCount)
    ROW_SIZE = wordsCount
    console.log('Row size', ROW_SIZE)
    // load settings from local storage
    this.initSettings()
    this.inited = true
  }

  initSettings() {
    if (!process.browser) return
    let localeConfig = localStorage.getItem(SETTINGS_LOCALE_STORAGE_KEY)
    let settings
    if (localeConfig) {
      settings = JSON.parse(localeConfig)
      this.settings = { ...settings, book: '' }
      // if (this.settings.book) this.loadBook()
    }
  }

  async loadBooksList() {
    try {
      const books = await axios.get(`${API_URL}/books`).then((res) => res.data)
      this.books = books
    } catch (err) {
      console.log(err.message)
    }
  }

  async loadBook() {
    // Book id required
    if (!this.settings?.book?.id) return

    this.isBookFetching = true
    // load text
    const res = await axios.get(
      `${API_URL}/books/${this.settings.book.id}/text`,
      {
        params: {
          _start: this.last_block_position,
          _limit: BLOCK_SIZE,
        },
      }
    )
    this.all_text = [
      ...this.all_text,
      ...res.data.split('').map((text, i) => ({
        text,
        position: this.last_block_position + i,
      })),
    ]

    this.last_block_position += BLOCK_SIZE

    if (this.current_position === 0) this.startAnimation()

    this.isBookFetching = false
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
        this.clearAnimation()
        formatedValue = value
          ? this.books.find((book) => book.id === Number(value))
          : null
        break
    }
    this.settings = { ...this.settings, [key]: formatedValue }

    if (isTextUpdate) this.loadBook()

    localStorage.setItem(
      SETTINGS_LOCALE_STORAGE_KEY,
      JSON.stringify(this.settings)
    )
  }

  async nextPosition() {
    // Calculate time for next action
    clearTimeout(this.timeout)
    const timeoutTime = 10000 / this.settings.speed

    const words = this.current_pages.reduce(
      (acc, page) => [
        ...acc,
        ...page.reduce((acc, row) => [...acc, ...row], []),
      ],
      []
    )
    const is_need_page =
      (words[words.length - 1]?.position || 0) <= this.current_position

    // call next action with new pages
    if (is_need_page) {
      this.changePages()
      this.timeout = setTimeout(
        () => this.nextPosition(),
        this.settings.zoom || this.current_position !== 0
          ? timeoutTime
          : ANIMATION_TIME
      )
      return
    }

    let curr_index = words.reduce((res, word, i) => {
      return res !== null
        ? res
        : this.current_position === word.position
        ? i
        : null
    }, null)

    this.current_text = words
      .splice(curr_index, this.settings.wordsCount)
      .map(({ text }) => text)
      .join(' ')

    this.current_position =
      curr_index + this.settings.wordsCount >= words.length
        ? words[words.length - 1].position
        : words[curr_index + this.settings.wordsCount].position

    // if left less than 2 pages, increment last_block_position and load new text
    if (
      !this.isBookFetching &&
      this.last_block_position - this.current_position <
        2 * PAGE_SIZE * ROW_SIZE &&
      this.last_block_position < this.last_position
    ) {
      this.loadBook()
    }

    if (this.current_position !== this.last_position) {
      this.timeout = setTimeout(() => this.nextPosition(), timeoutTime)
    } else {
      this.isBookEnd = true
    }
  }

  startAnimation() {
    // this.clearAnimation()
    this.last_position = this.settings.book?.size || 0
    this.nextPosition()
  }
  stopAnimation() {
    clearTimeout(this.timeout)
    this.timeout = null
  }
  clearAnimation() {
    this.stopAnimation()
    this.isBookEnd = false
    this.current_position = 0
    this.last_block_position = 0
    this.all_text = []
    this.old_pages = []
    this.current_pages = []
  }

  getCurrentPages() {
    const text = this.all_text

    let pages = []
    let page = []
    let row = []
    let word = ''
    const addRow = () => {
      if (page.length === PAGE_SIZE) {
        pages.push(page)
        page = []
      }
      page.push(row)
      row = []
    }
    const addWord = (position) => {
      if (
        row.map((word) => word.text).join(' ').length + word.length >
        ROW_SIZE
      ) {
        addRow()
      }
      row.push({ text: word, position })
      word = ''
    }
    for (let i = 0; i < text.length; i++) {
      let char = text[i]
      switch (char.text) {
        case '\n':
          addWord(char.position)
          addRow()
          break
        case ' ':
          addWord(char.position)
          break
        default:
          word += char.text
      }

      if (pages.length === 2) {
        this.all_text = this.all_text.slice(i)
        return pages.splice(0, 2)
      }
    }
    addWord(text[text.length - 1].position)
    addRow()
    pages.push(page)

    this.all_text = ''
    return pages.splice(0, 2)
  }

  changePages() {
    this.old_pages = [...this.current_pages]
    this.current_pages = this.getCurrentPages()
  }
}

const store = new Store()

export default store
