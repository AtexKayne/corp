import style from './style.module.scss'
import MainLayout from '../../layout/MainLayout'
import Breadcrumbs from '../../components/Breadcrumbs'
import { useRef, useEffect, useState } from 'react'
import ModalOpener from './ModalOpener/ModalOpener'
import ItemChecker from '../usefull/form/ItemChecker'
import OrderItems from './OrderItems/OrderItems'
import SummTotal from './SummTotal/SummTotal'
import PayMethod from './PayMethod/PayMethod'

export default function ({ detail }) {
    const [summ, setSumm] = useState(10000)

    const itemCheckHandler = (code, isActive) => {
        console.log(code, isActive);
    }

    const clickHandler = () => {
        const rand = Math.floor(Math.random() * 10000)
        console.log(rand);
        setSumm(rand)

    }

    const itemsCheckHandler = (...args) => {
        console.log(args);
    }

    useEffect(() => {
        setSumm(11000)
    }, [])

    return (
        <MainLayout title={`Оформление заказа`}>
            <Breadcrumbs link={['Оформление заказа|/orders']} />
            <div className={`${style.container}`}>
                <div className={`${style.leftSide}`}>
                    <div className='pt-2'>
                        <ModalOpener text='Выберите способ доставки' title='Адрес и способ доставки' modalTemplate='orderAdress' />
                    </div>
                    <div className='pt-2.5'>
                        <ModalOpener text='Выберите получателя' title='Получатель' modalTemplate='orderСonsignee' />
                    </div>
                    <div className='pt-3'>
                        <ItemChecker code='phone' onAfterChange={itemCheckHandler} text='Подтвердить заказ по телефону' />
                    </div>
                    <div className='pt-2'>
                        <ItemChecker code='bonuses' onAfterChange={itemCheckHandler} text='Вступить в бонусную программу<br/>и получить кешбэк 100 Red-баллов' />
                    </div>
                    <div className='pt-3'>
                        <div className='text--t1'>Способы оплаты</div>
                    </div>
                    <PayMethod />
                    <div className={`${style.button}`}>
                        <div onClick={clickHandler} d-disabled='true' fill='true' d-size='md' theme='primary' className='button'>
                            <span className='text--upper text--p5 text--bold text--sparse'>
                                Оплатить
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`${style.rightSide}`}>
                    {detail.itemSet.map((items, index) => (<OrderItems key={index} index={index} checkHandler={itemsCheckHandler} items={items} />))}
                    <SummTotal summ={summ} discount={{ total: 200 }} productsText={'10 товаров'} delivery={`Не выбрано`} />
                </div>
            </div>
        </MainLayout>
    )
}
