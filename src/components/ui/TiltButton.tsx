'use client'

import { useRef } from "react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"

const ROTATION_RANGE = 32.5
const HALF_ROTATION_RANGE = 32.5 / 2

interface TiltButtonProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  style?: React.CSSProperties
}

export default function TiltButton({ children, className = "", containerClassName = "", style = {} }: TiltButtonProps) {
  const ref = useRef(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const xSpring = useSpring(x)
  const ySpring = useSpring(y)

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return

    const rect = (ref.current as HTMLElement).getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1
    const rY = mouseX / width - HALF_ROTATION_RANGE

    x.set(rX)
    y.set(rY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
        ...style
      }}
      className={`relative perspective-1000 ${containerClassName}`}
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className={className}
      >
        {children}
      </div>
    </motion.div>
  )
}
