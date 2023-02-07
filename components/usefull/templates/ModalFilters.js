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

    useEffect(() => {
    }, [])


    return (
        <div className={`${style.modalFilters} full-height`}>
            <div className={`${style.title} pb-2`}>
                <div className={style.closer} onClick={() => globalState.modal.setIsOpen(false)}>
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
                    <span className='text--upper text--p6 text--bold'>Показать 100 товаров</span>
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
                    <div data-changed={!!isChanged} className={style.filler}>
                        <span className='text--t6 text--color-primary text--upper'>сбросить</span>
                    </div>
                </div>
                {children}

                <div onClick={() => setIsOpen(false)} className={`${style.showBtn} btn btn--primary btn--fill`}>
                    <span className='text--upper text--p6 text--bold'>Показать 100 товаров</span>
                </div>
            </div>
        </>
    )
}

function Filter({ name, code, setActiveFilters }) {
    const { colors, brands, pitanie, proizvodstvo, ves } = filters
    const [isChanged, setIsChanged] = useState(false)

    const getValues = (event, type) => {
        if (type === 'picker') {
            const parent = event.target.closest('.searched-childrens')
            return parent.querySelectorAll('input:checked')
        } else if (type === 'price') {
            if (event.values[0] === event.reset.min && event.values[1] === event.reset.max) return []
            else return event.values
        } else if (type === 'checker') {
            return []
        } else {
            return []
        }
    }
    const changeHandler = (event, type, code) => {
        const active = getValues(event, type)
        const activeTypes = { [code]: active }
        setActiveFilters(prev => {
            return [prev, activeTypes]
        })
        setIsChanged(active.length)
    }

    return (
        <div>
            {code === 'price' ?
                <div className='pb-3 pt-1.5'>
                    <InputRange min={0} max={15000} onAfterChange={event => changeHandler(event, 'price', code)} />
                </div>
                : null}

            {code === 'color' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ColorPicker colors={colors} onAfterChange={event => changeHandler(event, 'picker', code)} />
                </ModalFilterWrapper>
                : null}
            {code === 'brand' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker items={brands} onAfterChange={event => changeHandler(event, 'picker', code)} />
                </ModalFilterWrapper>
                : null}
            {code === 'pitanie' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker items={pitanie} onAfterChange={event => changeHandler(event, 'picker', code)} />
                </ModalFilterWrapper>
                : null}
            {code === 'proizvodstvo' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker items={proizvodstvo} onAfterChange={event => changeHandler(event, 'picker', code)} />
                </ModalFilterWrapper>
                : null}
            {code === 'weight_filter' || code === 'ves' ?
                <ModalFilterWrapper isChanged={isChanged} name={name}>
                    <ItemsPicker items={ves} onAfterChange={event => changeHandler(event, 'picker', code)} />
                </ModalFilterWrapper>
                : null}
            {code === 'market' || code === 'available' ?
                <div className='pt-1.5'>
                    <ItemChecker text={name} onAfterChange={event => changeHandler(event, 'checker', code)} />
                </div>
                : null}
        </div>
    )
}

