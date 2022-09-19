import MainLayout from '../layout/MainLayout'
import MainSlider from '../components/MainSlider'
import KaleidoscopeElem from '../components/KaleidoscopeElem'
import Title from '../components/Title'
import RangeLine from '../components/RangeLine'
import { mainItems } from '../components/helpers/constants'

export default function Home({ slides }) {
  return (
    <MainLayout className='ui-light'>
      <div className='col col--between'>
        <Title image='/assets/img/textlogo.svg' hover='Расскажем, кто мы'/>
        <MainSlider slides={slides}/>
        <RangeLine 
          iconStart='/assets/img/ripple.svg' 
          iconEnd='/assets/img/boutle.svg'/>
      </div>
      <div className='col col--center'>
        <KaleidoscopeElem isMain={true} />
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps({req}) {
  console.log(mainItems);
  let resp, json
  try {
    resp = await fetch(`${process.env.API_URL}/mainxczxc`)
    json = await resp.json()
  } catch (error) {
    json = mainItems
  }

  return {
    props: {
      slides: mainItems.slider
    }
  }
}
