import { makeAutoObservable, action, computed } from 'mobx'
import { BOOKS_API } from './api'
import {
  BLOCK_SIZE,
  COLORS,
  SETTINGS_LOCALE_STORAGE_KEY,
  SIZES,
} from './constants'
import { PRESETS } from './presets'

const DEFAULT_SETTINGS = {
  speed: 1,
  highlightColor: COLORS.violet,
  textColor: COLORS.white,
  pageColor: COLORS.gray,
  rotate: false,
  highlightTypeS: '',
  highlightTypeV: '1',
  count: 1,
  type: 'book',
  fontType: SIZES['small'],
  book: '',
}

class Store {
  inited = false
  settings = { ...DEFAULT_SETTINGS }

  books = [] // books list
  all_text = []
  current_pages = []
  isBookFetching = false

  current_text = '' // text that user currently reading
  current_position = 0 // position of text that user is currently reading
  last_block_position = 0 // position of last element in block
  last_position = 0 // position of last element in book
  timeout = null // timeout of next animation action
  isBookEnd = false // is user end reading book

  constructor() {
    makeAutoObservable(this, {
      changePages: action,
      page: computed,
      maxPage: computed,
    })
    // load books list
    this.loadBooksList()
  }

  async initSettings() {
    if (this.inited) return
    let localeConfig = localStorage.getItem(SETTINGS_LOCALE_STORAGE_KEY)
    let settings
    this.inited = true
    if (localeConfig) {
      settings = JSON.parse(localeConfig)
      this.settings = settings
      if (this.settings.book) await this.loadBook()
    } else {
      this.resetConfig()
    }
  }

  async loadBooksList() {
    try {
      const books = await BOOKS_API.getBooks()
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
    const text = await BOOKS_API.getBookText(this.settings.book.id, {
      _start: this.last_block_position,
      _limit: BLOCK_SIZE,
    })
    this.all_text = [
      ...this.all_text.slice(-1 * BLOCK_SIZE),
      ...text.split('').map((text, i) => ({
        text,
        position: this.last_block_position + i,
      })),
    ]

    this.last_block_position += BLOCK_SIZE

    if (this.current_position === 0) this.startAnimation()

    this.isBookFetching = false
  }

  updateSettings(key, value, isUpdateLocalStorage = true) {
    if (!this.settings.hasOwnProperty(key)) return

    let formatedValue = value
    let isTextUpdate = false
    let settings = { ...this.settings }
    switch (key) {
      // case 'wordsCount':
      //   formatedValue = Number(value)
      //   break
      case 'speed':
        break
      case 'rotate':
        // case 'zoom':
        formatedValue = !!value
        break
      case 'book':
        isTextUpdate = true
        this.clearAnimation()
        formatedValue = value
          ? this.books.find((book) => book.id === Number(value))
          : null
        break
      case 'highlightTypeS':
        settings.highlightTypeV = ''
        break
      case 'highlightTypeV':
        settings.highlightTypeS = ''
        break
      // case 'highlightColor':
      // case 'textColor':
      // case 'pageColor':
      //   break
    }
    this.settings = { ...settings, [key]: formatedValue }

    if (key === 'fontType') this.current_pages = this.getCurrentPages()

    if (isTextUpdate) this.loadBook()

    if (isUpdateLocalStorage)
      localStorage.setItem(
        SETTINGS_LOCALE_STORAGE_KEY,
        JSON.stringify(this.settings)
      )
  }

  async nextPosition() {
    // Calculate time for next action
    clearTimeout(this.timeout)
    const timeoutTime = 1000 / this.settings.speed

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
    if (is_need_page && this.current_position <= this.last_position - 1) {
      this.current_pages = this.getCurrentPages()
      if (this.current_position === 0 || this.settings.type !== 'book')
        this.timeout = setTimeout(() => this.nextPosition(), 100)
      return
    }

    const { next_position, next_text } = this.getNextPosition()

    this.current_text = next_text
    this.current_position = next_position

    const { page: PAGE_SIZE, row: ROW_SIZE } = this.settings.fontType

    // if left less than 2 pages, increment last_block_position and load new text
    if (
      !this.isBookFetching &&
      this.last_block_position - this.current_position <
        2 * PAGE_SIZE * ROW_SIZE &&
      this.last_block_position < this.last_position
    ) {
      this.loadBook()
    }
    // if book not end, continue
    if (this.current_position !== this.last_position - 1) {
      this.timeout = setTimeout(() => this.nextPosition(), timeoutTime)
    } else {
      this.isBookEnd = true
    }
  }

  getNextPosition() {
    const rows = this.current_pages.reduce(
      (acc, page) => [...acc, ...page.reduce((acc, row) => [...acc, row], [])],
      []
    )
    let words_index = 0
    let row_index = 0
    let curr_index
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]

      curr_index = row.reduce((res, word, i) => {
        return res !== null
          ? res
          : this.current_position === word.position
          ? i
          : null
      }, null)

      if (curr_index !== null) {
        curr_index = words_index + curr_index
        row_index = i + 1
        break
      } else {
        words_index += row.length
      }
    }

