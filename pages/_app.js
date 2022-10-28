import '../styles/global.scss'
import MenuTransitor from '../components/MenuTransitor';
import { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion'
import Preloader from '../components/Preloader';
import useDeviceDetect from '../components/helpers/useDeviceDetect'

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
    <>
      {isMobile ? null : <Preloader animatePreloader={animatePreloader} setPreloaderState={setPrSt}/>}
      <MenuTransitor animateContent={animateContent} preloaderState={preloaderState} setContainerWidth={setContainerWidth} theme={theme} setTheme={setTheme} className={ theme }/>
      <motion.div 
        initial={{scale: 1, opacity: 1}}
        animate={animateContent}
        variants={{
          start: {scale: 1, opacity: 0.1},
          end: {scale: 1, opacity: 1, transition: {duration: 1}}
        }}
        transition={{duration: 0.5}}
        style={{width: contentWidth, flexBasis: contentWidth}}
        className='animate-container'>
        <Component {...pageProps} setTheme={setTheme} />
      </motion.div>
    </>
  )
}

export default MyApp
