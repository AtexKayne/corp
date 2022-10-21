import style from '../../styles/module/contacts/contacts-departments.module.scss'


function Line({department}) {
    return (
        <div className={`${style.line} mb-1.5`}>
            <div className='text--h4 mb-1'>{department.name}</div>
            <div className={style.lineImage}>
                <svg id='patternId' width='100%' height='100%'>
                    <defs>
                        <pattern id='a' patternUnits='userSpaceOnUse' width='40' height='20' patternTransform='scale(2) rotate(0)'>
                            <path d='M-10 7.5l20 5 20-5 20 5'  strokeLinecap='square' strokeWidth='1' stroke='#FFA900' fill='none'/>
                        </pattern>
                    </defs>
                    <rect width='100%' height='40' transform='translate(-20, -12)' fill='url(#a)'/>
                </svg>
            </div>
            <span className='text--t1'>{department.phone}</span>
            <span className='text--t1 text--transparent'>{department.mail}</span>
        </div>
    )
}

export default function ContactsDepartments({ departments }) {
    return (
        <section data-scroll-section>
            {departments.items
                ? departments.items.map(department => (
                    <Line key={department.name} department={department}/>
                )) : ''}
        </section>
    )
}