    const rowsPerLine = this.getRowsPerLine()
    const next_rows = rows.splice(row_index, rowsPerLine)
    const last_row = next_rows[next_rows.length - 1]
    const next_position = last_row[last_row.length - 1].position

    return { next_position, next_text: next_rows }
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
    this.current_pages = []
    this.all_text = []
  }

  resetAnimation() {
    const timeoutTime = 1000 / this.settings.speed
    this.timeout = setTimeout(() => this.nextPosition(), timeoutTime)
  }

  getCurrentPages() {
    const text = this.all_text
    const { page: PAGE_SIZE, row: ROW_SIZE } = this.settings.fontType
    let pages = []
    let page = []
    let row = []
    let word = ''

    const isLowerCaseLetter = (char) => char === char.toLowerCase()
    const getRowSize = (str) =>
      Math.round(
        str
          .split('')
          .reduce((acc, char) => acc + (isLowerCaseLetter(char) ? 1 : 1.25), 0)
      )
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
        getRowSize(
          row
            .map((word) => word.text)
            .join(' ')
            .concat(` ${word}`)
        ) > ROW_SIZE
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

  getRowsPerLine() {
    let count
    if (this.settings.highlightTypeS) count = this.settings.highlightTypeS
    if (this.settings.highlightTypeV) count = this.settings.highlightTypeV

    return isNaN(Number(count)) ? 1 : Number(count)
  }

  resetConfig() {
    const settings = { ...DEFAULT_SETTINGS }
    localStorage.setItem(SETTINGS_LOCALE_STORAGE_KEY, JSON.stringify(settings))
    this.settings = settings
  }

  get page() {
    const { page: PAGE_SIZE, row: ROW_SIZE } = this.settings.fontType
    return Math.ceil(this.current_position / (PAGE_SIZE * ROW_SIZE))
  }
  get maxPage() {
    const { page: PAGE_SIZE, row: ROW_SIZE } = this.settings.fontType
    return this.last_position
      ? Math.ceil(this.last_position / (PAGE_SIZE * ROW_SIZE))
      : 0
  }

  presets = PRESETS // list of presets
  preset = PRESETS[0] // active preset
  exercise = null // active exercise
  exerciseTimeout = null // next action in exercise timeout
  exerciseProgress = null // exercise current ation

  setPreset(preset) {
    this.preset = { ...preset }
  }
  setExercise(exercise) {
    this.exercise = { ...exercise }
    this.nextExerciseAction()
  }
  nextExerciseAction() {
    this.clearExercise()
    const result = this.exercise.data.reduce((acc, el, i) => {
      return acc ? acc : !el.passed ? { el, i } : null
    }, null)
    if (!result) return this.endExercise()

    const { el: nextAction, i: nextActionIndex } = result
    this.exerciseProgress = nextActionIndex
    this.exercise.data[nextActionIndex].passed = true

    for (const key in nextAction.action) {
      this.updateSettings(key, nextAction.action[key], false)
    }

    this.exerciseTimeout = setTimeout(
      () => this.nextExerciseAction(),
      nextAction.duration
    )
  }
  endExercise() {
    this.exercise = null
    this.exerciseProgress = null

    let localeConfig = localStorage.getItem(SETTINGS_LOCALE_STORAGE_KEY)
    let settings
    if (localeConfig) {
      settings = JSON.parse(localeConfig)
      this.settings = settings
    }
  }
  clearExercise() {
    clearTimeout(this.exerciseTimeout)
    this.exerciseTimeout = null
  }
}

const store = new Store()

export default store
