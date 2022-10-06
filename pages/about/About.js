import Link from 'next/link'
import { useContext } from 'react'
export default function About() {
    const { scroll } = useContext(SmoothScrollContext)

    const goToSecondPart = event => {
        event.preventDefault()
        scroll && scroll.scrollTo('#second-part')
    }
    const goToTop = event => {
        event.preventDefault()
        scroll && scroll.scrollTo(0)
    }

    return (
        <>
            <div data-scroll-section>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <a href='#second-part' onClick={goToSecondPart}>
                    Go to second part
                </a>
            </div>
            <div id='set' style={{ height: '200vh' }} data-scroll-section>
                <h1 data-scroll data-scroll-sticky data-scroll-target='#set' className='mt-2'>Second stat part!</h1>
            </div>
            <div id='second-part' data-scroll-section>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
                <h1 className='mt-2'>Second part!</h1>
            </div>


        </>
    )
}
