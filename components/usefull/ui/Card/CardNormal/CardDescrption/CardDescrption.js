export default function CardDescrption({ info, classText, classTitle }) {

    return (
        <>
            <div className={`${classTitle} text--t6 text--normal text--upper pb-0.6 pt-1.5`}>{info.primaryName}</div>
            <div className={`${classText} text--t4 text--normal pb-0.5`}>{info.secondaryName}</div>
        </>

    )
}