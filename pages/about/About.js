import Link from 'next/link'
import { useContext } from 'react'
export default function About() {
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
            </div>
            <div id='set' style={{height: '200vh'}} data-scroll-section>
                <h1 data-scroll data-scroll-sticky data-scroll-target='#set' className='mt-2'>Second stat part!</h1>
            </div>
            <div data-scroll-section>
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
