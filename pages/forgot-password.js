import { useRef, useState } from 'react'
import store from '../store'
import AuthWrapper from '../components/AuthWrapper'

export default function ForgorPassword() {
  const ref = useRef()
  const [error, setError] = useState('')
  const [isSend, setIsSend] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    const data = new FormData(ref.current)
    store
      .forgotPassword(data.get('email'))
      .then(() => {
        setIsSend(true)
      })
      .catch((err) => {
        let error =
          typeof err === 'string'
            ? err
            : err?.response?.data?.message[0]?.messages[0]?.message
        error = error || 'Error'
        setError(error)
      })
  }

  return (
    <AuthWrapper title="Forget Password">
      {isSend ? (
        <div className="card-body text-center">
          Reset password link send to your email
        </div>
      ) : (
        <form className="card-body" onSubmit={onSubmit} ref={ref}>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control mb-3"
            placeholder="Your email"
            required
          />

          {error && <p className="text-danger text-center">{error}</p>}

          <button
            className="btn btn-success d-block ms-auto mt-5"
            type="submit"
          >
            Reset
          </button>
        </form>
      )}
    </AuthWrapper>
  )
}
