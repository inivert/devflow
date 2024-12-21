'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Input, Button, Card } from "@nextui-org/react"
import { useTheme } from "next-themes"
import Link from "next/link"

export default function SignInPage() {
  const { theme } = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your authentication logic here
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 left-0 w-[500px] h-[500px] rounded-full"
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
        <motion.div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full"
          style={{
            background: theme === 'light'
              ? 'linear-gradient(to right, rgba(147, 51, 234, 0.2), rgba(59, 130, 246, 0.2))'
              : 'linear-gradient(to right, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))',
            filter: 'blur(100px)',
          }}
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          damping: 20,
          stiffness: 100,
        }}
        className="w-full max-w-md z-10"
      >
        <Card
          className={
            "p-6 backdrop-blur-xl backdrop-saturate-150 border border-opacity-20 " +
            (theme === 'light'
              ? 'bg-white/60 border-white'
              : 'bg-gray-900/60 border-gray-700')
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6"
          >
            <motion.h1
              className={
                "text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r " +
                (theme === 'light'
                  ? 'from-blue-600 to-purple-600'
                  : 'from-blue-400 to-purple-400')
              }
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Welcome Back
            </motion.h1>
            <p className={theme === 'light' ? 'text-gray-600 text-sm' : 'text-gray-400 text-sm'}>
              Sign in to continue your development journey
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Input
                type="email"
                label="Email"
                variant="bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                classNames={{
                  input: [
                    "bg-transparent",
                    theme === 'light' ? "text-black" : "text-white",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "backdrop-blur-xl",
                    "backdrop-saturate-150",
                    "!cursor-text",
                    theme === 'light'
                      ? "bg-white/40 hover:bg-white/50 focus-within:bg-white/50"
                      : "bg-black/40 hover:bg-black/50 focus-within:bg-black/50",
                  ],
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Input
                type="password"
                label="Password"
                variant="bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                classNames={{
                  input: [
                    "bg-transparent",
                    theme === 'light' ? "text-black" : "text-white",
                  ],
                  innerWrapper: "bg-transparent",
                  inputWrapper: [
                    "backdrop-blur-xl",
                    "backdrop-saturate-150",
                    "!cursor-text",
                    theme === 'light'
                      ? "bg-white/40 hover:bg-white/50 focus-within:bg-white/50"
                      : "bg-black/40 hover:bg-black/50 focus-within:bg-black/50",
                  ],
                }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 pt-2"
            >
              <Button
                type="submit"
                className={
                  "w-full " +
                  (theme === 'light'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg')
                }
                size="md"
              >
                Sign In
              </Button>

              <div className="text-center">
                <Link
                  href="/sign-up"
                  className={
                    "text-sm hover:underline " +
                    (theme === 'light' ? 'text-gray-600' : 'text-gray-400')
                  }
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
