'use client'

import { motion } from "framer-motion"
import { Card, Button, Link } from "@nextui-org/react"
import { useTheme } from "next-themes"
import TiltCard from "@/components/ui/TiltCard"
import TiltButton from "@/components/ui/TiltButton"

export default function SignUpPage() {
  const { theme } = useTheme()

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
          "p-8 backdrop-blur-xl backdrop-saturate-150 border border-opacity-20 " +
          (theme === 'light'
            ? 'bg-white/60 border-white'
            : 'bg-gray-900/60 border-gray-700')
        }>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
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
              Create an Account
            </motion.h1>
            <p className="text-gray-600 dark:text-gray-400">
              Join us and start your development journey
            </p>
          </motion.div>

          <motion.div
            className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-3">
              Subscription Required
            </h2>
            <p className="text-sm text-blue-600 dark:text-blue-200 mb-4">
              To create an account, you'll need to subscribe to one of our plans. All plans include:
            </p>
            <ul className="list-disc list-inside text-sm text-blue-600 dark:text-blue-200 mb-4 space-y-2">
              <li>Access to AI-powered development tools</li>
              <li>Project generation capabilities</li>
              <li>Technical support</li>
              <li>Regular updates and new features</li>
            </ul>
          </motion.div>

          <TiltButton className="w-full">
            <Button
              className={
                "w-full shadow-lg " +
                (theme === 'light'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white')
              }
              size="lg"
              href="/pricing"
              as="a"
            >
              View Plans & Subscribe
            </Button>
          </TiltButton>

          <motion.p 
            className="text-center mt-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:underline">
              Sign in
            </Link>
          </motion.p>
        </Card>
      </TiltCard>
    </div>
  )
}
