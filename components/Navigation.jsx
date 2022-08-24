import store from '../store'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Navigation = observer(() => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const logout = () => {
    store.logout()
  }
  const login = () => {
    router.push('/login')
  }
  const registration = () => {
    router.push('/registration')
  }
  useEffect(() => {
    setUser(store.user)
  }, [store.user])

  return (
    <nav className="d-flex align-items-center">
      {user ? (
        <>
          <div className="nav-name">Hello {user.name}</div>

          <button className="btn btn-secondary ms-auto" onClick={logout}>
            log out
          </button>
        </>
      ) : (
        <>
          <button className="btn btn-secondary" onClick={login}>
            login
          </button>
          <button className="btn btn-secondary ms-3" onClick={registration}>
            registration
          </button>
        </>
      )}
    </nav>
  )
})

export default Navigation
