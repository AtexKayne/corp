import '../styles/global.scss'
import MenuTransitor from '../components/MenuTransitor';
import { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion'

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('ui-light')
  const [contentWidth, setContentWidth] = useState('100%')
  const animateContent = useAnimationControls()

  useEffect(() => {
    if (document) setContentWidth(window.innerWidth - document.querySelector('.menu-wrapper').clientWidth + 'px')
  }, [])

  return (
    <>
      <MenuTransitor animateContent={animateContent} setTheme={setTheme} className={ theme }/>
      <motion.div 
        initial={{scale: 1, opacity: 1}}
        animate={animateContent}
        variants={{
          start: {scale: 0.7, opacity: 0.1},
          end: {scale: 1, opacity: 1}
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
