import Image from 'next/image'
import Link from 'next/link'


export default function Button({ text = '', href = '', externalClass = '', icon = {} }) {
    if (href) {
        return (
            <Link href={href} pathHref>
                <a className={`${externalClass} c-hover`}>{text}</a>
                <a
                    href={link.link}
                    target='_blank'
                    rel='noreferrer'
                    key={link.name}
                    className={`${externalClass} c-hover`}>
                    <Image width='40' height='40' alt='' src={`/assets/img/contacts/${link.name}-map.svg`} />
                </a>
            </Link>
        )
    } else {
        return (
            <Link href={href} pathHref>
                <a className={`${externalClass} c-hover`}>{text}</a>
            </Link>
        )
    }
}