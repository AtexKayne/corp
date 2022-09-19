import '../styles/global.scss'
import { motion, useAnimationControls, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Menu from '../components/Menu'
import Preloader from '../components/Preloader';


function MyApp({ Component, pageProps }) {
  const pageTransition = useAnimationControls()
  const router         = useRouter()

  useEffect(() => {
    let isShown = false
    const hidePreload = () => pageTransition.start('hidden')
    const showPreload = () => pageTransition.start('shown')

    const startHandler = url => {
      if (url !== router.asPath) {
        isShown = false
        showPreload().then(() => isShown = true)
      }
    }

    const completeHandler = url => {
      if (url === router.asPath) {
        if (isShown) {
          hidePreload()
        } else {
          showPreload().then(hidePreload)
        }
      }
    }

    hidePreload()    

    router.events.on('routeChangeStart',    startHandler)
    router.events.on('routeChangeComplete', completeHandler)

    return () => {
      router.events.off('routeChangeStart',     startHandler)
      router.events.off('routeChangeComplete',  completeHandler)
    }
  });

  return (
    <div className='content'>
      {/* <Preloader /> */}
      <Menu className={'ui-light'}/>
      <motion.div 
        key={router.route}
        variants={{
          hidden: { x: '-100vw' },
          shown: { x: '0' },
        }}
        transition={{duration: 1}}
        animate={pageTransition} 
        exit={{ x: '-100vw' }}
        className='preloader-wrapper'>
          <svg width="800" height="600">
            <motion.path 
              d="m115.18239,315.30926l226.52352,-0.35808l48.74546,-48.38704l48.38704,48.02862" 
              stroke="#8712FC" 
              fill="none"
              strokeWidth="2"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={pageTransition}
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, transition: {duration: 0.5, delay: 0.5} },
                shown:  { pathLength: 1, transition: {duration: 0.5, delay: 0} },
              }}/>
            <motion.path 
              d="m342.21177,315.1628l47.95146,47.9513l48.36057,-48.7704l227.86844,0" 
              stroke="#8712FC" 
              fill="none"
              strokeWidth="2"
              initial={{ pathLength: 0, pathOffset: 0 }}
              animate={pageTransition}
              strokeLinecap="round"
              variants={{
                hidden: { pathLength: 0, transition: {duration: 0.5, delay: 0} },
                shown:  { pathLength: 1, transition: {duration: 0.5, delay: 0.5} },
              }}/>
          </svg>
      </motion.div>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
