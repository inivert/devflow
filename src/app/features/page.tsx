'use client'

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Card } from "@nextui-org/react"
import { useTheme } from "next-themes"

const features = [
  {
    title: "Modern Development",
    description: "Built with the latest technologies including Next.js 13, TypeScript, and Tailwind CSS",
    icon: "🚀",
  },
  {
    title: "Beautiful UI",
    description: "Sleek and modern interface powered by NextUI components and custom animations",
    icon: "✨",
  },
  {
    title: "Dark Mode",
    description: "Seamless dark mode integration with system preference support",
    icon: "🌙",
  },
  {
    title: "Type Safety",
    description: "Full TypeScript support for enhanced developer experience and fewer bugs",
    icon: "🛡️",
  },
  {
    title: "Performance",
    description: "Optimized for speed with server-side rendering and automatic code splitting",
    icon: "⚡",
  },
  {
    title: "Responsive Design",
    description: "Fully responsive layout that works beautifully on all devices",
    icon: "📱",
  },
  {
    title: "Developer Tools",
    description: "Enhanced development experience with powerful development tools and utilities",
    icon: "🛠️",
  },
  {
    title: "Scalable Architecture",
    description: "Built with scalability in mind, ready for your project to grow",
    icon: "🏗️",
  },
]

function FeatureCard({ feature, index }) {
  const cardRef = useRef(null)
  const { theme } = useTheme()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // More responsive spring animation
  const mouseXSpring = useSpring(x, {
    stiffness: 150,
    damping: 15,
    mass: 0.1
  })
  const mouseYSpring = useSpring(y, {
    stiffness: 150,
    damping: 15,
    mass: 0.1
  })

  // Increased rotation range for more noticeable effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["25deg", "-25deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-25deg", "25deg"])

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()

    const width = rect.width
    const height = rect.height

    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5

    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        type: "spring",
        damping: 20,
        stiffness: 100
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group perspective-1000"
    >
      <Card
        className={`
          h-full p-6
          backdrop-blur-xl backdrop-saturate-150
          border border-opacity-20
          transition-all duration-500
          transform-gpu
          ${theme === 'light'
            ? 'bg-white/60 hover:bg-white/90 border-white shadow-xl hover:shadow-2xl'
            : 'bg-gray-900/60 hover:bg-gray-900/90 border-gray-700 shadow-xl hover:shadow-2xl'
          }
        `}
      >
        <motion.div
          style={{
            transform: "translateZ(100px)",
            transformStyle: "preserve-3d",
          }}
          className="space-y-4"
        >
          <motion.div
            whileHover={{ 
              scale: 1.2,
              rotate: [0, -10, 10, -10, 0],
              transition: {
                duration: 0.5,
                rotate: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear"
                }
              }
            }}
            className="text-5xl transform transition-transform duration-300"
          >
            {feature.icon}
          </motion.div>
          <motion.h3 
            className={`text-2xl font-bold ${
              theme === 'light' ? 'text-gray-900' : 'text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {feature.title}
          </motion.h3>
          <motion.p 
            className={`${
              theme === 'light' ? 'text-gray-600' : 'text-gray-300'
            }`}
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {feature.description}
          </motion.p>
        </motion.div>
      </Card>
    </motion.div>
  )
}

export default function FeaturesPage() {
  const { theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          damping: 20,
          stiffness: 100
        }}
        className="text-center mb-16 relative"
      >
        <motion.div 
          className="absolute inset-0 -z-10"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className={`
            w-[600px] h-[600px] blur-[120px] rounded-full
            ${theme === 'light'
              ? 'bg-gradient-to-r from-blue-200/50 to-purple-200/50'
              : 'bg-gradient-to-r from-blue-900/30 to-purple-900/30'
            }
          `} />
        </motion.div>
        
        <motion.h1 
          className={`text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r ${
            theme === 'light' 
              ? 'from-blue-600 to-purple-600' 
              : 'from-blue-400 to-purple-400'
          }`}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
        >
          Powerful Features
        </motion.h1>
        <motion.p 
          className={`text-xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Everything you need to build amazing products
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 max-w-[1400px] w-full">
        {features.map((feature, index) => (
          <FeatureCard key={feature.title} feature={feature} index={index} />
        ))}
      </div>
    </div>
  )
}
