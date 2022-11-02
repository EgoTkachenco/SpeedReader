// import 'bootstrap/dist/css/bootstrap.css'
import '../styles/index.scss'
import { useState, useEffect } from 'react'
import store from '../store'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'
import Loader from '../components/layout/Loader'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const pathname = router.pathname
  const isAuth =
    router.pathname.search('registration') !== -1 ||
    router.pathname.search('login') !== -1
  const user = store.user
  useEffect(() => {
    if (!process.browser) return
    const token = new URLSearchParams(window.location.search).get('token')
    const refresh_token = new URLSearchParams(window.location.search).get(
      'refresh_token'
    )
    let isUser = store.user !== undefined && store.user !== null
    if (store.user === undefined) isUser = store.relog(token, refresh_token)
    if (isUser && isAuth) {
      router.push('/')
    } else if (!isUser && !isAuth) {
      router.push('/login')
    }
  }, [pathname])

  if (!isAuth && !user) return <Loader />
  return <Component {...pageProps} />
}

export default observer(MyApp)
