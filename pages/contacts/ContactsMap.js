import style from '../../styles/module/contacts/map.module.scss'
import { SmoothScrollContext } from '../../components/helpers/SmoothScroll.context'
import { useEffect, useRef, useContext } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function ContactsMap({ adress = {} }) {
    const refContainer = useRef(null)
    const refStartPos = useRef(null)
    const refSection = useRef(null)
    const { scroll } = useContext(SmoothScrollContext)
    const y = useMotionValue(0)
    const transformRoadA = useTransform(y, [100, 800], [0, 1])
    const transformRoadB = useTransform(y, [200, 800], [0, 1])
    const transformRoadC = useTransform(y, [500, 800], [0, 1])
    const opacityRoad = useTransform(y, [0, 100], [0, 1])

    useEffect(() => {
        if (!scroll) return

        const scrollHandler = event => {
            if (!refContainer.current.classList.contains('is-inview')) return
            if (!refStartPos.current) refStartPos.current = Math.floor(event.scroll.y)
            y.set(event.scroll.y - refStartPos.current)
        }

        scroll.on('scroll', scrollHandler)

        const observerHandler = entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) refContainer.current.classList.remove('is-inview')
                else if (refStartPos.current) refContainer.current.classList.add('is-inview')
            })
        }
        const observer = new IntersectionObserver(observerHandler, { threshold: 0 })
        observer.observe(refSection.current)

        return () => {
            scroll.off('scroll', scrollHandler)
            observer.disconnect()
        }
    }, [scroll]);

    return (
        <section ref={refSection} id='map' style={{ height: `calc(100vh + 800px)` }} data-scroll-section>
            <div className={style.container}>
                <div id='info' style={{minHeight: 'calc(100vh + 300px)'}} className='col col--30'>
                    <div 
                        data-scroll
                        data-scroll-sticky
                        // data-scroll-position='bottom'
                        data-scroll-target='#info'
                        // data-scroll-offset='-20%'
                        data-scroll-speed='-1'
                        className='pt-1'>
                        <div className='text--h2 pb-0.5'>{adress.city}</div>
                        <div className={`${style.adressInfo} mb-0.5`}>
                            <div className={style.metro}>
                                <Image src='/assets/img/icons/icon-metro.svg' width='30' height='30' alt='metro' />
                                <div className='text--t2'>{adress.metro}</div>
                            </div>
                            <div className='text--t2'>{adress.street}</div>
                            <div className='text--t2'>{adress.house}</div>
                        </div>

                        <div className={`${style.links} mb-2`}>
                            {adress.maps
                                ? adress.maps.map(link => (
                                    <a
                                        href={link.link}
                                        target='_blank'
                                        rel='noreferrer'
                                        key={link.name}
                                        className={`${style.linkItem} c-hover`}>
                                        <Image width='40' height='40' alt='' src={`/assets/img/contacts/${link.name}-map.svg`} />
                                    </a>
                                )) : ''}
                        </div>

                        <div className='text--h4 pb-1'>{adress.social.title}</div>

                        <div className={`${style.links} mb-1`}>
                            {adress.social.icons
                                ? adress.social.icons.map(link => (
                                    <a
                                        href={link.link}
                                        target='_blank'
                                        rel='noreferrer'
                                        key={link.name}
                                        className={`${style.socialsItem} text--t2 c-hover`}>
                                        {link.name}
                                    </a>
                                )) : ''}
                        </div>

                        <div className={`${style.links} mb-0.5`}>
                            <div className='text--t2'>{adress.bots.title}</div>
                            {adress.bots.icons
                                ? adress.bots.icons.map(link => (
                                    <a
                                        href={link.link}
                                        target='_blank'
                                        rel='noreferrer'
                                        key={link.name}
                                        className={`${style.botsItem} c-hover`}>
                                        <Image width='25' height='25' alt='' src={`/assets/img/icons/icon-${link.name}.svg`} />
                                    </a>
                                )) : ''}
                        </div>
                    </div>
                </div>
                <div ref={refContainer} data-scroll data-scroll-sticky data-scroll-target='#map' className='col col--70 pt-1 pl-1'>
                    <motion.div className={style.map} style={{ opacity: opacityRoad }}>
                        <div className={style.layout}>
                            <svg width='641' height='422' viewBox='0 0 641 422' fill='none'>
                                <motion.path
                                    d='M352.015 406.057C351.734 403.261 351.428 400.283 351.099 397.154M255.507 188.044C275.662 203.16 318.179 236.763 327.016 250.251C335.319 262.924 345.983 348.449 351.099 397.154M255.507 188.044C221.106 218.978 158.029 273.126 113.356 304.475M255.507 188.044C266.53 179.846 289.049 159.613 290.938 144.263M71.7953 328.154C60.1678 330.945 52.61 305.287 50.2845 292.109M71.7953 328.154C80.7835 325.775 95.6192 316.922 113.356 304.475M71.7953 328.154C69.8574 327.185 63.8885 341.409 55.5168 406.057M113.356 304.475L99.1194 277.575M351.099 397.154C362.263 394.791 386.271 389.039 392.992 384.932C396.788 382.612 414.494 365.81 433.843 346.235M638.516 164.147C608.966 185.556 559.353 222.469 525.412 250.251M510.629 262.647C499.677 272.112 491.966 279.597 489.615 283.641C485.09 291.424 470.812 307.626 454.534 324.849M510.629 262.647C526.563 275.104 556.31 297.524 586.317 318.276M510.629 262.647C515.071 258.808 520.046 254.644 525.412 250.251M638.516 351.791C623.08 343.01 604.65 330.955 586.317 318.276M633.848 212.691C626.307 218.789 619.244 224.759 612.618 230.574M498.483 328.452C504.329 330.578 510.08 329.174 516.624 324.849M516.624 324.849C520.224 330.095 529.477 341.055 537.693 342.922M516.624 324.849C527.649 317.561 540.924 301.98 560.691 281.013M586.317 318.276C580.533 329.448 568.313 351.791 565.699 351.791C562.432 351.791 563.057 358.326 586.317 367.194M560.691 281.013L525.412 250.251M560.691 281.013C574.404 266.468 591.241 249.332 612.618 230.574M525.412 250.251C503.527 227.289 488.2 204.172 468.026 180.039M612.618 230.574C591.777 213.427 551.753 169.185 520.003 132.557M382.723 183.285C398.187 163.422 410.623 146.6 420.742 132.557M420.742 132.557C460.409 77.5071 464.454 65.1561 475.611 79.6604C481.224 86.9573 498.762 108.054 520.003 132.557M420.742 132.557C429.644 139.972 437.545 147.256 444.716 154.432M633.848 64.2568C631.987 59.1223 625.134 51.9339 612.618 64.2568C605.098 71.6611 586.762 85.6066 568.134 99.1139M520.003 132.557C508.473 145.266 481.936 172.553 468.026 180.039M520.003 132.557C527.542 127.788 548.008 113.707 568.134 99.1139M468.026 180.039C454.202 191.39 425.391 215.119 420.742 219.226C416.093 223.334 414.308 220.938 413.997 219.226M468.026 180.039C461.004 171.638 453.394 163.115 444.716 154.432M444.716 154.432C470.944 132.557 530.691 53.9877 537.226 59.1223C542.454 63.2299 560.009 87.4949 568.134 99.1139M2.30078 44.1854C8.3418 36.1308 22.8025 24.2209 32.511 40.6948M12.1032 53.9877L32.6412 40.918C32.5979 40.843 32.5545 40.7687 32.511 40.6948M32.511 40.6948C44.8462 32.0561 74.8379 12.9115 96.1228 5.44307M40.1098 59.5891L62.9818 48.8532M84.9202 86.1953L140 38.1174M275.048 327.292C254.78 348.7 215.46 391.744 220.324 392.656M264.787 370.615C267.447 372.515 295.949 409.758 295.949 417.358M433.843 346.235L446.819 384.932M433.843 346.235C440.716 339.281 447.796 331.978 454.534 324.849M446.819 384.932H439.979M446.819 384.932H457.84M454.534 324.849C456.016 326.93 458.752 332.916 457.84 340.213C456.7 349.333 454.04 379.487 457.84 384.932M457.84 384.932H489.615M489.615 384.932L498.483 361.494M489.615 384.932C490.536 386.945 491.285 394.937 488.095 411.702M486.342 420.018C487.027 417.034 487.607 414.266 488.095 411.702M488.095 411.702C507.308 415.107 548.726 420.55 560.691 415.078M140 149.741C160.195 134.821 199.532 102.035 200.986 97.3888M200.986 97.3888C206.296 100.556 212.176 108.978 224.964 110.977M200.986 97.3888L192.133 85.3359M152.816 85.3359L189.174 125.076M226.8 81.9538C231.557 75.0995 237.764 66.2922 244.411 57.0581M287.679 3.10772C282.411 5.55783 261.886 32.783 244.411 57.0581M240.329 2.05078C263.158 18.6796 311.015 53.3747 319.809 59.1243M281.549 85.3359L244.411 57.0581'
                                    stroke='#E4DABB'
                                    strokeWidth='3'
                                    style={{ pathLength: transformRoadA }}
                                    strokeLinecap='round'
                                    strokeLinejoin='round' />
                            </svg>
                        </div>
                        <div className={style.layout}>
                            <svg width='714' height='419' viewBox='0 0 714 419' fill='none'>
                                <motion.path
                                    d='M200.871 2.81909C225.886 29.0645 285.143 87.0915 322.051 109.236C368.186 136.917 473.987 192.893 509.665 261.172C511.75 265.162 514.062 269.238 516.569 273.376M641.302 414.954C611.652 388.535 548.386 325.893 516.569 273.376M195.302 9.39928C206.885 24.0111 241.49 61.8948 287.25 96.5355C344.449 139.836 435.863 172.459 467.403 216.815C492.635 252.301 510.693 269.308 516.569 273.376M8.55713 248.469C29.0493 234.748 66.5761 209.759 90.5252 187.948C120.462 160.685 188.353 113.107 208.132 96.5355C223.955 83.2779 276.736 28.5339 301.148 2.81909M13.9712 231.626C27.6921 224.142 66.5757 202.703 75.5566 193.294C86.7828 181.533 226.842 77.8252 234.326 63.9262C240.314 52.807 269.965 22.9419 284.042 9.39928'
                                    stroke='#FFA900'
                                    strokeWidth='7'
                                    style={{ pathLength: transformRoadB }}
                                    strokeLinecap='round'
                                    strokeLinejoin='round' />
                                <motion.path
                                    d='M121.209 8.61694C129.788 32.6438 149.637 82.6281 160.393 90.3503C173.838 100.003 226.685 172.441 272.09 237.973C308.413 290.399 351.821 334.711 368.984 350.314M368.984 350.314C354.236 357.32 320.317 377.24 291.759 405.209M368.984 350.314C404.768 335.502 480.64 302.134 513.88 280.766M718.645 82.5683C693.368 93.3343 641.878 164.015 621.751 183.207C602.664 201.406 560.847 245.703 525.438 272.589M281.733 415.638C284.969 412.051 288.325 408.572 291.759 405.209M291.759 405.209C273.845 384.378 103.441 351.879 65.3291 356.85C34.8399 360.827 10.2792 364.03 1.80994 365.135M541.483 307.465C545.586 298.121 532.496 280.321 525.438 272.589M525.438 272.589C523.508 274.055 521.596 275.469 519.708 276.824C517.954 278.084 516.004 279.4 513.88 280.766M525.438 272.589L493.906 235.957M481.37 237.381C487.752 254.019 505.702 273.237 513.88 280.766M513.88 280.766C516.718 289.096 525.13 307.351 536.07 313.733C547.01 320.115 566.269 327.028 574.531 329.687C576.81 330.447 580.685 333.79 577.95 341.083C575.215 348.376 576.81 351.149 577.95 351.624'
                                    stroke='#FFA900'
                                    strokeWidth='3'
                                    style={{ pathLength: transformRoadB }}
                                    strokeLinecap='round'
                                    strokeLinejoin='round' />
                            </svg>
                        </div>
                        <div className={style.layout}>
                            <motion.div style={{ opacity: transformRoadC }}>
                                <Image width='714' height='422' alt='map' src='/assets/img/contacts/map-3.png' />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    )
}
