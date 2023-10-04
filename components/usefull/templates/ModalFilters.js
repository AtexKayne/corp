import { filters } from '../../helpers/constants'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'
import style from '/styles/module/usefull/templates/Modal-filters.module.scss'

import Icon from '../../Icon'
import InputRange from '../../../components/usefull/form/InputRange'
import ColorPicker from '../../../components/usefull/form/ColorPicker'
import ItemsPicker from '../../../components/usefull/form/ItemsPicker'
import ItemChecker from '../../../components/usefull/form/ItemChecker'

export default function ModalFilters({ data }) {
    const [activeFilters, setActiveFilters] = useState([])
    const [countItems, setCountItems] = useState(100)
    const refTimeout = useRef(false)
    const refModal = useRef(null)

    const resetHandler = () => {
        for (const key in globalState.catalog.selectedFilter) {
            if (Object.hasOwnProperty.call(globalState.catalog.selectedFilter, key)) {
                const element = globalState.catalog.selectedFilter[key];
                if (Array.isArray(element) && element.length) {
                    const inner = refModal.current.querySelector(`.${style.filterInner}[data-code="${key}"]`)
                    const reset = inner.querySelector('.reset')
                    if (reset) reset.click()
                }
                if (element === true) {
                    const inner = refModal.current.querySelector(`.${style.filterInner}[data-code="${key}"]`)
                    const checker = inner.querySelector('.input-switch')
                    if (checker) checker.click()
                }
            }
        }
    }

    useEffect(() => {
        // setSelectedFilter(globalState.catalog.selectedFilter)
    }, [])

    useEffect(() => {
        if (refTimeout.current) clearTimeout(refTimeout.current)
        refTimeout.current = setTimeout(() => {
            let isFilters = false
            for (const key in globalState.catalog.selectedFilter) {
                if (Object.hasOwnProperty.call(globalState.catalog.selectedFilter, key)) {
                    const element = globalState.catalog.selectedFilter[key];
                    if (Array.isArray(element)) {
                        if (key !== 'price') {
                            if (element.length) isFilters = true
                            const inner = refModal.current.querySelector(`.${style.filterInner}[data-code="${key}"]`)
                            const counter = inner.querySelector(`.${style.filterNameCount}`)
                            counter.innerHTML = element.length
                            counter.setAttribute('data-count', !!element.length)
                        } else {
                            if (element[0] !== 0 || element[1] !== 15000) isFilters = true
                        }
                    }
                    if (element === true) isFilters = true
                }
            }
            refTimeout.current = false
            setActiveFilters(isFilters)
            setCountItems(Math.floor(Math.random() * 2000))
        }, 200)
    }, [globalState.catalog.selectedFilter])


    return (
        <div ref={refModal} className={`${style.modalFilters} full-height`}>
            <div className={`${style.title} pb-2`}>
                <div className={`${style.closer} ${style.closerFiller}`} onClick={() => globalState.modal.close()}>
                    <Icon name='close' width='20' height='20' />
                </div>
                <div className='text--a4 text--bold text--upper'>Фильтры</div>
                <div data-changed={activeFilters} className={style.filler}>
                    <div className={style.fillerBackground} />
                    <span onClick={resetHandler} className='text--t6 text--color-primary text--upper'>сбросить</span>
                </div>
            </div>

            {data && data.length
                ? data.map(filter => <Filter key={filter.id} name={filter.name} code={filter.code} />)
                : null
            }

            <div className={style.footer}>
                <div onClick={() => globalState.modal.close()} className={`${style.showBtn} btn btn--primary btn--fill`}>
                    <span className='text--upper text--p5 text--sparse text--bold'>Показать {countItems} товаров</span>
                </div>
            </div>
        </div>
    )
}

function ModalFilterWrapper({ children, name, isChanged }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div onClick={() => setIsOpen(true)} className={style.filterName}>
                <div className={style.filterNameInner}>
                    <span>{name}</span>
                    <span data-count='false' className={style.filterNameCount} />
                </div>
                <Icon name='chevronRight' width='16' height='16' />
            </div>

            <div data-open={isOpen} className={style.filterModal}>
                <div className={`${style.title} pb-3.5`}>
                    <div className={style.closer} onClick={() => setIsOpen(false)}>
                        <Icon name='chevronLeft' width='20' height='20' />
                    </div>
                    <div className='text--a4 text--bold text--upper'>{name}</div>
                    <div data-changed={!!isChanged} className={style.filler} />
                </div>
                {children}

                {/* <div onClick={() => globalState.modal.close()} className={`${style.showBtn} btn btn--primary btn--fill`}>
                    <span className='text--upper text--p6 text--bold'>Показать 100 товаров</span>
                </div> */}
            </div>
        </>
    )
}

function Filter({ name, code }) {
    const { colors, brands, pitanie, proizvodstvo, ves } = filters
    const [isChanged, setIsChanged] = useState(false)

    return (
        <div data-code={code} className={style.filterInner}>
            {code === 'price' ?
                <div className='pb-3 pt-1.5'>
                    <InputRange code={code} min={0} max={15000} reset='none' />
                </div> : null
            }
            {code === 'color' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ColorPicker code={code} colors={colors} reset='сбросить' />
                </ModalFilterWrapper> : null
            }
            {code === 'brand' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker code={code} items={brands} reset='сбросить' />
                </ModalFilterWrapper> : null
            }
            {code === 'pitanie' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker code={code} items={pitanie} reset='сбросить' />
                </ModalFilterWrapper> : null
            }
            {code === 'proizvodstvo' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker code={code} items={proizvodstvo} reset='сбросить' />
                </ModalFilterWrapper> : null
            }
            {code === 'weight_filter' || code === 'ves' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker code={code} items={ves} reset='сбросить' />
                </ModalFilterWrapper> : null
            }
            {code === 'market' || code === 'available' || code === 'hits' || code === 'discont' ?
                <div className='pt-1.5'>
                    <ItemChecker code={code} text={name} reset='сбросить' />
                </div> : null
            }
        </div>
    )
}

