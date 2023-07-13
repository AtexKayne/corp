import { useState, useEffect, useRef } from 'react'
import style from './Catalog-filters.module.scss'
import Icon from '../../Icon'
import { globalState } from '../../helpers/globalState'
import InputRange from './inputs/InputRange'

export default function CatalogFilters({ filters, setFilters, isFilterOpen, setIsFilterOpen }) {
    const [memoFilters, setMemoFilters] = useState([...filters])
    const closeHandler = () => {
        setIsFilterOpen(false)
        globalState.body.removeClass('overflow-hidden')
    }

    return (
        <div data-open={isFilterOpen} className={style.filterModalWrapper}>
            <div onClick={closeHandler} className={style.filterModalLayout} />
            <div className={style.filterModalContent}>
                <div onClick={closeHandler} className={style.filterModalClose}>
                    <Icon name='close' width='20' height='20' />
                </div>

                {filters.map(filter => <Filter key={filter.code} filters={filters} info={filter} />)}
            </div>
        </div>
    )
}


function Filter({ info, filters }) {
    const code = info.code

    useEffect(() => {
        console.log(filters);
    }, [filters])

    return (
        <div data-code={code} className={style.filterInner}>
            {code === 'price' ?
                <div className='pb-3 pt-1.5'>
                    <InputRange info={info} />
                </div> : null
            }
            
        </div>
    )
}