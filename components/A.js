import Link from 'next/link';

const A = ({text, href, externalClass = ''}) => {
    return (
        <Link href={href} pathHref>
            <a className={`${externalClass} c-hover`}>{text}</a>
        </Link>
    );
}
 
export default A;