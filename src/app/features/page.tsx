'use client'

import { motion } from "framer-motion"
import { Card, CardHeader, CardBody } from "@nextui-org/react"
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

export default function FeaturesPage() {
  const { theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
          theme === 'light' 
            ? 'from-blue-600 to-blue-800' 
            : 'from-blue-400 to-cyan-400'
        }`}>
          Powerful Features
        </h1>
        <p className={`text-xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
          Everything you need to build amazing products
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] w-full"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className={`h-full ${
                theme === 'light'
                  ? 'bg-white hover:shadow-lg'
                  : 'bg-gray-900 hover:bg-gray-800'
              } transition-all duration-300`}
            >
              <CardHeader className="flex gap-3">
                <div className="text-3xl">{feature.icon}</div>
                <div className="flex flex-col">
                  <h3 className={`text-xl font-bold ${
                    theme === 'light' ? 'text-gray-900' : 'text-white'
                  }`}>
                    {feature.title}
                  </h3>
                </div>
              </CardHeader>
              <CardBody>
                <p className={theme === 'light' ? 'text-gray-700' : 'text-gray-400'}>
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
