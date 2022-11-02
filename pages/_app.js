import '../styles/global.scss'
import MenuTransitor from '../components/MenuTransitor';
import { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion'
import Preloader from '../components/Preloader';
import useDeviceDetect from '../components/helpers/useDeviceDetect'
import MobileMenuTransitor from '../components/MobileMenuTransior'
import MobilePreloader from '../components/MobilePreloader'
import { ThemeContext } from '../components/helpers/ThemeContext';

function MyApp({ Component, pageProps }) {
  const { isMobile } = useDeviceDetect()
  const [theme, setTheme] = useState('ui-light')
  const [preloaderState, setPreloaderState] = useState();
  const [contentWidth, setContentWidth] = useState('100%')
  const animateContent = useAnimationControls()
  const animatePreloader = useAnimationControls()
  const setPrSt = (value) => {
    if (document) setPreloaderState(value)
  }
  const setContainerWidth = () => {
    if (document) setContentWidth(window.innerWidth - document.querySelector('.menu-wrapper').clientWidth + 'px')
  }
  useEffect(() => {
    setContainerWidth()
  }, [])

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {isMobile
        ? <MobilePreloader animatePreloader={animatePreloader} setPreloaderState={setPrSt} />
        : <Preloader animatePreloader={animatePreloader} setPreloaderState={setPrSt} />}
      {isMobile
        ? <MobileMenuTransitor animateContent={animateContent} className={theme} />
        : <MenuTransitor animateContent={animateContent} preloaderState={preloaderState} setContainerWidth={setContainerWidth} className={theme} />
      }
      <motion.div
        initial={{ scale: 1, opacity: 1 }}
        animate={animateContent}
        variants={{
          start: { scale: 1, filter: 'brightness(70%)' },
          end: { scale: 1, filter: 'brightness(100%)', transition: { duration: 1 } }
        }}
        transition={{ duration: 0.5 }}
        style={{ width: contentWidth, flexBasis: contentWidth }}
        className='animate-container'>
        <Component {...pageProps} />
      </motion.div>
    </ThemeContext.Provider>
  )
}

export default MyApp
