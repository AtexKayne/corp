import CardNormal from './CardNormal/CardNormal'
import CardCompact from './CardCompact/CardCompact'
import CardBasket from './CardBasket/CardBasket'

import { useAnimationControls } from 'framer-motion'

export default function Card({ info, mode = 'normal', onChangeCount = () => false }) {
    const animateCounter = useAnimationControls()
    const animateModule = useAnimationControls()
    const animateButton = useAnimationControls()
    const animateInner = useAnimationControls()
    const animate = {
        counter: animateCounter,
        button: animateButton,
        module: animateModule,
        inner: animateInner
    }

    if (mode === 'normal') {
        return <CardNormal animate={animate} onChangeCount={onChangeCount} info={info} />
    } else if (mode === 'compact') {
        return <CardCompact animate={animate} onChangeCount={onChangeCount} info={info} />
    } else if (mode === 'basket') {
        return <CardBasket animate={animate} onChangeCount={onChangeCount} info={info} />
    }
}
