const { axios, securedFetchOptions } = require('./axios')

export const AUTH_API = {
  login: (identifier, password) =>
    axios.post('/auth/local', { identifier, password }),

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
  getBooks: () => axios.get('/books', securedFetchOptions()),
  getBookText: (id, params) =>
    axios.get(`/books/${id}/text`, {
      params: params,
      ...securedFetchOptions(),
    }),
}
