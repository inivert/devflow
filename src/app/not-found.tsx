'use client'

import { motion } from 'framer-motion'
import { Button } from '@nextui-org/react'
import { useTheme } from 'next-themes'
import Link from 'next/link'

export default function NotFound() {
  const { theme } = useTheme()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={`text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
          theme === 'light' 
            ? 'from-blue-600 to-blue-800' 
            : 'from-blue-400 to-cyan-400'
        }`}>
          404
        </h1>
        <h2 className={`text-3xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
          Page Not Found
        </h2>
        <p className={`text-lg mb-8 ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
          Oops! Looks like our friendly robot could not find the page you are looking for.
        </p>
        <Button
          as={Link}
          href="/"
          size="lg"
          className={`${
            theme === 'light'
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'bg-white text-gray-900 hover:bg-gray-100'
          }`}
        >
          Return Home
        </Button>
      </motion.div>
    </div>
  )
}
