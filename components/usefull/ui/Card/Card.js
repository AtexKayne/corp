import CardNormal from './CardNormal'
import CardCompact from './CardCompact'

export default function Card({ info, mode = 'normal' }) {
    if (mode === 'normal' || mode === 'inline') {
        return <CardNormal info={info} mode={mode} />
    } else if (mode === 'compact') {
        return <CardCompact info={info} mode={mode} />
    }
}