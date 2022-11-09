import { useState } from 'react'
import BrandAbout from './BrandAbout'
import BrandMedia from './BrandMedia'
import BrandImage from './BrandImage'
import BrandFooter from './BrandFooter'
import BrandNumbers from './BrandNumbers'
import BrandHistory from './BrandHistory'
import BrandCatalog from './BrandCatalog'
import MainLayout from '../../layout/MainLayout'
import Scrollbar from '../../components/Scrollbar'
import BrandHistoryMobile from './BrandHistoryMobile'
import { brandDetail } from '../../components/helpers/constants'
import useDeviceDetect from '../../components/helpers/useDeviceDetect'
import { SmoothScrollProvider } from '../../components/helpers/SmoothScroll.context'

export default function Brand({ detail }) {
  const { isMobile } = useDeviceDetect()
  const [imagePosition, setImagePosition] = useState('about')

  const sectons = [
    { id: 'image', icon: '' },
    { id: 'about', icon: '' },
    { id: 'numbers', icon: '' },
    { id: 'catalog', icon: '/assets/img/icons/icon-catalog' },
    { id: 'history', icon: '' },
    { id: 'media', icon: '' },
    { id: 'footer', icon: '' }
  ]

  return (
    <MainLayout className='no-padding'>
      <SmoothScrollProvider options={{ smooth: true }}>
        <BrandImage image={brandDetail.image} imageMobile={brandDetail.imageMobile} about={brandDetail.about} />
        <BrandAbout about={brandDetail.about} imagePosition={imagePosition} setImagePosition={setImagePosition} />
        <BrandNumbers numbers={brandDetail.numbers} />
        <BrandCatalog about={brandDetail.about} />
        {isMobile
          ? <BrandHistoryMobile history={brandDetail.history} />
          : <BrandHistory history={brandDetail.history} />
        }
        {isMobile
          ? <BrandMedia media={brandDetail.media} />
          : <BrandMedia media={brandDetail.media} />
        }
        <BrandFooter info={brandDetail.contacts} documents={brandDetail.documents} />
        <Scrollbar scrollComponents={sectons} about={brandDetail.about} imagePosition={imagePosition} setImagePosition={setImagePosition} />
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
    json = brandDetail
  }

  return {
    props: {
      detail: json,
    }
  }
}