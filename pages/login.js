import { useRef, useState } from 'react'
import store from '../store'
import { useRouter } from 'next/router'
import Link from 'next/link'
import AuthWrapper from '../components/AuthWrapper'
import { Input, Button } from '../components/common'
import { observer } from 'mobx-react-lite'

const Login = observer(() => {
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
          typeof err === 'string' ? err : err.response.message || 'error'
        )
      })
  }

  return (
    <AuthWrapper title="Login">
      <div className="auth-title">Welcome back!</div>
      <div className="auth-subtitle">
        Sign in with your data that you entered during your registration
      </div>
      <form className="auth-form" onSubmit={onSubmit} ref={ref}>
        <Input
          id="email"
          name="email"
          type="text"
          className="form-control mb-3"
          placeholder="Your email"
          required
          error={error}
        />
        <Input
          id="password"
          type="password"
          name="password"
          className="form-control mb-3"
          placeholder="password"
          required
          minLength={6}
        />
        <Link href="/forgot-password">
          <a className="auth-forgot">Forgot password ?</a>
        </Link>

        <Button variant="primary" type="submit" disabled={store.isFetch}>
          Sign in
        </Button>
        <div className="auth-caption">
          Don’t have an account?{' '}
          <Link href="/registration">
            <a className="auth-registration">Sign up</a>
          </Link>
        </div>
      </form>
    </AuthWrapper>
  )
})

export default Login
