import { makeAutoObservable } from 'mobx'
import { AUTH_API } from './api'
import { setToken } from './axios'
import { TOKEN_NAME, USER_STORE_NAME } from './constants'

class Store {
  user = undefined
  constructor() {
    makeAutoObservable(this)
  }

  async signIn(email, password) {
    const { jwt, user } = await AUTH_API.login(email, password)
    this.user = user
    setToken(jwt)
    localStorage.setItem(USER_STORE_NAME, JSON.stringify(user))
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
    localStorage.removeItem(USER_STORE_NAME)
  }

  relog() {
    const user = localStorage.getItem(USER_STORE_NAME)
    if (user) {
      this.user = JSON.parse(user)
    } else {
      this.user = null
    }

    console.log('relog', user)
    return !!this.user
  }
}

const store = new Store()

export default store
