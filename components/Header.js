import Icon from './Icon'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import style from '../styles/module/Header.module.scss'


export default function Header() {
    const refFixed = useRef(null)
    const refRabbit = useRef(null)
    const [isHeaderFixed, setIsHeaderFixed] = useState(false)

    const hoverEnterHandler = () => setIsHeaderFixed(true)
    const hoverLeaveHandler = () => setIsHeaderFixed(false)

    useEffect(() => {
        const scrollHandler = event => {
            const scrollTop = window.scrollY

            if (scrollTop > 250) {
                refFixed.current.classList.add(style.middleFixed)
                refRabbit.current.classList.add(style.rabbitFixed)
            } else {
                refFixed.current.classList.remove(style.middleFixed)
                refRabbit.current.classList.remove(style.rabbitFixed)

            }
        }

        document.addEventListener('scroll', scrollHandler)

        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])

    return (
        <header className={style.header}>
            <div className={`container ${style.container}`}>
                <div className={`${style.top} text--t4 is-hidden--lg-up`}>
                    <div className={style.groupMD}>
                        <div className='btn btn--empty btn--xs'>
                            <Icon width='21' height='21' name='burger' />
                        </div>
                        <div className='btn btn--empty btn--sm'>
                            <Icon width='21' height='21' name='search' />
                        </div>
                    </div>
                    <div className={style.group}>
                        <div className='is-hidden--sm-down'>
                            <Image src='/images/layout/logo-md.svg' width='242' height='45' alt='RedHair market' />
                        </div>
                        <div className='is-hidden--md-up'>
                            <Image src='/images/layout/logo-xs.svg' width='41' height='41' alt='RedHair market' />
                        </div>
                    </div>
                    <div className={style.groupMD}>
                        <div className='btn btn--empty btn--xs'>
                            <Icon width='25' height='19' name='basket' />
                        </div>
                        <div className='btn btn--empty btn--sm'>
                            <Icon width='21' height='20' name='person' />
                        </div>
                    </div>
                </div>

                <div className={`${style.top} text--t4 is-hidden--md-down`}>
                    <div className={style.group}>
                        <a className='link active' href='#' rel='nofollow'>RedHare Market</a>
                        <a className='link' href='#' rel='nofollow'>RedHare Обучение</a>
                    </div>
                    <div className={style.group}>
                        <a className='link btn' href='#' rel='nofollow'>
                            <Icon name='navigationXS' width='12' height='12' size='xxs' />
                            <span>Петропавловск-Камчатский</span>
                        </a>
                        <a className='link is-hidden--xl-up' href='#'>Контакты</a>
                        <a className='link is-hidden--xl-down' href='tel:+74959833542'>+7 (495) 983-35-42</a>
                    </div>
                    <div className={`${style.group} is-hidden--lg-down`}>
                        <a className='link' href='#'>Помощь</a>
                        <a className='link' href='#'>Доставка и оплата</a>
                        <a className='link' href='#'>Контакты</a>
                    </div>
                </div>

                <div
                    ref={refFixed}
                    data-active={isHeaderFixed}
                    onMouseLeave={hoverLeaveHandler}
                    onMouseEnter={hoverEnterHandler}
                    className={`${style.middle} is-hidden--md-down container`}>
                        
                    <div className={`${style.groupMD} text--t1`}>
                        <div className='is-hidden--xxl-down' style={{ width: 297, height: 52 }}>
                            <Image src='/images/layout/logo-xxl.svg' width='297' height='52' alt='RedHair market' />
                        </div>
                        <div className='is-hidden--xxxl-up is-hidden--xl-down' style={{ width: 256, height: 44 }}>
                            <Image src='/images/layout/logo-xl.svg' width='256' height='44' alt='RedHair market' />
                        </div>
                        <div className='is-hidden--xxl-up' style={{ width: 44, height: 44 }}>
                            <Image src='/images/layout/logo-lg.svg' width='44' height='44' alt='RedHair market' />
                        </div>

                        <div className='ml-1.5 ml-4:xxxl btn btn--secondary'>
                            <Icon width='20' height='20' name='catalogMD' />
                            <span className='btn__text is-hidden--xxl-down'>Каталог товаров</span>
                            <span className='btn__text is-hidden--xxxl-up ml-0.5'>Каталог</span>
                        </div>
                        <div className='btn btn--empty'>
                            <Icon width='22' height='22' name='brandsMD' />
                            <span className='btn__text'>Бренды</span>
                        </div>
                        <div className='btn btn--empty'>Подборки</div>
                        <div className='btn btn--empty'>Со скидкой</div>
                    </div>
                    <div className={style.groupSM}>
                        <div className='btn btn--empty btn--sm'><Icon width='21' height='21' name='searchMD' /></div>
                        <div className='btn btn--empty btn--sm'><Icon width='24' height='21' name='heartMD' /></div>
                        <div className='btn btn--empty btn--sm'><Icon width='27' height='25' name='basketMD' /></div>
                        <div className='btn btn--tetriary btn--sm text--t6 ml-0.5'>ВОЙТИ</div>
                    </div>
                </div>

                <div className={style.image}>
                    <Image src='/images/layout/background-light.jpg' layout='fill' alt='background' />
                </div>

                <div className={style.bottom}>
                    <div>
                        <div className='text--h1'>FORME</div>
                        <div className='text--p2 mt-1'>Специальные цены и остальные преимущества — только для профессионалов</div>
                        <div className='btn btn--primary btn--lg mt-3'>
                            <span className='text--p5 text--bold btn__text'>Перейти к бренду</span>
                            <Icon name='arrowRight' />
                        </div>
                    </div>
                </div>
            </div>

            <div ref={refRabbit} onMouseEnter={hoverEnterHandler} onMouseLeave={hoverLeaveHandler} className={style.rabbit}>
                <Image src='/images/layout/logo-lg.svg' layout='fill' alt='RedHair market' />
            </div>
        </header>
    )
}
