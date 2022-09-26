import '../styles/global.scss'
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import Menu from '../components/Menu'
import Preloader from '../components/Preloader';
import Breadcrumbs from '../components/Breadcrumbs';


function MyApp({ Component, pageProps }) {
  const pageTransition = useAnimationControls()
  const router         = useRouter()
  const [isFirstLoad,  setIsFirstLoad]  = useState(true)
  const [leftPosition, setLeftPosition] = useState('-100vw')
  const changePosition = (value) => setLeftPosition(value)
  
  useEffect(() => {
    let isShown
    const hidePreload = () => pageTransition.start('hidden')
    const showPreload = () => isShown = pageTransition.start('shown')

    const startHandler = url => {
      console.log('start', isShown, url, router.asPath);
      if (url !== router.asPath) {
        showPreload()
      }
    }

    const completeHandler = url => {
      console.log('end', isShown, url, router.asPath);
      if (url === router.asPath && !isShown) {
        hidePreload()
      } else if (isShown) {
        isShown.then(hidePreload)
      }
    }

    // if (isFirstLoad) {
      hidePreload()
      console.log('hide');
    // }

    router.events.on('routeChangeStart',    startHandler)
    router.events.on('routeChangeComplete', completeHandler)

    setIsFirstLoad(false)

    return () => {
      router.events.off('routeChangeStart',     startHandler)
      router.events.off('routeChangeComplete',  completeHandler)
    }
  }, []);

  return (
    <main className='content'>
      <Preloader />
      <Menu className={'ui-light'}/>
      <Breadcrumbs className={'ui-light'} onAfterEffect={changePosition} pageTransition={pageTransition}/>
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
          animate={pageTransition}
          transition={{duration: 1}}
          variants={{
            hidden: { y: '-100vh' },
            shown: { y: '-50vh' },
          }}/>
        <motion.div 
          className='page-transitor__left'
          animate={pageTransition}
          transition={{duration: 1}}
          variants={{
            hidden: { x: leftPosition },
            shown: { x: '-65vw' },
          }}/>
        <motion.div 
          className='page-transitor__bottom'
          animate={pageTransition}
          transition={{duration: 1}}
          variants={{
            hidden: { y: '100vh' },
            shown: { y: '70vh' },
          }}/>
        <motion.div 
          className='page-transitor__right'
          animate={pageTransition}
          transition={{duration: 1}}
          variants={{
            hidden: { x: '100vw', y: '0vh' },
            shown:  { x: '50vw',  y: '50vh' },
          }}/>
      </div>
      <motion.div 
        className='main-container'
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
