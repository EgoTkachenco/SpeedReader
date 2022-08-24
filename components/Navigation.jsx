import store from '../store'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

const Navigation = observer(() => {
  const [username, setUsername] = useState('user')
  const router = useRouter()
  const logout = () => {
    store.logout()
    router.push('/login')
  }
  useEffect(() => setUsername(store.user.name), store.name)

  return (
    <nav className="d-flex align-items-center">
      <div className="nav-name">Hello {username}</div>

      <button className="btn btn-secondary ms-auto" onClick={logout}>
        log out
      </button>
    </nav>
  )
})

export default Navigation
