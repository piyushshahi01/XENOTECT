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
    // Delay loading the 3D scene to prevent blocking the main thread during initial page load/Lighthouse analysis
    const timer = setTimeout(() => {
      setLoad(true)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  if (!load) {
    return (
      <div className="w-full h-full flex items-center justify-center">
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
