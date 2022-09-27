import MainLayout from '../layout/MainLayout'
import MainSlider from '../components/MainSlider'
import KaleidoscopeElem from '../components/KaleidoscopeElem'
import Title from '../components/Title'
import Cloud from '../components/Cloud'
import RangeLine from '../components/RangeLine'
import ScrollContainer from '../components/ScrollContainer'
import { mainItems, brandItems } from '../components/helpers/constants'

export default function Home({ slides, items }) {
  return (
    <MainLayout className='ui-light'>
      <ScrollContainer>
        <>
          <div className='col col--between'>
            <Title image='/assets/img/textlogo.svg' hover='Расскажем, кто мы' />
            <MainSlider slides={slides} />
            <RangeLine />
          </div>
          <div className='col col--center'>
            <KaleidoscopeElem isMain={true} />
          </div>
        </>

        <>
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
        </>
      </ScrollContainer>

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
