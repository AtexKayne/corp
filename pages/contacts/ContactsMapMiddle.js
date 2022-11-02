import { useRef, useEffect } from 'react'
import { motion, useAnimationControls, useInView } from 'framer-motion'
import Image from 'next/image'

export default function ContactsMapMiddle() {
    const refSVG = useRef(null)
    const isInView = useInView(refSVG)
    const animatePath = useAnimationControls()
    const animateImage = useAnimationControls()

    useEffect(() => {
        if (isInView) {
            animatePath.start({ pathLength: 1, transition: { duration: 1, delay: 0.1 } })
            animateImage.start({ opacity: 1, transition: {duration: 0.5, delay: 0.4}})
        } else {
            animatePath.start({ pathLength: 0, transition: { duration: 0 } })
            animateImage.start({ opacity: 0, transition: { duration: 0 } })
        }
    }, [isInView])

    return (
        <div ref={refSVG}>
            <svg ref={refSVG} width='717' height='422' viewBox='0 0 717 422' fill='none'>
                <g>
                    <motion.path animate={animatePath} d='M471.284 415.093C467.315 374.096 455.017 287.393 437.572 268.553C420.126 249.712 342.204 183.652 305.424 152.978M305.424 152.978C289.257 177.203 233.201 215.257 192.03 242.821M305.424 152.978C276.722 173.916 213.861 221.198 192.03 242.821M305.424 152.978C323.654 136.583 354.113 108.648 372.821 90.0143M192.03 242.821C140.567 277.275 104.804 323.069 81.2529 341.386C66.5836 352.796 40.3873 368.471 21.6841 379.107M7.9834 386.744C11.6528 384.748 16.3655 382.131 21.6841 379.107M21.6841 379.107L7.9834 346.62M389.089 71.582C390.426 64.2264 406.141 51.8555 433.223 74.9255C460.305 97.9954 517.478 123.74 528.512 136.445C531.246 139.594 538.286 147.059 547.468 156.646M389.089 71.582C390.745 81.7369 390.597 84.4119 400.192 91.4837M389.089 71.582C388.73 73.5574 382.276 80.5981 372.821 90.0143M616.779 228.056C612.02 223.194 606.306 217.347 600.096 210.979M650.549 3.70954C641.541 17.0721 632.991 29.246 624.949 40.3505M547.468 156.646C538.05 142.725 569.4 117.046 624.949 40.3505M547.468 156.646C562.445 172.286 583.121 193.573 600.096 210.979M624.949 40.3505L675.294 84.9519M710.397 116.05L675.294 84.9519M675.294 84.9519L714.409 42.4938M600.096 210.979C621.46 224.713 665.26 180.914 708.725 142.798M76.024 79.3636L163.777 5.81089M172.152 25.8376L150.305 1.80554M522.37 160.236C515.927 160.055 491.665 152.125 446.151 121.855C421.175 105.244 407.7 97.0177 400.192 91.4837M400.192 91.4837C393.571 87.3449 378.827 81.2567 372.821 90.0143' stroke='#E4DABB' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
                    <motion.path animate={animatePath} d='M14.3276 15.6256C32.6159 31.5677 77.3976 76.6809 110.219 129.597C151.245 195.741 200.644 266.072 233.298 299.563C259.421 326.356 313.397 387.198 337.12 414.27M513.785 414.27C547.118 399.931 603.084 373.283 648.121 345.656M713.067 293.371C708.123 300.628 700.189 308.47 690.186 316.585M705.96 392.332C699.546 375.68 683.448 340.155 670.368 331.269M670.368 331.269C666.118 328.808 658.965 323.207 649.419 313.76M670.368 331.269C663.397 336.055 655.923 340.87 648.121 345.656M670.368 331.269C677.575 326.321 684.245 321.405 690.186 316.585M539.23 171.557C543.164 174.508 555.227 186.817 572.006 212.452C595.042 249.062 615.426 275.929 631.846 294.867M631.846 294.867C642.949 307.14 647.478 304.205 655.351 298.788M631.846 294.867C638.354 302.373 644.239 308.633 649.419 313.76M649.419 313.76C653.804 318.918 659.682 332.518 648.121 345.656M690.186 316.585C667.761 281.085 613.414 204.943 575.426 184.378' stroke='#FFA900' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
                    <motion.path animate={animatePath} d='M710.612 362.612C677.232 310.591 598.117 197.836 548.698 162.982C499.278 128.128 371.177 45.7474 313.304 8.91387M706.241 374.141C679.171 329.585 615.245 232.199 576.102 199.109C548.113 175.448 453.805 112.378 373.256 59.7295M288.585 4.90869C311.246 19.4253 341.159 38.75 373.256 59.7295M373.256 59.7295C364.032 56.5884 330.451 41.2266 269.921 4.90869' stroke='#FFA900' strokeWidth='7' strokeLinecap='round' strokeLinejoin='round' />
                </g>
            </svg>
            <motion.div animate={animateImage} className='p-absolute'>
                <Image src='/assets/img/contacts/map-text-middle.svg' layout='fill' alt='' />
            </motion.div>
        </div>
    )
}