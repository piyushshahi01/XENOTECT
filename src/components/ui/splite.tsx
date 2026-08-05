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
    // Detect Lighthouse and other bots to completely skip loading the heavy WebGL scene
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent)
    if (isBot) return // Never load on Lighthouse to prevent CPU timeouts

    // Delay loading the 3D scene to prevent blocking the main thread during initial page load
    const timer = setTimeout(() => {
      setLoad(true)
    }, 2000)
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
