import style from './style.module.scss'
import { useRef, useEffect, useState } from 'react'

export default function PayMethod({ }) {
    return (
        <div className={`${style.payMethods}`}>
            <div className={`${style.payMethod}`}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M3 6.96484L6.89141 13.8915V18.1166L3.00455 25.0296L3 6.96484Z" fill="#5B57A2" />
                    <path d="M17.9414 11.3732L21.5878 9.14756L29.0504 9.14062L17.9414 15.9177V11.3732Z" fill="#D90751" />
                    <path d="M17.919 6.92453L17.9396 16.0952L14.0391 13.7085V0L17.9192 6.92453H17.919Z" fill="#FAB718" />
                    <path d="M29.0485 9.13893L21.5857 9.14587L17.919 6.92453L14.0391 0L29.0483 9.13893H29.0485Z" fill="#ED6F26" />
                    <path d="M17.9396 25.068V20.6187L14.0391 18.2773L14.0412 31.9995L17.9396 25.068Z" fill="#63B22F" />
                    <path d="M21.5787 22.8627L6.89115 13.8915L3 6.96484L29.0346 22.8536L21.5785 22.8627H21.5787Z" fill="#1487C9" />
                    <path d="M14.043 32.0013L17.9408 25.0699L21.5781 22.8645L29.034 22.8555L14.043 32.0013Z" fill="#017F36" />
                    <path d="M3.00391 25.0295L14.0722 18.2775L10.3511 16.0039L6.89077 18.1164L3.00391 25.0295Z" fill="#984995" />
                </svg>

                <div className='text--t6 text--upper pt-0.8'>Система быстрых платежей</div>
            </div>
            <div className={`${style.payMethod}`}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M20 19.5C20 18.6716 20.6716 18 21.5 18H24.5C25.3284 18 26 18.6716 26 19.5C26 20.3284 25.3284 21 24.5 21H21.5C20.6716 21 20 20.3284 20 19.5Z" fill="#112233" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.5 4C1.567 4 0 5.567 0 7.5V24.5C0 26.433 1.567 28 3.5 28H28.5C30.433 28 32 26.433 32 24.5V7.5C32 5.567 30.433 4 28.5 4H3.5ZM29 10V7.5C29 7.22386 28.7762 7 28.5 7H3.5C3.22386 7 3 7.22386 3 7.5V10H29ZM3 13H29V24.5C29 24.7762 28.7762 25 28.5 25H3.5C3.22386 25 3 24.7762 3 24.5V13Z" fill="#112233" />
                </svg>
                <div className='text--t6 text--upper pt-0.8'>Банковская карта</div>
            </div>
        </div>
    )
}
