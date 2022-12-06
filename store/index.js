import { makeAutoObservable } from 'mobx'
import { AUTH_API } from './api'
import {
  eraseToken,
  getToken,
  setToken,
  eraseRefreshToken,
  getRefreshToken,
  setRefreshToken,
} from './axios'
class Store {
  user = { id: 13 }
  // user = null
  isFetch = false
  constructor() {
    makeAutoObservable(this)
  }

  async signIn(email, password) {
    this.isFetch = true
    try {
      const res = await AUTH_API.login(email, password)
      setToken(res.access_token)
      setRefreshToken(res.refresh_token)
      await this.loadUser()
      this.isFetch = false
    } catch (error) {
      this.isFetch = false
      return Promise.reject(error.message)
    }
  }

  async loadUser() {
    try {
      const user = await AUTH_API.getUser()
      this.user = { id: user.id, name: user.name, slug: user.slug }
    } catch (error) {
      if (error.response.status === 401) return await this.refresh()

      this.logout()
    }
  }

  logout() {
    this.user = null
    eraseToken()
    eraseRefreshToken()
    // window.location = '/login'
  }

  relog(token, refresh_token) {
    // auto login with token and refresh_token
    if (token) {
      setToken(token)
      setRefreshToken(refresh_token)
      window.location = '/'
    } else {
      token = getToken()
    }

    if (token) {
      this.loadUser()
      return true
    } else {
      this.user = null
      return false
    }
  }

  async refresh() {
    eraseToken()
    try {
      const refresh_token = getRefreshToken()
      if (!refresh_token) throw new Error('No refresh token')
      const res = await AUTH_API.refresh(refresh_token)
      setToken(res.access_token)
      return await this.loadUser()
    } catch (error) {
      this.logout()
    }
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
}

const store = new Store()

export default store
