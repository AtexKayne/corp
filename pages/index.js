import MainTitle from './main/MainTitle'
import MainLayout from '../layout/MainLayout'
import RangeLine from '../components/RangeLine'
import MainSlider from '../components/MainSlider'
import { useState, useContext, useEffect } from 'react'
import KaleidoscopeElem from '../components/KaleidoscopeElem'
import KaleidoscopeImage from '../components/KaleidoscopeImage'
import { ThemeContext } from '../components/helpers/ThemeContext'
import useDeviceDetect from '../components/helpers/useDeviceDetect'
import { mainItems, brandItems } from '../components/helpers/constants'
import { SmoothScrollProvider } from '../components/helpers/SmoothScroll.context'
import MainBrands from './main/MainBrands'
import Cloud from './main/Cloud'

export default function Home({ slides = {}, items }) {
  const { setTheme } = useContext(ThemeContext)
  useEffect(() => {
    setTheme('ui-light')
  }, [])

  const { isMobile } = useDeviceDetect()
  const [currentSlides, setCurrentSlides] = useState(slides.stateOne)

  return (
    <MainLayout className='no-padding'>
      <SmoothScrollProvider options={{ smooth: true }}>
        <section data-scroll-section className={`d-flex flex--between`}>
          <div style={isMobile ? { height: '100%', paddingTop: '250px' } : { paddingTop: '0px' }} className='col col--between'>
            <MainTitle text='Расскажем, кто мы' />
            <MainSlider slides={currentSlides} />
            <RangeLine setCurrentSlides={setCurrentSlides} slides={slides} />
          </div>
          {
            isMobile
              ? <div style={{ position: 'fixed', top: '-250px', left: '-250px', pointerEvents: 'none' }}><KaleidoscopeImage height={519} /></div>
              : <div className='col col--center'><KaleidoscopeElem isMain={true} /></div>
          }
        </section>

        <section data-scroll-section className={`d-flex flex--between`}>
          <div style={isMobile ? { height: '100%', paddingTop: '250px' } : { paddingTop: '0px' }} className='col col--50 col--between'>
            <MainTitle text='Расскажем, кто мы' />
            <div className='text--h4'>14 брендов лучшей косметики для парикмахеров, стилистов, колористов</div>
            {/* <MainBrands brands={items} /> */}
            <Cloud items={items} />
          </div>

          {
            isMobile
              ? null
              : <div className='col col--50 col--center'><KaleidoscopeElem isMain={true} /></div>
          }
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
      </SmoothScrollProvider>

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
