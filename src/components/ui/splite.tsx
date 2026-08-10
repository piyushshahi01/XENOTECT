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

    // Load the 3D scene immediately after the initial render
    // We use requestIdleCallback to ensure it doesn't block the very first paint
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setLoad(true), { timeout: 1500 })
    } else {
      setTimeout(() => setLoad(true), 1500)
    }
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
