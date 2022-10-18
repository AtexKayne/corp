import '../styles/global.scss'
import MenuTransitor from '../components/MenuTransitor';
import { useState, useRef, useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState('ui-light')
  const [contentWidth, setContentWidth] = useState('100%')  

  useEffect(() => {
    if (document) {
      console.log(window.innerWidth - document.querySelector('.menu-wrapper').clientWidth + 'px');
      setContentWidth(window.innerWidth - document.querySelector('.menu-wrapper').clientWidth + 'px')
    }
  }, [])

  return (
    <>
      <MenuTransitor setTheme={setTheme} className={ theme }/>
      <div style={{width: contentWidth, flexBasis: contentWidth}} className='animate-container'>
        <Component {...pageProps} setTheme={setTheme} />
      </div>
    </>
  )
}

export default MyApp
