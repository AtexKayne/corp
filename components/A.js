import Link from 'next/link';

export default function A({text, href = '/', externalClass = ''}) {
    return (
        <Link href={href} pathHref>
            <a className={`${externalClass} c-hover`}>{text}</a>
        </Link>
    )
}