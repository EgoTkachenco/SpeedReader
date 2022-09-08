import { useRef, useState } from 'react'
import store from '../store'
import AuthWrapper from '../components/AuthWrapper'
import { useRouter } from 'next/router'
import { Input, Button } from '../components/common'

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
      <div className="auth-title">Reset Password</div>
      <div className="auth-subtitle">Enter your new password</div>
      <form className="auth-form" onSubmit={onSubmit} ref={ref}>
        <Input
          id="password"
          name="password"
          type="password"
          className="form-control mb-3"
          placeholder="Your new password"
          required
          error={error}
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          className="form-control mb-3"
          placeholder="Repeat your new password"
          required
        />

        <Button variant="primary" type="submit">
          Reset
        </Button>
      </form>
    </AuthWrapper>
  )
}
