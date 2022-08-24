import { useRef, useState } from 'react'
import store from '../store'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AuthWrapper from '../components/AuthWrapper'

export default function Login() {
  const ref = useRef()
  const router = useRouter()
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    const data = new FormData(ref.current)
    store
      .signIn(data.get('email'), data.get('password'))
      .then(() => {
        router.push('/')
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
    <AuthWrapper title="Login">
      <form className="card-body" onSubmit={onSubmit} ref={ref}>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control mb-3"
          placeholder="Your email"
          required
        />
        <input
          id="password"
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="password"
          required
          minLength={6}
        />
        <Link href="/forgot-password">
          <a className="text-primary text-decoration-none">Forgot password ?</a>
        </Link>
        {error && <p className="text-danger text-center">{error}</p>}

        <button className="btn btn-success d-block ms-auto mt-5" type="submit">
          Submit
        </button>
        <Link href="/registration">
          <a className="text-primary text-decoration-none">Create account</a>
        </Link>
      </form>
    </AuthWrapper>
  )
}
