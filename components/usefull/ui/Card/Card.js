import CardNormal from './CardNormal/CardNormal'
import CardCompact from './CardCompact/CardCompact'
import { useAnimationControls } from 'framer-motion'

export default function Card({ info, mode = 'normal' }) {
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
    
    if (mode === 'normal' || mode === 'inline') {
        return <CardNormal info={info} animate={animate} mode={mode} />
    } else if (mode === 'compact') {
        return <CardCompact animate={animate} info={info} mode={mode} />
    }
}