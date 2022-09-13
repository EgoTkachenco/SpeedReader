// import 'bootstrap/dist/css/bootstrap.css'
import '../styles/index.scss'

import store from '../store'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  if (process.browser && store.user === undefined) {
    store
      .relog()
      .then(() => {
        const isAuth =
          router.pathname.search('registration') !== -1 ||
          router.pathname.search('login') !== -1

        if (isAuth) router.push('/')
      })
      .catch((err) => {
        const isAuth =
          router.pathname.search('registration') !== -1 ||
          router.pathname.search('login') !== -1

        if (!isAuth) router.push('/login')
      })
  }
  return <Component {...pageProps} />
}

export default observer(MyApp)
