import Icon from '../../Icon'
import { globalState } from '../../helpers/globalState'
import Input from '../form/Input'
import style from './style-modules/modal-order-adress.module.scss'
import { useRef, useEffect, useState } from 'react'

export default function ModalOrderAdress({ data }) {
    const [step, setStep] = useState(1)
    const [city, setCity] = useState('г. Москва')

    const prevStepHandler = () => {
        data.onAfrerChange('Выберите способ доставки')
        setStep(1)
    }

    return (
        <div className={`${style.container} modal-steps`}>
            <div className='modal-step1'>
                <StepOne city={city} setCity={setCity} data={data} setStep={setStep} />
            </div>
            <div className='modal-step' data-step-active={step === 2}>
                <div className='modal-step__head'>
                    <div onClick={prevStepHandler} className='modal-step__prev is-extended'>
                        <Icon name='chevronLeft' width='20' height='20' />
                    </div>
                    <div className='modal-step__title d-flex flex--align-center flex--center'>
                        <span className='mr-0.5'>{city}</span>
                        <Icon name='navigation' width='16' height='16' />
                    </div>
                </div>
                <StepCourier city={city} setCity={setCity} data={data} setStep={setStep} />
            </div>

            <div className='modal-step' data-step-active={step === 3}>
                <div className='modal-step__head'>
                    <div onClick={prevStepHandler} className='modal-step__prev is-extended'>
                        <Icon name='chevronLeft' width='20' height='20' />
                    </div>
                    <div className='modal-step__title d-flex flex--align-center flex--center'>
                        <span className='mr-0.5'>{city}</span>
                        <Icon name='navigation' width='16' height='16' />
                    </div>
                </div>
                <StepAdress city={city} setCity={setCity} data={data} setStep={setStep} />
            </div>
        </div>
    )
}

