const { axios, securedFetchOptions } = require('./axios')

export const AUTH_API = {
  // login: (identifier, password) =>
  // 	axios.post('/auth/local', { identifier, password }),
  login: (identifier, password) =>
    axios.post('https://readinggenius.com/wp-json/api-bearer-auth/v1/login', {
      username: identifier,
      password,
    }),

  refresh: (token) =>
    axios.post(
      'https://readinggenius.com/wp-json/api-bearer-auth/v1/tokens/refresh',
      { token }
    ),

  getUser: () =>
    axios.get(
      'https://readinggenius.com/wp-json/wp/v2/users/me',
      securedFetchOptions()
    ),

  register: (name, email, password) =>
    axios.post('/auth/local/register', {
      name,
      username: email,
      email,
      password,
    }),

  forgetPassword: (email) => axios.post('/auth/forgot-password', { email }),
  resetPassword: (password, code) =>
    axios.post('/auth/reset-password', {
      code: code,
      password: password,
      passwordConfirmation: password,
    }),
}

export const BOOKS_API = {
  getBooks: () => axios.get('/books'),
  getBookText: (id, params) =>
    axios.get(`/books/${id}/text`, {
      params: params,
    }),
}

export const STATISTIC_API = {
  send: (user_id, count, date) =>
    axios.post('/statistics', { user_id, count, date }),
}
