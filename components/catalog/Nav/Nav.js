import { debounce } from '../../helpers/debounce'
import Dropdown from '../../usefull/Dropdown'
import style from '../Catalog.module.scss'
import { useRef, useEffect, useState } from 'react'
import FastFilter from '../FastFilters/FastFilters'
import Icon from '../../Icon'
import { globalState } from '../../helpers/globalState'

export default function Nav({ isBrands, sortHandler, openFilters, fastFilters, selectFastFilter, isExistFilters, resetAllHandler, mode, setMode }) {
    const refNav = useRef(null)
    const refScroll = useRef(0)
    const refContainer = useRef(null)
    const refOffsetHeight = useRef(0)

    const debounceScroll = debounce(() => {
        const scroll = window.scrollY
        console.log(scroll);
        const isScrollDown = scroll > refScroll.current
        refScroll.current = scroll
        let navPosition
        if (scroll > refOffsetHeight.current && !isScrollDown) {
            navPosition = 'fixedShown'
        } else if (scroll > refOffsetHeight.current && isScrollDown) {
            navPosition = 'fixedHidden'
        } else {
            navPosition = 'absoluteShown'
        }
        refNav.current.dataset.position = navPosition
    }, 10)

    const debounceResize = debounce(() => {
        const offset = refContainer.current.getBoundingClientRect().left
        refNav.current.style.paddingLeft = `${offset}px`
        refNav.current.style.paddingRight = `${offset}px`

        // if (window.innerWidth > globalState.sizes.lg) {
        //     refOffsetHeight.current = 292
        // } else {
        //     refOffsetHeight.current = 298
        // }
    }, 1000)

    const updateMode = mode => {
        setMode(mode)
    }

    useEffect(() => {
        window.addEventListener('scroll', debounceScroll, { passive: true })
        window.addEventListener('resize', debounceResize)
        const offset = refContainer.current.getBoundingClientRect().left
        refNav.current.style.paddingLeft = `${offset}px`
        refNav.current.style.paddingRight = `${offset}px`
        refOffsetHeight.current = refNav.current.getBoundingClientRect().top - globalState.header.element.clientHeight + window.scrollY
        // refOffsetHeight.current = 298
        console.log(globalState.header.element, refOffsetHeight.current);
        // if (window.innerWidth > globalState.sizes.lg) {
        //      = 492
        // } else {
        //     refOffsetHeight.current = 198
        // }

        return () => {
            window.removeEventListener('scroll', debounceScroll)
            window.removeEventListener('resize', debounceResize)
        }
    }, [])

    return (
        <div ref={refContainer} className={style.navContainer}>
            {isBrands ? null : <FastFilter fastFilters={fastFilters} onAfterChange={selectFastFilter} resetAllHandler={resetAllHandler} />}
            <div className={`${style.filterAndSort}`}>
                <div ref={refNav} data-position={'absoluteShown'} className={`${style.nav}`}>
                    <div className={`${style.navInner}`}>
                        <Dropdown title='Сортировка' external='text--t5 text--bold text--upper' afterChose={sortHandler}>
                            <>
                                <span data-value='popular' data-active='true' className='text--t4'>Популярные</span>
                                <span data-value='new' className='text--t4'>Новинки</span>
                                <span data-value='price-down' className='text--t4'>Цена по возрастанию</span>
                                <span data-value='price-up' className='text--t4'>Цена по убыванию</span>
                            </>
                        </Dropdown>
                        <div className={style.navFiller} />
                        <div className='is-hidden--lg-down text--t5 text--bold text--upper text--color-small'>НАЙДЕНО 668 ТОВАРОВ</div>
                        <div className={`${style.tagsContainer} d-flex`}>
                            <div className='mr-2 mr-3:md d-flex flex--center mr-1:xxs'>
                                <span className='text--t5 link text--bold text--upper is-hidden--xxs'>Вид</span>
                                <div className={style.viewMode}>
                                    <svg onClick={() => updateMode('normal')} data-active={mode === 'normal'} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_1707_39249)">
                                            <rect x="0.000976562" width="5.66668" height="5.66668" rx="0.266667" fill="currentColor" />
                                            <rect x="0.000976562" y="8.33398" width="5.66668" height="5.66668" rx="0.266667" fill="currentColor" />
                                            <rect x="8.33398" width="5.66668" height="5.66668" rx="0.266667" fill="currentColor" />
                                            <rect x="8.33398" y="8.33398" width="5.66668" height="5.66668" rx="0.266667" fill="currentColor" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1707_39249">
                                                <rect width="14" height="14" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <svg onClick={() => updateMode('compact')} data-active={mode === 'compact'} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_1707_39256)">
                                            <g clipPath="url(#clip1_1707_39256)">
                                                <rect width="6.125" height="3.5" rx="0.266667" fill="currentColor" />
                                                <rect x="7.875" width="6.125" height="3.5" rx="0.266667" fill="currentColor" />
                                                <rect y="5.25" width="6.125" height="3.5" rx="0.266667" fill="currentColor" />
                                                <rect x="7.875" y="5.25" width="6.125" height="3.5" rx="0.266667" fill="currentColor" />
                                                <rect y="10.5" width="6.125" height="3.5" rx="0.266667" fill="currentColor" />
                                                <rect x="7.875" y="10.5" width="6.125" height="3.5" rx="0.266667" fill="currentColor" />
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1707_39256">
                                                <rect width="14" height="14" fill="white" />
                                            </clipPath>
                                            <clipPath id="clip1_1707_39256">
                                                <rect width="14" height="14" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <svg onClick={() => updateMode('creative')} width="14" height="14" data-active={mode === 'creative'} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_1707_39267)">
                                            <rect width="7" height="6.125" rx="0.266667" fill="currentColor" />
                                            <rect y="7.875" width="4.375" height="6.125" rx="0.266667" fill="currentColor" />
                                            <rect x="9.625" width="4.375" height="6.125" rx="0.266667" fill="currentColor" />
                                            <rect x="7" y="7.875" width="7" height="6.125" rx="0.266667" fill="currentColor" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_1707_39267">
                                                <rect width="14" height="14" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                            <a href='#' className='d-flex flex--center' onClick={openFilters}>
                                <span className='text--t5 link text--bold text--upper'>фильтры</span>
                                <Icon external='ml-0.5' name='filter' width='16' height='16' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
