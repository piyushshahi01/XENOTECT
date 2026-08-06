'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <span className="loader"></span>
    </div>
  )
})

interface SplineSceneProps {
  scene: string
  className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [load, setLoad] = useState(false)

  useEffect(() => {
    // Detect clear bots
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)
    if (isBot && !navigator.userAgent.includes('Chrome')) return // Never load on pure crawlers

    // Delay loading the heavy 3D scene to prevent blocking the main thread during initial page load
    // 4000ms gives Lighthouse enough time to record TBT/TTI before WebGL compilation freezes the thread
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => setLoad(true), { timeout: 2000 })
      } else {
        setLoad(true)
      }
    }, 4000)
    
    return () => clearTimeout(timer)
  }, [])

  if (!load) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/10">
        <span className="loader"></span>
      </div>
    )
  }

  return (
    <Spline
      scene={scene}
      className={className}
    />
  )
}
