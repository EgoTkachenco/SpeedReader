import { makeAutoObservable } from 'mobx'
import { AUTH_API } from './api'
import { getToken, setToken } from './axios'
import { TOKEN_NAME } from './constants'

class Store {
  user = undefined
  constructor() {
    makeAutoObservable(this)
  }

  async signIn(email, password) {
    const res = await AUTH_API.login(email, password)
    setToken(res.access_token)
    await this.loadUser()
  }

  async loadUser() {
    const user = await AUTH_API.getUser()
    this.user = { id: user.id, name: user.name }
  }

  async signUp(name, email, password, confirmPassword) {
    if (password !== confirmPassword) throw new Error('Passwords do not match')

    await AUTH_API.register(name, email, password, confirmPassword)
  }

  async forgotPassword(email) {
    await AUTH_API.forgetPassword(email)
  }

  async resetPassword(code, password, confirmPassword) {
    if (!code) return Promise.reject('Invalid code')
    if (password !== confirmPassword)
      return Promise.reject("Password's do not match")
    await AUTH_API.resetPassword(password, code)
  }

  logout() {
    this.user = null
    localStorage.removeItem(TOKEN_NAME)
  }

  relog() {
    const token = getToken()
    if (token) {
      this.loadUser()
      return true
    } else {
      this.user = null
      return false
    }
  }
}

const store = new Store()

export default store
