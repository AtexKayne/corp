import Cloud from './main/Cloud'
import MainTitle from './main/MainTitle'
import MainLayout from '../layout/MainLayout'
import RangeLine from '../components/RangeLine'
import MainSlider from '../components/MainSlider'
import KaleidoscopeElem from '../components/KaleidoscopeElem'
import KaleidoscopeImage from '../components/KaleidoscopeImage'
import { useState, useContext, useEffect, useRef } from 'react'
import { ThemeContext } from '../components/helpers/ThemeContext'
import useDeviceDetect from '../components/helpers/useDeviceDetect'
import { mainItems, brandItems } from '../components/helpers/constants'

export default function Home({ slides = {}, items }) {
  const { setTheme } = useContext(ThemeContext)
  const refSections = useRef(null)
  const refCurrentSection = useRef(0)
  const refKaleidoscope = useRef(null)
  
  useEffect(() => {
    setTheme('ui-light')
    const kaleidoscopeUpdate = () => {

    }

    const wheelHandler = event => {
      if (!refSections.current) return
      refSections.current[refCurrentSection.current].setAttribute('data-active', 'false')
      if (event.deltaY > 0) {
        refCurrentSection.current++
        if (refCurrentSection.current >= refSections.current.length) {
          refCurrentSection.current = 0
        }
        refSections.current[refCurrentSection.current].setAttribute('data-active', 'true')
      } else {
        refCurrentSection.current--
        if (refCurrentSection.current < 0) {
          refCurrentSection.current = refSections.current.length - 1
        }
        refSections.current[refCurrentSection.current].setAttribute('data-active', 'true')
      }

      kaleidoscopeUpdate()
    }

    if (typeof window !== 'undefined') {
      refSections.current = document.querySelectorAll('section')
      document.addEventListener('wheel', wheelHandler)
    }

    return () => {
      if (typeof window !== 'undefined') document.removeEventListener('wheel', wheelHandler)
    }
  }, [])

  const { isMobile } = useDeviceDetect()
  const [currentSlides, setCurrentSlides] = useState(slides.stateOne)

  return (
    <MainLayout className='ui-light container--main'>
      {
        isMobile
          ? <div ref={refKaleidoscope} style={{ position: 'fixed', zIndex: 2, top: '-250px', left: '-250px', pointerEvents: 'none' }}><KaleidoscopeImage height={519} /></div>
          : <div ref={refKaleidoscope} style={{ position: 'fixed', zIndex: 2, top: 'calc(50vh - 270px)', left: 'calc(50vw + 100px)' }} className=''><KaleidoscopeElem isMain={true} /></div>
      }

      <section data-active='true' className={`d-flex flex--between`}>
        <div style={isMobile ? { height: '100%', paddingTop: '250px' } : { paddingTop: '0px' }} className='col col--50 col--between'>
          <MainTitle text='Расскажем, кто мы' />
          <MainSlider slides={currentSlides} />
          <RangeLine setCurrentSlides={setCurrentSlides} slides={slides} />
        </div>
        {isMobile ? null : <div className='col col--center' />}
      </section>

      <section className={`d-flex flex--between`}>
        <div style={isMobile ? { height: '100%', paddingTop: '250px' } : { paddingTop: '0px' }} className='col col--50 col--between'>
          <MainTitle text='Расскажем, кто мы' />
          <div className='text--h4 pr-1:md'>14 брендов лучшей косметики для парикмахеров, стилистов, колористов</div>
          {/* <MainBrands brands={items} /> */}
          <Cloud items={items} />
        </div>
      </section>


      {/* <>
          <div className='col col--between'>
            <Title text='Brands' hover='Бренды' />
            <div className='text--c3'>
              14 брендов лучшей косметики для парикмахеров, стилистов, колористов
            </div>
            <Cloud items={brandItems.items} />
          </div>
          <div className='col col--center'>
            <KaleidoscopeElem />
          </div>
        </> */}

    </MainLayout>
  )
}

export async function getServerSideProps({ req }) {
  let resp, json
  try {
    resp = await fetch(`${process.env.API_URL}/mainxczxc`)
    json = await resp.json()
  } catch (error) {
    json = mainItems
  }

  return {
    props: {
      slides: mainItems.slider,
      items: brandItems.items
    }
  }
}
