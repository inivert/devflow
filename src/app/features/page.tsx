'use client'

import { motion } from "framer-motion"
import { Button } from "@nextui-org/react"
import { useTheme } from "next-themes"
import Link from "next/link"
import TiltCard from "@/components/ui/TiltCard"
import { FiMonitor, FiSmartphone, FiSearch, FiMessageCircle, FiBarChart, FiLayers } from 'react-icons/fi'

export default function Features() {
  const { theme } = useTheme()

  const features = [
    {
      icon: <FiMonitor className="w-8 h-8" />,
      title: "Professional Design",
      description: "Custom-built websites that reflect your construction expertise and professionalism",
      details: [
        "Modern, clean design",
        "Brand-aligned visuals",
        "Professional typography",
        "Custom color schemes"
      ]
    },
    {
      icon: <FiSmartphone className="w-8 h-8" />,
      title: "Mobile Optimization",
      description: "Fully responsive websites that work perfectly on all devices and screen sizes",
      details: [
        "Responsive layouts",
        "Touch-friendly interface",
        "Fast loading times",
        "Optimized images"
      ]
    },
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "SEO Ready",
      description: "Built-in SEO features to help your construction business rank higher in search results",
      details: [
        "Search engine optimized",
        "Meta descriptions",
        "XML sitemaps",
        "Schema markup"
      ]
    },
    {
      icon: <FiMessageCircle className="w-8 h-8" />,
      title: "Lead Generation",
      description: "Built-in tools to capture and convert more leads for your business",
      details: [
        "Contact forms",
        "Call-to-action buttons",
        "Lead tracking",
        "Form analytics"
      ]
    },
    {
      icon: <FiBarChart className="w-8 h-8" />,
      title: "Analytics & Insights",
      description: "Detailed analytics to track your website's performance and visitor behavior",
      details: [
        "Traffic analytics",
        "User behavior tracking",
        "Conversion tracking",
        "Performance metrics"
      ]
    },
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: "Content Management",
      description: "Easy-to-use content management system to keep your website up to date",
      details: [
        "Project portfolio",
        "Blog system",
        "Image galleries",
        "Testimonials"
      ]
    }
  ]

  return (
    <main className="flex-1 pt-20">
      {/* Hero Section with Dynamic Background */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute -top-1/2 left-0 w-[800px] h-[800px] rounded-full"
            style={{
              background: theme === 'light'
                ? 'linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))'
                : 'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
              filter: 'blur(100px)',
            }}
            animate={{
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Powerful Features
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Everything you need to create a successful online presence for your construction business
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <TiltCard
                  containerClassName="w-full h-full"
                  className={
                    "p-8 rounded-xl backdrop-blur-xl backdrop-saturate-150 border border-opacity-20 h-full " +
                    "transition-colors duration-500 group " +
                    (theme === 'light'
                      ? 'bg-white/60 border-white hover:bg-white/80'
                      : 'bg-gray-900/60 border-gray-700 hover:bg-gray-900/80')
                  }
                >
                  <div style={{ transform: "translateZ(50px)" }} className="space-y-6">
                    <div className="text-blue-600 dark:text-blue-400 transition-transform duration-300 group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {feature.description}
                      </p>
                    </div>
                    <ul className="space-y-2">
                      {feature.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 dark:from-blue-900/10 dark:to-purple-900/10" />
        <div className="container mx-auto px-4 relative">
          <TiltCard
            containerClassName="max-w-3xl mx-auto"
            className={
              "text-center p-12 rounded-2xl backdrop-blur-xl backdrop-saturate-150 border border-opacity-20 " +
              (theme === 'light'
                ? 'bg-white/60 border-white'
                : 'bg-gray-900/60 border-gray-700')
            }
          >
            <div style={{ transform: "translateZ(50px)" }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-gray-600 dark:text-gray-300">
                Transform your construction business with our powerful website features
              </p>
              <Button
                as={Link}
                href="/pricing"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                size="lg"
              >
                View Pricing Plans
              </Button>
            </div>
          </TiltCard>
        </div>
      </section>
    </main>
  )
}
