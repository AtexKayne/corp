import Link from "next/link";

export default function CardDescrption({ info, mode, classText, classTitle }) {

    return (
        <>
            {mode === 'inline'
                ? <>
                    <div className={`${classTitle} text--t6 text--normal text--upper pb-0.6 pt-1.5`}>{info.primaryName}</div>
                    <Link href='/'>
                        <div className={`${classText} text--t4 text--normal c-pointer pb-1`}>{info.secondaryName}</div>
                    </Link>
                </>
                : <>
                    <div className={`${classTitle} text--t6 text--normal text--upper pb-0.6 pt-1.5`}>{info.primaryName}</div>
                    <div className={`${classText} text--t4 text--normal pb-1`}>{info.secondaryName}</div>
                </>
            }
        </>

    )
}