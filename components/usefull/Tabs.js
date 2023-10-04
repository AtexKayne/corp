import { useState, useEffect, useRef } from 'react'
import style from '/styles/module/usefull/Tabs.module.scss'


export default function Tabs({ tabs, children }) {
    const [activeTab, setActiveTab] = useState(0)
    return (
        <>
            <div className={style.tabsHead}>
                {tabs.map((tab, index) => (
                    <div
                        key={tab}
                        className={`${style.tabNav} text--a6`}
                        data-active={activeTab === index}
                        onClick={() => setActiveTab(index)}>
                        {tab}
                    </div>
                ))}
            </div>

            <div className={style.tabsContainer}>
                {children.props.children.map((content, index) => {
                    return (
                        <div key={index} className={style.tabsContent} aria-hidden={activeTab !== index}>
                            {content}
                        </div>
                    )
                })}
            </div>
        </>
    )
}