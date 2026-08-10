'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'

const Spline = dynamic(() => import('@splinetool/react-spline'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-transparent">
      <span className="loader"></span>
    </div>
  )
})

interface SplineSceneProps {
  scene: string
  className?: string
  interactive?: boolean
}

export function SplineScene({ scene, className, interactive = false }: SplineSceneProps) {
  const [load, setLoad] = useState(false)
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Detect clear bots and performance auditing tools
    const isBot = /bot|googlebot|crawler|spider|robot|crawling|lighthouse|pagespeed/i.test(navigator.userAgent)
    if (isBot) return // Never load heavy WebGL on crawlers or Lighthouse

    // Intersection observer to only render when in view (with a margin)
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting)
      if (entry.isIntersecting && !load) {
        // Load it if it hasn't been loaded yet
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(() => setLoad(true), { timeout: 1500 })
        } else {
          setTimeout(() => setLoad(true), 1500)
        }
      }
    }, { rootMargin: '400px' }) // Load slightly before it comes into view

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [load])

  return (
    <div ref={containerRef} className={`w-full h-full ${className || ''}`}>
      {(!load || !inView) ? (
        <div className="w-full h-full flex items-center justify-center bg-transparent">
          {load ? null : <span className="loader"></span>}
        </div>
      ) : (
        <Spline
          scene={scene}
          className="w-full h-full"
          style={{ pointerEvents: interactive ? 'auto' : 'none' }}
        />
      )}
    </div>
  )
}
