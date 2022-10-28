import { useState } from "react"

export default function MobileMenuTransitor({ className }) {
    const [menuState, setMenuState] = useState('close')

    return (
        <div className='menu-mobile'>
            <div className='menu-mobile__top'>
                <div className={`${menuState === 'close' ? 'is-invisible' : ''}`}>
                    <div className={`icon ${menuState !== 'search' ? 'icon--search' : 'icon--close'} c-hover`} />
                    <div className={`icon ${menuState !== 'lang' ? 'icon--lang' : 'icon--close'} c-hover`} />
                    <div className={`icon ${menuState !== 'phone' ? 'icon--phone' : 'icon--close'} c-hover`} />
                </div>

                <div className={`icon ${menuState !== 'menu' ? 'icon--menu' : 'icon--close'} c-hover`} />
            </div>

        </div>
    )
}