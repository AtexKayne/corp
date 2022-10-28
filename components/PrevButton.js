import style from '../styles/module/prev-button.module.scss'
import Link from 'next/link'

export default function PrevButton({ text = '' }) {

    return (
        <Link href='/' pathHref>
            <a className={`${style.prevButton} c-hover text--t2`}>
                <svg width="61" height="16" viewBox="0 0 61 16" fill="none">
                    <line y1="-1" x2="30" y2="-1" transform="matrix(1 0 0 -1 31 9)" stroke="currentColor" strokeWidth="2" />
                    <path d="M0.292893 8.70711C-0.0976314 8.31659 -0.0976315 7.68342 0.292892 7.2929L6.65685 0.928934C7.04738 0.53841 7.68054 0.53841 8.07107 0.928934C8.46159 1.31946 8.46159 1.95262 8.07107 2.34315L2.41421 8L8.07107 13.6569C8.46159 14.0474 8.46159 14.6805 8.07107 15.0711C7.68054 15.4616 7.04738 15.4616 6.65686 15.0711L0.292893 8.70711ZM31 9L1 9L1 7L31 7L31 9Z" fill="currentColor" />
                </svg>
                <span className='is-hidden--md-down'>
                    {text}
                </span>
            </a>
        </Link>
    )
}