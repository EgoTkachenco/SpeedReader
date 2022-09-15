// import 'bootstrap/dist/css/bootstrap.css'
import '../styles/index.scss'
import { useEffect } from 'react'
import store from '../store'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const pathname = router.pathname
  useEffect(() => {
    if (!process.browser) return
    let isUser = store.user !== undefined && store.user !== null

    if (store.user === undefined) isUser = store.relog()

    const isAuth =
      router.pathname.search('registration') !== -1 ||
      router.pathname.search('login') !== -1

    if (isUser && isAuth) {
      router.push('/training-center')
    } else if (!isUser && !isAuth) {
      router.push('/login')
    }
  }, [pathname])

  return <Component {...pageProps} />
}

export default observer(MyApp)
