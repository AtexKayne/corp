import MainLayout from '../layout/MainLayout'
import MainSlider from '../components/MainSlider'
import KaleidoscopeElem from '../components/KaleidoscopeElem'
import Title from '../components/Title'
import Cloud from '../components/Cloud'
import RangeLine from '../components/RangeLine'
import { mainItems, brandItems } from '../components/helpers/constants'
import useDeviceDetect from '../components/helpers/useDeviceDetect'
import KaleidoscopeImage from '../components/KaleidoscopeImage'

export default function Home({ slides, items }) {
  const { isMobile } = useDeviceDetect()


  return (
    <MainLayout className='ui-light container--flex'>
      <div style={isMobile ? { height: '100%', paddingTop: '300px' } : { paddingTop: '0px' }} className='col col--between'>
        <Title image='/assets/img/textlogo.svg' hover='Расскажем, кто мы' />
        <MainSlider slides={slides} />
        <RangeLine />
      </div>

      {
        isMobile
          ? <div style={{ position: 'fixed', top: '-250px', left: '-250px', pointerEvents: 'none' }}><KaleidoscopeImage height={519} /></div>
          : <div className='col col--center'><KaleidoscopeElem isMain={true} /></div>
      }


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
