import { filters } from '../../helpers/constants'
import { useState, useEffect, useRef } from 'react'
import { globalState } from '../../helpers/globalState'
import style from '../../../styles/module/usefull/templates/Modal-filters.module.scss'

import Icon from '../../Icon'
import InputRange from '../../../components/usefull/form/InputRange'
import ColorPicker from '../../../components/usefull/form/ColorPicker'
import ItemsPicker from '../../../components/usefull/form/ItemsPicker'
import ItemChecker from '../../../components/usefull/form/ItemChecker'

export default function ModalFilters({ data }) {
    const [activeFilters, setActiveFilters] = useState([])
    const [selectedFilter, setSelectedFilter] = useState([])

    useEffect(() => {
        // setSelectedFilter(globalState.catalog.selectedFilter)
    }, [])

    useEffect(() => {
        // console.log(globalState.catalog.selectedFilter);
    }, [globalState.catalog.selectedFilter])


    return (
        <div className={`${style.modalFilters} full-height`}>
            <div className={`${style.title} pb-2`}>
                <div className={`${style.closer} ${style.closerFiller}`} onClick={() => globalState.modal.setIsOpen(false)}>
                    <Icon name='close' width='20' height='20' />
                </div>
                <div className='text--a4 text--bold text-upper'>Фильтры</div>
                <div data-changed={activeFilters.length} className={style.filler}>
                    <span className='text--t6 text--color-primary text--upper'>сбросить</span>
                </div>
            </div>

            {data && data.length
                ? data.map(filter => <Filter
                    key={filter.id}
                    setActiveFilters={setActiveFilters}
                    name={filter.name} code={filter.code} />)
                : null
            }

            <div className={style.footer}>
                <div onClick={() => globalState.modal.setIsOpen(false)} className={`${style.showBtn} btn btn--primary btn--fill`}>
                    <span className='text--upper text--p5 text--sparse text--bold'>Показать 100 товаров</span>
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
                <span>{name}</span>
                <Icon name='chevronRight' width='16' height='16' />
            </div>

            <div data-open={isOpen} className={style.filterModal}>
                <div className={`${style.title} pb-3.5`}>
                    <div className={style.closer} onClick={() => setIsOpen(false)}>
                        <Icon name='chevronLeft' width='20' height='20' />
                    </div>
                    <div className='text--a4 text--bold text-upper'>{name}</div>
                    <div data-changed={!!isChanged} className={style.filler} />
                </div>
                {children}

                {/* <div onClick={() => globalState.modal.setIsOpen(false)} className={`${style.showBtn} btn btn--primary btn--fill`}>
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
        <div>
            {code === 'price' ?
                <div className='pb-3 pt-1.5'>
                    <InputRange code={code} min={0} max={15000} reset='сбросить' />
                </div>
                : null}
            {code === 'color' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ColorPicker code={code} colors={colors} reset='сбросить' />
                </ModalFilterWrapper>
                : null}
            {code === 'brand' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker code={code} items={brands} reset='сбросить' />
                </ModalFilterWrapper>
                : null}
            {code === 'pitanie' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker code={code} items={pitanie} reset='сбросить' />
                </ModalFilterWrapper>
                : null}
            {code === 'proizvodstvo' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker code={code} items={proizvodstvo} reset='сбросить' />
                </ModalFilterWrapper>
                : null}
            {code === 'weight_filter' || code === 'ves' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker code={code} items={ves} reset='сбросить' />
                </ModalFilterWrapper>
                : null}
            {code === 'market' || code === 'available' ?
                <div className='pt-1.5'>
                    <ItemChecker code={code} text={name} reset='сбросить' />
                </div>
                : null}
        </div>
    )
}

