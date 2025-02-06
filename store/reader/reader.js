import { makeAutoObservable, computed } from 'mobx'
import { BOOKS_API, sendReaderModeStatistic } from '../api'
import { timeDifferenceInMinutesAndSeconds } from '../../utils'
import { COLORS } from '../constants'

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
  mode = null
  reader_session_statistic_timeout = null
  reader_session_statistic = null

  constructor(parent) {
    makeAutoObservable(this, {
      page: computed,
      last_page: computed,
      block_size: computed,
      active_lines_count: computed,
      reader_session_time: computed,
    })
    this.settings = parent.settings
    this.parent = parent
  }

  async loadText(isPlay = true) {
    const book = this.settings.settings.book
    if (!book.id) return

    let _start = this.text.length || 0

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
    console.log(
      `[READER] Load Text: page: ${this.page} _start: ${_start} text total size: ${this.text.length}`
    )

    if (_start === 0) {
      this.isEnd = false
      this.last_position = book.size
      this.triggerNext(isPlay)
    } else if (!this.isEnd && isPlay) {
      // this.triggerNext(isPlay)
    }
  }

  start() {
    console.log(`[READER] Start`)
    this.clear()
    this.loadText().then(() => {
      this.current_position = 0
    })
  }

  play() {
    if (this.parent.presets.exercise && !this.parent.presets.exerciseTimeout)
      return
    console.log(`[READER] Play`)
    this.next()
  }

  stop() {
    console.log(`[READER] Stop`)
    clearTimeout(this.timeout)
    this.timeout = null
  }

  clear() {
    console.log(`[READER] Clear`)
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

  async triggerNext(isPlay) {
    clearTimeout(this.timeout)
    const timeoutTime = this.settings.speed
    this.timeout = setTimeout(() => this.next(isPlay), timeoutTime)
  }

  async next(isPlay = true) {
    try {
      // Calculate time for next action
      clearTimeout(this.timeout)
      const timeoutTime = this.settings.speed

      const { position, text } = this.next_position()
      // console.log(`[READER] Next iteration ${position}`)
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
        if (this.parent.presets.startTime) {
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

  changePage(direction = true) {
    if (direction) this.nextPage()
    else this.prevPage()
  }

  nextPage() {
    if (this.page >= this.last_page - 1) return // перевірка, щоб не вийти за межі останньої сторінки
    const PAGE_SIZE = this.settings.settings.fontType.page
    const next_page = this.page % 2 === 1 ? this.page + 2 : this.page + 1
    const next_page_position = this.text[(next_page - 1) * PAGE_SIZE].position
    console.log(this.page, this.current_position, next_page, next_page_position)
    this.current_position = next_page_position
  }

  prevPage() {
    if (this.page <= 2) return // перевірка, щоб не вийти за межі перших двох сторінок
    const PAGE_SIZE = this.settings.settings.fontType.page
    const prev_page = this.page % 2 === 1 ? this.page - 2 : this.page - 3
    const prev_page_position = this.text[(prev_page - 1) * PAGE_SIZE].position
    console.log(this.page, this.current_position, prev_page, prev_page_position)
    this.current_position = prev_page_position
  }

  openReaderStatistic() {
    this.mode = 'reader-statistics'
  }
  closeReaderStatistic() {
    this.mode = 'reader'
  }

  // MODE: Reader
  // Start "Reader" mode
  onReaderStart() {
    this.mode = 'reader'
    this.parent.presets.finish(false, false)
    this.parent.clearMessage()
    this.clear()
    this.parent.presets.clear()
    this.settings.reset(false)
    this.settings.update('textColor', COLORS.black)
    this.settings.update('pageColor', COLORS.white)
  }

  // Start Reader Session when book is started
  handleReaderSessionStart() {
    this.reader_session_statistic = {
      start_date: Date.now(),
      time_seconds: 0,
      end_date: null,
    }

    this.startReaderStatistic()

    this.start()
  }

  handleReaderSessionPlay() {
    this.play()
    this.startReaderStatistic()
  }

  handleReaderSessionPause() {
    this.stop()
    this.pauseReaderStatistic()
  }

  handleReaderSessionEnd() {
    this.clear()
    this.mode = null
    this.settings.reset()

    this.pauseReaderStatistic()
    this.reader_session_statistic = null
  }

  handleReaderSessionFinish(comprehension = 0, wordsReaded = 0, wpm, user) {
    this.reader_session_statistic.end_date = Date.now()
    const statistic = {
      book: this.settings.settings.book?.id,
      user_id: user ? user.toString() : '',
      date: new Date(),
      words: wordsReaded,
      time: this.reader_session_statistic.time_seconds,
      wpm: wpm,
      comprehension,
    }
    console.log(statistic)

    sendReaderModeStatistic(statistic)
      .then((res) => {
        console.log('Reader statistic sent')
        this.handleReaderSessionEnd()
        this.mode = 'reader-statistics'
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  startReaderStatistic() {
    this.reader_session_statistic_timeout = setInterval(() => {
      this.reader_session_statistic.time_seconds += 1
    }, 1000)
  }

  pauseReaderStatistic() {
    clearInterval(this.reader_session_statistic_timeout)
    this.reader_session_statistic_timeout = null
  }

  resetReaderSettings() {
    this.handleReaderSessionEnd()
    this.mode = 'reader'
    this.settings.reset(false)
    this.settings.update('textColor', COLORS.black)
    this.settings.update('pageColor', COLORS.white)
  }

  get page() {
    const PAGE_SIZE = this.settings.settings.fontType.page
    return Math.ceil(this.current_position / PAGE_SIZE)
  }
  get block_size() {
    const PAGE_SIZE = this.settings.settings.fontType.page
    return PAGE_SIZE * 64
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
  get reader_session_time() {
    if (!this.reader_session_statistic?.time_seconds) return '00:00'

    return timeDifferenceInMinutesAndSeconds(
      this.reader_session_statistic.time_seconds
    )
  }
}
