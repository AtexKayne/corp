import { motion, useAnimationControls } from 'framer-motion'
import { useEffect } from 'react'

export default function Preloader({ animatePreloader, setPreloaderState }) {
    const animatePre = useAnimationControls()
    useEffect(() => {
        animatePre.start({
            x: '0',
            transition: {
                delay: 4.5,
                duration: 0
            }
        }).then(() => {
            setPreloaderState(true)
            animatePre.start({
                x: '-40vw',
                transition: {
                    delay: 1,
                    duration: 1
                }
            }).then(() => {
                setPreloaderState(false)
                animatePre.start({
                    x: '-100vw',
                    zIndex: 4,
                    transition: {
                        duration: 1
                    }
                })
            })
        })


        return () => {
            animatePre.stop()
        }
    }, [])

    return (
        <motion.div
            className='preloader'
            initial={{ x: '0vw' }}
            animate={animatePre}>
            <motion.div
                className='preloader__wrapper'
                initial={{ scale: 1 }}
                animate={{
                    x: '200px',
                    transition: { delay: 5.5, duration: 1 }
                }}>
                <motion.div initial={{ rotate: 30 }} animate={{ rotate: [30, 120, 60], transition: { duration: 5 } }}>
                    <motion.div className='preloader__line' initial={{ width: '0vw', rotate: 45 }}  animate={{ width: ['0vw', '60vw', '60vw', '60vw', '0vw'], rotate: 45,  transition: { delay: 0.1, duration: 4 } }} />
                    <motion.div className='preloader__line' initial={{ width: '0vw', rotate: 90 }}  animate={{ width: ['0vw', '60vw', '60vw', '60vw', '0vw'], rotate: 90,  transition: { delay: 0.3, duration: 4 } }} />
                    <motion.div className='preloader__line' initial={{ width: '0vw', rotate: 135 }} animate={{ width: ['0vw', '60vw', '60vw', '60vw', '0vw'], rotate: 135, transition: { delay: 0.6, duration: 4 } }} />
                    <motion.div className='preloader__line' initial={{ width: '0vw', rotate: 180 }} animate={{ width: ['0vw', '60vw', '60vw', '60vw', '0vw'], rotate: 180, transition: { delay: 0.9, duration: 4 } }} />
                    <motion.div className='preloader__line' initial={{ width: '0vw', rotate: 225 }} animate={{ width: ['0vw', '60vw', '60vw', '60vw', '0vw'], rotate: 225, transition: { delay: 0.1, duration: 4 } }} />
                    <motion.div className='preloader__line' initial={{ width: '0vw', rotate: 270 }} animate={{ width: ['0vw', '60vw', '60vw', '60vw', '0vw'], rotate: 270, transition: { delay: 0.3, duration: 4 } }} />
                    <motion.div className='preloader__line' initial={{ width: '0vw', rotate: 315 }} animate={{ width: ['0vw', '60vw', '60vw', '60vw', '0vw'], rotate: 315, transition: { delay: 0.6, duration: 4 } }} />
                    <motion.div className='preloader__line' initial={{ width: '0vw', rotate: 360 }} animate={{ width: ['0vw', '60vw', '60vw', '60vw', '0vw'], rotate: 360, transition: { delay: 0.9, duration: 4 } }} />
                </motion.div>
                <svg width='100%' height='100%' viewBox='0 0 1440 788' fill='none'>
                    <motion.path
                        d='M719.5 123.175C755.131 123.175 790.413 130.193 823.332 143.828C856.25 157.464 886.161 177.449 911.356 202.644C936.551 227.839 956.536 257.75 970.172 290.668C983.807 323.587 990.825 358.869 990.825 394.5C990.825 430.131 983.807 465.413 970.172 498.332C956.536 531.25 936.551 561.161 911.356 586.356C886.161 611.551 856.25 631.536 823.332 645.172C790.413 658.807 755.131 665.825 719.5 665.825C683.869 665.825 648.587 658.807 615.668 645.172C582.75 631.536 552.839 611.551 527.644 586.356C502.449 561.161 482.464 531.25 468.828 498.331C455.193 465.413 448.175 430.131 448.175 394.5C448.175 358.869 455.193 323.587 468.828 290.668C482.464 257.75 502.449 227.839 527.644 202.644C552.839 177.449 582.75 157.464 615.669 143.828C648.587 130.193 683.869 123.175 719.5 123.175L719.5 123.175Z'
                        stroke='#DADFEA'
                        strokeWidth='1'
                        initial={{ pathLength: 0, rotate: 45 }}
                        animate={{ pathLength: [0, 1, 1, 0], rotate: 305, transition: { delay: 2.0, duration: 3 } }}
                    />
                </svg>
                <svg width='829' height='829' viewBox='0 0 829 829' fill='none'>
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M414.505 146.224L491.875 279.008L492.307 279.749L493.165 279.752L646.844 280.365L570.535 413.76L570.109 414.505L570.535 415.25L646.844 548.646L493.165 549.258L492.307 549.262L491.875 550.003L414.505 682.787L337.136 550.003L336.704 549.262L335.846 549.258L182.167 548.646L258.476 415.25L258.902 414.505L258.476 413.76L182.167 280.365L335.846 279.752L336.704 279.749L337.136 279.008L414.505 146.224Z' stroke='#FFA900' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M267.245 328.057L212.008 212.007L328.058 267.244L330.025 268.18L330.198 266.008L340.386 137.888L413.27 243.749L414.505 245.544L415.741 243.749L488.625 137.888L498.813 266.008L498.986 268.18L500.953 267.244L617.003 212.007L561.766 328.057L560.83 330.024L563.002 330.197L691.122 340.386L585.261 413.269L583.466 414.505L585.261 415.74L691.122 488.624L563.002 498.813L560.83 498.985L561.766 500.953L617.003 617.002L500.953 561.766L498.986 560.829L498.813 563.001L488.625 691.121L415.741 585.26L414.505 583.466L413.27 585.26L340.386 691.121L330.198 563.001L330.025 560.829L328.058 561.766L212.008 617.002L267.245 500.953L268.181 498.985L266.009 498.813L137.889 488.624L243.75 415.74L245.544 414.505L243.75 413.269L137.889 340.386L266.009 330.197L268.181 330.024L267.245 328.057Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M325.609 361.754L292.778 292.777L361.755 325.608L363.722 326.544L363.894 324.373L369.95 248.222L413.27 311.142L414.506 312.937L415.741 311.142L459.061 248.222L465.117 324.373L465.289 326.544L467.257 325.608L536.233 292.777L503.402 361.754L502.466 363.721L504.638 363.893L580.788 369.949L517.868 413.269L516.073 414.505L517.868 415.74L580.788 459.06L504.637 465.116L502.466 465.288L503.402 467.256L536.233 536.232L467.257 503.401L465.289 502.465L465.117 504.637L459.061 580.787L415.741 517.867L414.506 516.072L413.27 517.867L369.95 580.787L363.894 504.637L363.722 502.465L361.755 503.401L292.778 536.232L325.609 467.256L326.545 465.288L324.374 465.116L248.223 459.06L311.143 415.74L312.938 414.505L311.143 413.269L248.223 369.949L324.374 363.894L326.545 363.721L325.609 361.754Z' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M348.596 396.844L370.065 390.013L371.368 389.599L371.075 388.263L366.257 366.255L388.264 371.074L389.6 371.367L390.015 370.064L396.845 348.595L413.495 363.772L414.506 364.693L415.516 363.772L432.166 348.595L438.997 370.064L439.412 371.367L440.747 371.074L462.755 366.255L457.936 388.263L457.644 389.599L458.947 390.013L480.416 396.844L465.238 413.494L464.317 414.505L465.238 415.515L480.416 432.165L458.947 438.996L457.644 439.41L457.936 440.746L462.755 462.754L440.747 457.935L439.412 457.643L438.997 458.946L432.166 480.414L415.516 465.237L414.506 464.316L413.495 465.237L396.845 480.414L390.015 458.946L389.6 457.643L388.264 457.935L366.256 462.754L371.075 440.746L371.368 439.41L370.065 438.996L348.596 432.165L363.773 415.515L364.694 414.505L363.773 413.494L348.596 396.844Z' stroke='#E21B25' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M390.31 408.021L399.313 403.701L399.998 403.373L400.139 402.626L401.981 392.811L411.402 396.123L412.119 396.375L412.746 395.946L420.989 390.309L425.309 399.312L425.637 399.997L426.384 400.137L436.199 401.98L432.887 411.401L432.635 412.118L433.064 412.745L438.701 420.988L429.698 425.308L429.013 425.636L428.873 426.383L427.03 436.198L417.609 432.886L416.892 432.634L416.265 433.063L408.022 438.7L403.703 429.697L403.374 429.012L402.627 428.872L392.812 427.029L396.124 417.608L396.376 416.891L395.947 416.264L390.31 408.021Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M414.517 150.726V314.071' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M414.495 678.284L414.495 514.939' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M282.625 186.06L364.297 327.521' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M546.386 642.949L464.713 501.489' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M186.072 282.606L327.533 364.279' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M642.939 546.404L501.479 464.731' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M150.727 414.494L314.071 414.494' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M678.285 414.516L514.94 414.516' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M678.285 414.516L514.94 414.516' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M186.061 546.386L327.522 464.714' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M642.95 282.625L501.489 364.298' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M282.607 642.94L364.28 501.479' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M546.405 186.072L464.732 327.533' stroke='#8712FC' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M294.341 34.2744L328.457 25.1331L319.315 59.2489L294.341 34.2744Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M534.67 794.736L500.555 803.877L509.696 769.761L534.67 794.736Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M120.324 145.298L145.299 120.323L154.44 154.439L120.324 145.298Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M708.687 683.712L683.712 708.686L674.571 674.57L708.687 683.712Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M25.1335 328.455L34.2748 294.34L59.2493 319.314L25.1335 328.455Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M803.877 500.554L794.736 534.67L769.761 509.696L803.877 500.554Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M34.2746 534.67L25.1333 500.554L59.2491 509.695L34.2746 534.67Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M794.736 294.34L803.877 328.456L769.762 319.315L794.736 294.34Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M145.299 708.686L120.324 683.711L154.44 674.57L145.299 708.686Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M683.712 120.324L708.687 145.298L674.571 154.439L683.712 120.324Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M328.456 803.877L294.34 794.736L319.315 769.761L328.456 803.877Z' stroke='#DADFEA' strokeWidth='3' />
                    <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1, transition: { delay: 4, duration: 2 } }} d='M500.555 25.133L534.671 34.2743L509.696 59.2488L500.555 25.133Z' stroke='#DADFEA' strokeWidth='3' />
                </svg>
            </motion.div>
        </motion.div>
    );
}