function StepOne({ city, setCity, data, setStep }) {
    const courierSelect = () => {
        data.onAfrerChange('Курьерская доставка')
        setStep(2)
    }

    const adressSelect = () => {
        data.onAfrerChange('Пункт выдачи заказов')

        setStep(3)
    }

    return (
        <>
            <div className='text--a3 text--bold pt-2'>Выберите способ доставки</div>
            <div className='d-flex flex--between flex--align-center mt-2'>
                <div className='text--a4 text--bold'>{city}</div>
                <div className='text--t6 text--sparse text--upper text--color-primary text--bold c-pointer'>Изменить</div>
            </div>
            <div className='mt-2'>
                <div onClick={courierSelect} className={`${style.orderSelecter}`}>
                    <div className='text--upper text--bold text--t5'>
                        курьер
                    </div>
                    <div className='text--t4 text--color-light'>
                        Доставка до двери
                    </div>

                    <svg className={style.selecterSvgUp} width="80" height="70" viewBox="0 0 80 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8.24051 -7.11719H78.9409V58.6866H64.7323C64.5373 58.6866 64.3793 58.5285 64.3793 58.3336C64.3793 58.1387 64.5373 57.9807 64.7323 57.9807H78.2351V-6.41131H10.101L35.3119 15.936L15.0071 37.2208L1.17347 24.5816C1.02957 24.4501 1.0195 24.2269 1.15098 24.083C1.28245 23.9391 1.5057 23.929 1.6496 24.0605L14.9732 36.2337L34.2958 15.9786L8.24051 -7.11719Z" fill="#112233" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M38.6116 23.0139C38.6414 22.8212 38.8218 22.6892 39.0144 22.719L51.6861 24.6803L71.4212 35.7421L71.2892 36.0366C70.3673 38.0938 69.0469 39.2965 67.5017 39.8664C65.9686 40.4318 64.2587 40.3581 62.5757 39.9538C59.757 39.2766 56.9206 37.6484 54.9166 36.3357L65.0523 58.1865C65.1343 58.3633 65.0574 58.5731 64.8806 58.6552C64.7038 58.7372 64.4939 58.6603 64.4119 58.4835L53.1967 34.3054L54.2641 35.0445C56.2301 36.4059 59.5205 38.4938 62.7406 39.2674C64.3471 39.6534 65.9028 39.7038 67.2574 39.2041C68.5299 38.7348 69.6648 37.7655 70.5085 36.0398L51.4522 25.3584L38.9064 23.4166C38.7138 23.3868 38.5818 23.2065 38.6116 23.0139Z" fill="#E21B25" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.0957 31.9883H9.80159V58.1205H30.0937V58.8264H9.0957V31.9883Z" fill="#112233" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M21.7788 39.4703C21.9578 39.3932 22.1654 39.4758 22.2426 39.6548L32.628 63.7554C33.1405 64.6926 34.0288 65.4786 35.2483 65.5863C36.4455 65.6921 38.0602 65.1536 40.0685 63.2623L37.8022 57.6294C37.7295 57.4486 37.8171 57.243 37.9979 57.1703C38.1788 57.0975 38.3844 57.1851 38.4571 57.366L40.8091 63.212C41.248 64.1546 42.174 65.2521 43.4679 65.5695C44.7042 65.8728 46.4092 65.4927 48.5231 63.2776L44.8706 54.5675C44.7952 54.3877 44.8799 54.1809 45.0596 54.1055C45.2394 54.0301 45.4462 54.1148 45.5216 54.2945L49.2614 63.213C49.647 64.0882 50.6591 65.2713 52.0217 65.5319C53.3138 65.7791 55.0899 65.221 57.1213 62.3425L51.9434 51.3756C51.8602 51.1993 51.9356 50.989 52.1118 50.9057C52.2881 50.8225 52.4985 50.8979 52.5817 51.0742L57.849 62.2304L57.851 62.235C58.2431 63.1304 59.0652 64.4487 60.2158 65.1426C60.7821 65.4841 61.4208 65.6705 62.132 65.5915C62.8457 65.5122 63.6687 65.1615 64.5933 64.364C64.7408 64.2366 64.9637 64.2531 65.091 64.4007C65.2184 64.5483 65.2019 64.7711 65.0543 64.8984C64.0509 65.764 63.0992 66.1943 62.2099 66.2931C61.3182 66.3921 60.5257 66.1538 59.8512 65.747C58.7549 65.0859 57.9523 63.9706 57.4699 63.0646C55.4427 65.7954 53.5098 66.5353 51.8891 66.2252C50.4643 65.9527 49.4052 64.8865 48.8513 63.9527C46.7132 66.1137 44.8294 66.6303 43.2998 66.2551C41.9278 65.9185 40.944 64.8868 40.3881 63.9288C38.3715 65.7757 36.624 66.4165 35.1862 66.2895C33.662 66.1548 32.5904 65.1671 32 64.0781L31.9924 64.0642L21.5943 39.9341C21.5172 39.7551 21.5998 39.5474 21.7788 39.4703Z" fill="#E21B25" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M35.9756 -7.11719H52.1999V4.46157H35.9756V-7.11719ZM36.6815 -6.41131V3.75569H51.494V-6.41131H36.6815Z" fill="#112233" />
                    </svg>

                </div>
                <div onClick={adressSelect} className={`${style.orderSelecter}`}>
                    <div className='text--upper text--bold text--t5'>
                        пункт выдачи заказов
                    </div>
                    <div className='text--t4 text--color-light'>
                        Самовывоз
                    </div>

                    <svg className={style.selecterSvgDown} width="80" height="72" viewBox="0 0 80 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M63.5293 23.4129H16.2352C9.60776 23.4129 4.23518 28.7855 4.23518 35.4129V66.2697H75.5293V35.4129C75.5293 28.7855 70.1567 23.4129 63.5293 23.4129ZM16.2352 22.707C9.21791 22.707 3.5293 28.3957 3.5293 35.4129V66.9755H76.2352V35.4129C76.2352 28.3957 70.5466 22.707 63.5293 22.707H16.2352Z" fill="#112233" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M22.7788 23.4129H16.2352C9.60776 23.4129 4.23518 28.7855 4.23518 35.4129V66.2697H34.7788V35.4129C34.7788 28.7855 29.4062 23.4129 22.7788 23.4129ZM16.2352 22.707C9.21791 22.707 3.5293 28.3957 3.5293 35.4129V66.9755H35.4847V35.4129C35.4847 28.3957 29.7961 22.707 22.7788 22.707H16.2352Z" fill="#112233" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.39258 60.1733C9.39258 59.9783 9.5506 59.8203 9.74552 59.8203H29.5615C29.7564 59.8203 29.9144 59.9783 29.9144 60.1733C29.9144 60.3682 29.7564 60.5262 29.5615 60.5262H9.74552C9.5506 60.5262 9.39258 60.3682 9.39258 60.1733Z" fill="#112233" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M41.7017 66.9766C41.8967 66.9766 42.0547 67.1346 42.0547 67.3295L42.0547 76.5914C42.0547 76.7863 41.8967 76.9443 41.7017 76.9443C41.5068 76.9443 41.3488 76.7863 41.3488 76.5914L41.3488 67.3295C41.3488 67.1346 41.5068 66.9766 41.7017 66.9766Z" fill="#112233" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M47.858 13.3242C48.0529 13.3242 48.2109 13.4822 48.2109 13.6772L48.2109 37.3043C48.2109 37.4992 48.0529 37.6572 47.858 37.6572C47.6631 37.6572 47.5051 37.4992 47.5051 37.3043L47.5051 13.6772C47.5051 13.4822 47.6631 13.3242 47.858 13.3242Z" fill="#E21B25" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M47.7983 37.7176C45.5646 37.7176 43.7537 39.5284 43.7537 41.7622C43.7537 43.996 45.5646 45.8068 47.7983 45.8068C50.0321 45.8068 51.8429 43.996 51.8429 41.7622C51.8429 39.5284 50.0321 37.7176 47.7983 37.7176ZM43.0479 41.7622C43.0479 39.1386 45.1747 37.0117 47.7983 37.0117C50.4219 37.0117 52.5488 39.1386 52.5488 41.7622C52.5488 44.3858 50.4219 46.5127 47.7983 46.5127C45.1747 46.5127 43.0479 44.3858 43.0479 41.7622Z" fill="#E21B25" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M75.0011 4.94416H48.4461C48.3161 4.94416 48.2108 5.04951 48.2108 5.17946V13.207H75.0011C75.131 13.207 75.2364 13.1016 75.2364 12.9717V5.17946C75.2364 5.04951 75.131 4.94416 75.0011 4.94416ZM48.4461 4.23828C47.9263 4.23828 47.5049 4.65966 47.5049 5.17946V13.9129H75.0011C75.5209 13.9129 75.9423 13.4915 75.9423 12.9717V5.17946C75.9423 4.65966 75.5209 4.23828 75.0011 4.23828H48.4461Z" fill="#E21B25" />
                    </svg>

                </div>
            </div>
        </>
    )
}

