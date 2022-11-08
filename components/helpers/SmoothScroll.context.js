import React, { createContext, useEffect, useState, useRef } from 'react'

export const SmoothScrollContext = createContext({
  scroll: null,
})

export const SmoothScrollProvider = ({ children, options }) => {
  const [scroll, setScroll] = useState(null)
  const refScrollContainer = useRef(null)

  useEffect(() => {
    if (!scroll) {
      (async () => {
        try {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          setScroll(
            new LocomotiveScroll({
              el: refScrollContainer.current,
              ...options,
              mobile: {
                smooth: true
              },
              tablet: {
                smooth: true
              },
              scrollFromAnywhere: true,
              reloadOnContextChange: true,
            })
          )
        } catch (error) {
          throw Error(`[SmoothScrollProvider]: ${error}`)
        }
      })()
    }

    return () => {
      scroll && scroll.destroy()
    }
  }, [scroll]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SmoothScrollContext.Provider value={{ scroll }}>
      <div ref={refScrollContainer} data-scroll-container>
        {children}
      </div>
    </SmoothScrollContext.Provider>
  )
}

SmoothScrollContext.displayName = 'SmoothScrollContext'
SmoothScrollProvider.displayName = 'SmoothScrollProvider'
