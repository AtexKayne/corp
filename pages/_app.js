import '../styles/global.scss'
// import 'overlayscrollbars/overlayscrollbars.css';
import { motion, useAnimationControls } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import Menu from '../components/Menu'
import Preloader from '../components/Preloader';
import Breadcrumbs from '../components/Breadcrumbs';
import PageTransitor from '../components/PageTransitor';


function MyApp({ Component, pageProps }) {
  const pageTransition = useAnimationControls()
  const router         = useRouter()
  const refIsShown     = useRef()
  const [theme, setTheme]               = useState('ui-light')
  const [leftPosition, setLeftPosition] = useState('-100vw')
  const [breadcrumbs,  setBreadcrumbs]  = useState(null)
  
  const breadcrumbsSetting = (url = router.asPath) => {
    const linkPath = url.split('/')
    linkPath.shift()
    const pathArray = linkPath.map((path, i) => {
      return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') }
    })
    const newPosition = `-${(window.innerWidth - 121 - pathArray.filter(path => path.href !== '/').length * 50)}px`
    setLeftPosition(newPosition)
    setBreadcrumbs(pathArray)
  }

  useEffect(() => {
    breadcrumbsSetting()
  }, []);

  useEffect(() => {
    const hidePreload  = () => pageTransition.start('hidden')
    const showPreload  = () => pageTransition.start('shown')
    const startHandler = (url) => {
      if (url !== router.asPath) {
        breadcrumbsSetting(url)
        refIsShown.current = showPreload()
      }
    }
    const completeHandler = (url) => {
      if (url === router.asPath && refIsShown.current) {
        refIsShown.current.then(hidePreload)
      }
    }

    router.events.on('routeChangeStart',    startHandler)
    router.events.on('routeChangeComplete', completeHandler)
    router.events.on('routeChangeError',    completeHandler)
    
    return () => {
      router.events.off('routeChangeStart',     startHandler)
      router.events.off('routeChangeComplete',  completeHandler)
      router.events.off('routeChangeError',     completeHandler)
    }
  }, [router]);

  return (
    <>
      {/* <Preloader /> */}
      <Menu className={ theme } />
      <Breadcrumbs className={ theme } breadcrumbs={ breadcrumbs } />
      <PageTransitor pageTransition={ pageTransition } leftPosition={ leftPosition } />
      <motion.div 
        className='motion-container'
        initial={{ scale: 1, filter: 'brightness(100%)' }}
        animate={ pageTransition }
        transition={{ duration: 1 }}
        variants={{
          hidden: { scale: 1, filter: 'brightness(100%) blur(0px)' },
          shown:  { scale: 0.8, filter: 'brightness(80%) blur(2px)' },
        }}>
        <Component { ...pageProps } setTheme={ setTheme } />
      </motion.div>
    </>
  )
}

export default MyApp
