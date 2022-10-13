import ReaderRefactor from '../components/refactor'
import { useEffect, useState } from 'react'

const start =
  'Thu Oct 13 2022 14:53:31 GMT+0300 (Восточная Европа, летнее время)'

export default function Test() {
  // return <ReaderRefactor />
  const [state, setState] = useState(0)
  useEffect(() => {
    const interval = setInterval(timeUpdate, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const timeUpdate = () =>
    setState(new Date().getTime() - new Date(start).getTime())

  return state
}
