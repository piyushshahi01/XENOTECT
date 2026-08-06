'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
})

interface SplineSceneProps {
  scene: string
  className?: string
  fallbackImage?: string
}

export function SplineScene({ scene, className, fallbackImage }: SplineSceneProps) {
  const [load, setLoad] = useState(false)
  const [isSplineLoaded, setIsSplineLoaded] = useState(false)

  useEffect(() => {
    // Detect clear bots
    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)
    if (isBot && !navigator.userAgent.includes('Chrome')) return // Never load on pure crawlers

    // Delay loading the 3D scene to prevent blocking initial render and intro animations
    const timer = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => setLoad(true))
      } else {
        setLoad(true)
      }
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative ${className || ''}`}>
      {/* Fallback Image / Loader */}
      {!isSplineLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent z-10 transition-opacity duration-1000 ease-in-out">
          {fallbackImage ? (
             <Image 
               src={fallbackImage} 
               alt="3D Scene Placeholder" 
               fill
               className="object-contain animate-pulse" 
               priority
             />
          ) : (
             <span className="loader"></span>
          )}
        </div>
      )}

      {/* Spline 3D Scene */}
      {load && (
        <div className="absolute inset-0 z-20">
          <Spline
            scene={scene}
            className="w-full h-full"
            onLoad={() => setIsSplineLoaded(true)}
          />
        </div>
      )}
    </div>
  )
}
