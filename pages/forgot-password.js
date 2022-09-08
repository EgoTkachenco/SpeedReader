import { useRef, useState } from 'react'
import store from '../store'
import AuthWrapper from '../components/AuthWrapper'
import { Input, Button } from '../components/common'

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
      <div className="auth-title">Forgot password</div>
      {isSend ? (
        <div className="auth-subtitle">
          Reset password link send to your email
        </div>
      ) : (
        <>
          <div className="auth-subtitle">
            Enter email you provide during registration
          </div>
          <form className="auth-form" onSubmit={onSubmit} ref={ref}>
            <Input
              id="email"
              name="email"
              type="email"
              className="form-control mb-3"
              placeholder="Your email"
              required
            />

            {error && <p className="text-danger text-center">{error}</p>}

            <Button variant="primary" type="submit">
              Reset
            </Button>
          </form>
        </>
      )}
    </AuthWrapper>
  )
}
