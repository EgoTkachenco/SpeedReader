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
  send: (user_id, count, date, book, speed) =>
    axios.post('/statistics', { user_id, count, date, book, speed }),

  getStatistic: (params) => axios.get('/statistics', { params }),
  getUserStatistic: (user_id, params) =>
    axios.get(`/statistics/${user_id}`, { params }),

  getStatisticCount: (params) => axios.get('/statistics/count', { params }),
}

export const COMMENT_API = {
  getComments: (exerciseId) =>
    axios.get(`/comments/`, {
      params: { exerciseId, _limit: -1 },
    }),

  createComment: (data) => axios.post(`/comments`, data),
}

export const getTestingExercises = () => axios.get('/testing-exercises')

export const getTestingExercise = (id) => axios.get('/testing-exercises/' + id)

export const getTestingResults = (user) =>
  axios.get(`/testing-results?user_id=${user}`)

export const submitQuiz = (id, data) =>
  axios.post(`/testing-exercises/${id}/submit`, data)

export const getStatistics = (user) =>
  axios.get(`/testing-results/statistics?user_id=${user}`)

export const sendReaderModeStatistic = (statistic) =>
  axios.post('/reader-statistics', statistic)

export const getReaderModeStatistic = (user) =>
  axios.get('/reader-statistics', { query: { user_id: user } })
