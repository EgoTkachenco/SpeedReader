import { useRef, useState } from 'react'
import store from '../store'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AuthWrapper from '../components/AuthWrapper'
import { Input, Button } from '../components/common'

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
      <div className="auth-title">Welcome!</div>
      <div className="auth-subtitle">Create new account</div>
      <form className="auth-form" onSubmit={onSubmit} ref={ref}>
        <Input
          id="name"
          name="name"
          type="text"
          className="form-control mb-3"
          placeholder="Your name"
          required
        />

        <Input
          type="email"
          className="form-control mb-3"
          id="email"
          name="email"
          placeholder="Your email"
          required
        />

        <Input
          id="password"
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="Your password"
          required
          minLength={6}
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="form-control mb-3"
          placeholder="Confirm your password"
          required
          minLength={6}
        />

        {error && <p className="text-danger text-center">{error}</p>}

        <Button variant="primary" type="submit">
          Create account
        </Button>

        <div className="auth-caption">
          Have already an account?{' '}
          <Link href="/login">
            <a className="auth-registration">Login here</a>
          </Link>
        </div>
      </form>
    </AuthWrapper>
  )
}
