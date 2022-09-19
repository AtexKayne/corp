import '../styles/global.scss'
// import {motion, AnimatePresence} from 'framer-motion'
import Menu from '../components/Menu'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

function Loading () {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const startHandler    = url => (url !== router.asPath) && setLoading(true)
    const completeHandler = url => (url === router.asPath) && setLoading(false)
    router.events.on('routeChangeStart',    startHandler)
    router.events.on('routeChangeComplete', completeHandler)
    router.events.on('routeChangeError',    completeHandler)

    return () => {
      router.events.off('routeChangeStart',     startHandler)
      router.events.off('routeChangeComplete',  completeHandler)
      router.events.off('routeChangeError',     completeHandler)
    }
  });

  return loading && (
    <div className='preloader-wrapper'>
      <div className='preloader-loader'/>
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <div className='content'>
      <Loading />
      <Menu className={'ui-light'}/>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
