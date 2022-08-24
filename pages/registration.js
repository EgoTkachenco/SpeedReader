import { useRef, useState } from 'react'
import store from '../store'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AuthWrapper from '../components/AuthWrapper'

export default function Registration() {
  const ref = useRef()
  const router = useRouter()
  const [error, setError] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    const data = new FormData(ref.current)
    store
      .signUp(
        data.get('email'),
        data.get('email'),
        data.get('password'),
        data.get('confirmPassword')
      )
      .then(() => {
        router.push('/login')
      })
      .catch((err) => {
        setError(
          typeof err === 'string'
            ? err
            : err.response.data.message[0].messages[0].message
        )
      })
  }

  return (
    <AuthWrapper title="Registration">
      <form className="card-body p-4" onSubmit={onSubmit} ref={ref}>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control mb-3"
          placeholder="Your name"
          required
        />

        <input
          type="email"
          className="form-control mb-3"
          id="email"
          name="email"
          placeholder="Your email"
          required
        />

        <input
          id="password"
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Your password"
          required
          minLength={6}
        />

        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="form-control mb-3"
          placeholder="Confirm your password"
          required
          minLength={6}
        />

        {error && <p className="text-danger text-center">{error}</p>}

        <button className="btn btn-success d-block ms-auto mt-5" type="submit">
          Create account
        </button>

        <p className="text-center text-muted mt-5">
          Have already an account? <Link href="/login">Login here</Link>
        </p>
      </form>
    </AuthWrapper>
  )
}
