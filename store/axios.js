import Axios from 'axios'
import { TOKEN_NAME, REFRESH_TOKEN_NAME, USER_STORE_NAME } from './constants'

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interseptor to check server response time
axios.interceptors.request.use(
  function (config) {
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  function (response) {
    if ([200, 201].includes(response.status)) {
      return response.data
    } else {
      return Promise.reject(response)
    }
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem(USER_STORE_NAME)
        // window.location.pathname = '/login'
      }

      if (error.response.status === 500) {
        // window.location.pathname = '/error-500'
      }
    }
    return Promise.reject(error)
  }
)

function setToken(token) {
  document.cookie =
    TOKEN_NAME +
    '=' +
    (token || '') +
    `; expires=${new Date(
      new Date().getTime() + 24 * 1000 * 60 * 60
    ).toUTCString()}`
}
function getToken() {
  var nameEQ = TOKEN_NAME + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function eraseToken() {
  document.cookie = `${TOKEN_NAME}=; Max-Age=0`
}

let securedFetchOptions = () => {
  return {
    headers: {
      Authorization: 'Bearer ' + getToken(),
    },
  }
}

function setRefreshToken(token) {
  document.cookie =
    REFRESH_TOKEN_NAME +
    '=' +
    (token || '') +
    `; expires=${new Date(
      new Date().getTime() + 24 * 1000 * 60 * 60
    ).toUTCString()}`
}

function getRefreshToken() {
  var nameEQ = REFRESH_TOKEN_NAME + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function eraseRefreshToken() {
  document.cookie = `${REFRESH_TOKEN_NAME}=; Max-Age=0`
}

export {
  axios,
  getToken,
  setToken,
  eraseToken,
  securedFetchOptions,
  TOKEN_NAME,
  USER_STORE_NAME,
  REFRESH_TOKEN_NAME,
  setRefreshToken,
  getRefreshToken,
  eraseRefreshToken,
}
