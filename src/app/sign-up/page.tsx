'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Input, Button, Card } from "@nextui-org/react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { theme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign up logic here
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h1 className="text-2xl font-bold text-center mb-2">Create an Account</h1>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Join our community of developers
              </p>

              <div className="space-y-4">
                <Input
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                color="primary"
                className="w-full mt-6"
                size="lg"
              >
                Sign Up
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="bordered"
                  startContent={<IconBrandGoogle className="w-5 h-5" />}
                  className="w-full"
                >
                  Google
                </Button>
                <Button
                  variant="bordered"
                  startContent={<IconBrandGithub className="w-5 h-5" />}
                  className="w-full"
                >
                  GitHub
                </Button>
              </div>

              <div className="text-center mt-6">
                <Link
                  href="/sign-in"
                  className={
                    "text-sm hover:underline " +
                    (theme === 'light' ? 'text-gray-600' : 'text-gray-400')
                  }
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </motion.div>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
