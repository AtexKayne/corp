import '../styles/global.scss'
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import Menu from '../components/Menu'
import Preloader from '../components/Preloader';
import Breadcrumbs from '../components/Breadcrumbs';


function MyApp({ Component, pageProps }) {
  const pageTransition = useAnimationControls()
  const router         = useRouter()
  const refIsShown     = useRef()
  const [leftPosition, setLeftPosition] = useState('-100vw')
  const [breadcrumbs,  setBreadcrumbs] = useState(null)

  useEffect(() => {
    const hidePreload = () => pageTransition.start('hidden')
    const showPreload = () => pageTransition.start('shown')
    const startHandler = (url) => {
      if (url !== router.asPath) {
        refIsShown.current = showPreload()
        
      }
    }

    const completeHandler = (url) => {
      if (url === router.asPath && refIsShown.current) {
        const linkPath = router.asPath.split('/')
        linkPath.shift()
        const pathArray = linkPath.map((path, i) => {
          return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') }
        })
        setBreadcrumbs(pathArray)
        const newPosition = `-${(window.innerWidth - 120 - pathArray.filter(path => path.href !== '/').length * 50)}px`
        setLeftPosition(newPosition)

        refIsShown.current.then(hidePreload)
      }
    }

    router.events.on('routeChangeStart',    startHandler)
    router.events.on('routeChangeComplete', completeHandler)
    router.events.on('routeChangeError', completeHandler)

    // setIsFirstLoad(false)

    return () => {
      router.events.off('routeChangeStart',     startHandler)
      router.events.off('routeChangeComplete',  completeHandler)
      router.events.off('routeChangeError',  completeHandler)
    }
  }, [router]);

  return (
    <main className='content'>
      {/* <Preloader /> */}
      <Menu className={'ui-light'}/>
      <Breadcrumbs 
        className={'ui-light'} 
        breadcrumbs={breadcrumbs} 
        pageTransition={pageTransition}/>
      <div className='page-transitor'>
        {/* <motion.div 
          key={router.route}
          variants={{
            hidden: { x: '-100vw' },
            shown: { x: '0' },
          }}
          transition={{duration: 1}}
          animate={pageTransition} 
          exit={{ x: '-100vw' }}
          className='preloader-wrapper'>
        </motion.div> */}

        <motion.div 
          className='page-transitor__top'
          initial={{ y: '-100vh' }}
          animate={pageTransition}
          transition={{duration: 1}}
          variants={{
            hidden: { y: '-100vh' },
            shown: { y: '-50vh' },
          }}/>
        <motion.div 
          className='page-transitor__left'
          initial={{ x: leftPosition }}
          animate={pageTransition}
          transition={{duration: 1}}
          variants={{
            hidden: { x: leftPosition },
            shown: { x: '-65vw' },
          }}/>
        <motion.div 
          className='page-transitor__bottom'
          initial={{ y: '100vh' }}
          animate={pageTransition}
          transition={{duration: 1}}
          variants={{
            hidden: { y: '100vh' },
            shown: { y: '70vh' },
          }}/>
        <motion.div 
          className='page-transitor__right'
          initial={{ x: '100vw', y: '0vh' }}
          animate={pageTransition}
          transition={{duration: 1}}
          variants={{
            hidden: { x: '100vw', y: '0vh' },
            shown:  { x: '50vw',  y: '50vh' },
          }}/>
      </div>
      <motion.div 
        className='main-container'
        initial={{ scale: 1, filter: 'brightness(100%)' }}
        animate={pageTransition}
        transition={{duration: 1}}
        variants={{
          hidden: { scale: 1, filter: 'brightness(100%)' },
          shown:  { scale: 0.5, filter: 'brightness(0%)' },
        }}>
        <Component {...pageProps} />
      </motion.div>
    </main>
  )
}

export default MyApp