function StepCourier({ data }) {
    const [isButtonActive, setIsButtonActive] = useState('true')
    const refValue = useRef({})

    const clickHandler = () => {
        globalState.modal.open('orderСonsignee', true)
    }

    const changeHandler = (name, value) => {
        refValue.current[name] = value
        const text = value ? `${value}</br>Курьерская доставка` : 'Курьерская доставка'
        data.onAfrerChange(text)
        setIsButtonActive(!refValue.current.adressPrimary)
    }

    return (
        <div className={`${style.courierForm}`}>
            <div>
                <div className='text--a3 text--bold pb-1 pt-2'>Добавить новый адрес</div>
                <div className='pt-2'>
                    <Input placeholder='Улица и дом *' name='adressPrimary' isCleared onChange={changeHandler} />
                </div>
                <div className='pt-2'>
                    <Input placeholder='Квартира / офис' name='adressSecondary' isCleared onChange={changeHandler} />
                </div>
                <div className='pt-2'>
                    <Input placeholder='Комментарий к адресу' name='adressComment' isCleared onChange={changeHandler} />
                </div>
            </div>
            <div onClick={clickHandler} d-disabled={`${isButtonActive}`} fill='true' d-size='md' theme='primary' className='button'>
                <span className='text--upper text--p5 text--bold text--sparse'>
                    сохранить
                </span>
            </div>
        </div>
    )
}

function StepAdress({ }) {
    const clickHandler = () => {

    }

    return (
        <div className={`${style.stepAdress}`}>
            <div className='text--a3 text--bold pb-1 pt-2'>Выберите удобный ПВЗ</div>
            <div className={`${style.orderPoint} mt-2 mb-2`}>
                <div className={`${style.pointBtn}`}>
                    <div />
                </div>
                <div className={`${style.pointDescription}`}>
                    <div className='text--upper text--t6 pb-0.5'>Почта россии</div>
                    <div className='text--bold text--t4'>919338 г Москва, пр-кт Мира, 110/2</div>
                    <div className='text--t5'>Почтомат - 919338</div>
                    <div className='text--t5'>Доставка после 23 октября</div>
                </div>
                <div className={`${style.pointInfo}`}>
                    <Icon name='info' width='16' height='16' />
                </div>
            </div>

            <div onClick={clickHandler} d-disabled='true' fill='true' d-size='md' theme='primary' className='button'>
                <span className='text--upper text--p5 text--bold text--sparse'>
                    привезти сюда
                </span>
            </div>
        </div>
    )
}