import { useRef, useState } from 'react'
import store from '../store'
import AuthWrapper from '../components/AuthWrapper'
import { useRouter } from 'next/router'

export default function ForgorPassword() {
  const ref = useRef()
  const [error, setError] = useState('')
  const router = useRouter()
  const code = router.query.code

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    const data = new FormData(ref.current)
    store
      .resetPassword(code, data.get('password'), data.get('confirmPassword'))
      .then(() => {
        router.push('/login')
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
    <AuthWrapper title="Reset Password">
      <form className="card-body" onSubmit={onSubmit} ref={ref}>
        <input
          id="password"
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Your new password"
          required
        />

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="form-control mb-3"
          placeholder="Repeat your new password"
          required
        />

        {error && <p className="text-danger text-center">{error}</p>}

        <button className="btn btn-success d-block ms-auto mt-5" type="submit">
          Reset
        </button>
      </form>
    </AuthWrapper>
  )
}
