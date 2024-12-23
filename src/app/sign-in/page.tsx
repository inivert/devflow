'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, Input, Button, Link, Divider } from "@nextui-org/react"
import { IconBrandGoogle } from "@tabler/icons-react"
import { signIn } from "next-auth/react"
import { useTheme } from "next-themes"
import TiltCard from "@/components/ui/TiltCard"
import TiltButton from "@/components/ui/TiltButton"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { theme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
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

      <TiltCard className="w-full max-w-md relative z-10">
        <Card className={
          "p-6 backdrop-blur-xl backdrop-saturate-150 border border-opacity-20 " +
          (theme === 'light'
            ? 'bg-white/60 border-white'
            : 'bg-gray-900/60 border-gray-700')
        }>
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
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to continue to your account
            </p>
          </motion.div>

          <TiltButton className="w-full">
            <Button
              startContent={<IconBrandGoogle />}
              className={
                theme === 'light'
                  ? 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 w-full'
                  : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 w-full'
              }
              size="lg"
              onClick={handleGoogleSignIn}
            >
              Continue with Google
            </Button>
          </TiltButton>

          <motion.div 
            className="flex items-center gap-4 my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Divider className="flex-1" />
            <span className="text-gray-500 text-sm">or</span>
            <Divider className="flex-1" />
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Input
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              variant="bordered"
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
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              variant="bordered"
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

            <TiltButton className="w-full">
              <Button
                type="submit"
                className={
                  "w-full " +
                  (theme === 'light'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg')
                }
                size="lg"
              >
                Sign In
              </Button>
            </TiltButton>
          </motion.form>

          <motion.p 
            className="text-center mt-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </motion.p>
        </Card>
      </TiltCard>
    </div>
  )
}
