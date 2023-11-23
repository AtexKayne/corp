import Image from 'next/image'
import Icon from '../../Icon'
import InputCheckbox from '../../usefull/form/InputCheckbox'
import style from './style.module.scss'
import { useRef, useEffect, useState } from 'react'
import { debounce } from '../../helpers/debounce'
import { sizeUpdater } from '../../helpers/sizeUpdater'
import Checkbox from '../../usefull/filters/inputs/Checkbox'

export default function OrderItems({ items, index, checkHandler, isStartOpen = true }) {
    const [isOpen, setIsOpen] = useState(isStartOpen)
    const [countMore, setCountMore] = useState(0)
    const [isSelected, setIsSelected] = useState(true)
    const [isBodyActive, setIsBodyActive] = useState(false)

    const setCountPerSize = {
        xxxl: () => setCountMore(items.items.length - 6),
        xxl: () => setCountMore(items.items.length - 5),
        xl: () => setCountMore(items.items.length - 4),
        lg: () => setCountMore(items.items.length - 3),
        md: () => false,
        xs: () => false,
    }

    const selectHandler = (params) => {
        setIsSelected(!isSelected)
        checkHandler(params)
    }

    const clickHandler = () => {
        setIsOpen(!isOpen)
    }

    const bodyClickHandler = () => {
        setIsBodyActive(!isBodyActive)
    }

    const debounceResize = debounce(() => {
        sizeUpdater(setCountPerSize)
    }, 1000)

    useEffect(() => {
        window.addEventListener('resize', debounceResize)
        debounceResize()

        return () => {
            window.removeEventListener('resize', debounceResize)
        }
    }, [])

    return (
        <div data-open={isOpen} className={`${style.container}`}>
            <div className={`${style.head}`}>
                <Checkbox
                    text=''
                    isDisabled
                    item={index}
                    isSelected={isSelected}
                    onAfterChange={() => selectHandler(...arguments)}
                />
                <div onClick={clickHandler} className={`${style.title}`}>
                    Посылка / {items.items.length} шт
                </div>
                <div onClick={clickHandler} className={`${style.icon}`}>
                    <Icon name='chevronUp' />
                </div>
            </div>
            <div data-active={isBodyActive} className={`${style.body}`}>
                {items.items.map(item => (
                    <div key={item.id} className={`${style.item}`}>
                        <div data-is-hidden={!items.isFreeDelivery} className={`${style.deliveryIcon}`}>
                            <Icon name='delivery' width='12' height='12' />
                        </div>
                        <div data-is-hidden={item.count === 1} className={`${style.itemCount}`}>
                            x{item.count}
                        </div>
                        <Image layout='fill' objectFit='cover' alt='order product image' src={item.image} />
                    </div>
                ))}
                <div onClick={bodyClickHandler} data-is-hidden={countMore <= 0} className={`${style.lastItem}`}>
                    {`+ еще ${countMore}`}
                </div>
            </div>
        </div>
    )
}
