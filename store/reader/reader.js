import { makeAutoObservable, computed } from 'mobx'
import { BOOKS_API } from '../api'

export class ReaderStore {
  // connected stores
  settings = null
  parent = null
  // texts
  text = []
  current_text = []
  // positions
  current_position = -1
  last_position = 0
  // animation process
  timeout = null
  isFetch = false
  isEnd = false

  constructor(parent) {
    makeAutoObservable(this, {
      page: computed,
      last_page: computed,
      block_size: computed,
      active_lines_count: computed,
    })
    this.settings = parent.settings
    this.parent = parent
  }

  async loadText(isPlay = true) {
    const book = this.settings.settings.book
    if (!book.id) return

    // let _start = page * PAGE_SIZE this.text[this.text.length - 1]?.position || 0
    const PAGE_SIZE = this.settings.settings.fontType.page
    let _start = (this.page > 0 ? this.page - 1 : 0) * PAGE_SIZE || 0

    this.isFetch = true
    const new_text = await BOOKS_API.getBookText(book.id, {
      _start: _start,
      _limit: this.block_size,
      size: this.settings.settings.fontType.row,
    })
    const o_b = this.text
    const n_b = new_text.map((text, i) => ({
      text,
      position: _start + i + 1,
    }))

    this.text = [...o_b, ...n_b]
    this.isFetch = false

    if (_start === 0) {
      this.isEnd = false
      this.last_position = book.size
      this.next(isPlay)
    } else if (!this.isEnd && isPlay) {
      this.next(isPlay)
    }
  }

  start() {
    this.clear()
    this.loadText()
  }
  play() {
    this.next()
  }
  stop() {
    clearTimeout(this.timeout)
    this.timeout = null
  }
  clear() {
    this.stop()
    this.current_position = -1
    this.last_position = 0
    this.text = []
    this.current_text = []
  }

  clearText() {
    this.stop()
    this.current_text = []
    this.text = []
  }

  async next(isPlay = true) {
    try {
      // Calculate time for next action
      clearTimeout(this.timeout)
      const timeoutTime = this.settings.speed

      const { position, text } = this.next_position()
      this.current_text = text
      this.current_position = position

      const is_need_block =
        this.text.filter((line) => line.position >= this.current_position)
          .length <=
        this.block_size / 4

      const is_last_block =
        this.text.length > 0
          ? this.text[this.text.length - 1].position === this.last_position
          : true

      if (is_need_block && !is_last_block && !this.isFetch) this.loadText()

      // if book not end, continue
      if (this.current_position <= this.last_position - 1) {
        if (isPlay) this.timeout = setTimeout(() => this.next(), timeoutTime)
      } else {
        if (this.parent.presets.exerciseTimeout) {
          this.clear()
          this.start()
        } else {
          this.stop()
          this.isEnd = true
        }
      }
    } catch (error) {
      debugger
    }
  }

  next_position() {
    // const wordsCount = 1
    const wordsCount = this.settings.settings.words

    // Skip empty lines for all cases
    let skip_empty_lines = true

    // Skip empty lines in zoom and rolling modes
    // let skip_empty_lines = ['zoom', 'rolling', book].includes(
    //   this.settings.settings.type
    // )

    let result = []
    let position = null
    for (let line of this.text) {
      let skip_line = false

      // check is current line is read to end
      if (wordsCount) skip_line = line.position < this.current_position
      else skip_line = line.position <= this.current_position

      if (skip_line) continue

      position = line.position

      if (wordsCount) {
        const words = line.text.split(' ').filter((w) => !!w)
        const sentence = words.join(' ')
        let current_words =
          this.current_text.length > 0 && this.current_text[0].text.trim()
        let start = sentence.indexOf(current_words)
        if (start >= 0) {
          start += current_words.length
          current_words = sentence.slice(start)
        } else {
          current_words = sentence
        }

        if (!current_words) continue

        current_words = current_words
          .trim()
          .split(' ')
          .slice(0, wordsCount)
          .join(' ')
        return { position, text: [{ position, text: current_words }] }
      }

      if (!skip_empty_lines || line.text.length > 0) result.push(line)

      if (result.length === this.active_lines_count) break
    }

    // need to return new position and text
    return { position, text: result }
  }

  get page() {
    const PAGE_SIZE = this.settings.settings.fontType.page
    return Math.ceil(this.current_position / PAGE_SIZE)
  }
  get block_size() {
    const PAGE_SIZE = this.settings.settings.fontType.page
    return PAGE_SIZE * 16
  }
  get last_page() {
    const PAGE_SIZE = this.settings.settings.fontType.page
    return Math.ceil(this.last_position / PAGE_SIZE)
  }
  get active_lines_count() {
    const settings = this.settings.settings
    let count = Number(settings.highlightTypeS || settings.highlightTypeV)
    return !isNaN(count) ? count : 1
  }
}
