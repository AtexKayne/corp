import style from './style.module.scss'

export default function CardValues({ info }) {
    if ((!info.values && !info.color)) return null

    return (
        <div className={`${style.values}`}>
            {!info.values
                ? <Color color={info.color} />
                : <Volume values={info.values} />
            }
        </div>
    )
}

function Color({ color }) {
    return (
        <div>
            <div className={`${style.colorIcon} iconColorVariant`}>
                <span data-color={color.toLowerCase()} className={`iconColor`} />

                <div>{color}</div>
            </div>
        </div>
    )
}

function Volume({ values }) {
    return (
        <div style={{ '--count-values': `"+${values.length}"` }} className={`${style.volumePicker}`}>
            {values && values.length
                ? values.map((item, index) => {
                    return (
                        <div key={item} data-disabled={true} data-active={index === 0}>
                            {item}
                        </div>
                    )
                }) : null}
        </div>
    )
}
