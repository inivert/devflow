'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, Input, Button, Link, Divider } from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"
import { IconCheck, IconAlertCircle, IconBrandGoogle } from "@tabler/icons-react"
import { signIn } from "next-auth/react"
import { useTheme } from "next-themes"
import TiltCard from "@/components/ui/TiltCard"
import TiltButton from "@/components/ui/TiltButton"

const STORAGE_KEY = 'payment_verification'

// Helper function to check storage availability
const isStorageAvailable = (type: 'localStorage' | 'sessionStorage'): boolean => {
  try {
    const storage = window[type]
    const x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}

// Fallback storage for browsers with disabled storage
const fallbackStorage = new Map<string, string>()

// Storage wrapper with fallback
const storage = {
  getItem: (key: string): string | null => {
    if (isStorageAvailable('localStorage')) {
      return localStorage.getItem(key)
    }
    return fallbackStorage.get(key) || null
  },
  setItem: (key: string, value: string): void => {
    if (isStorageAvailable('localStorage')) {
      localStorage.setItem(key, value)
    } else {
      fallbackStorage.set(key, value)
    }
  },
  removeItem: (key: string): void => {
    if (isStorageAvailable('localStorage')) {
      localStorage.removeItem(key)
    } else {
      fallbackStorage.delete(key)
    }
  }
}

const TEST_SESSION = {
  verified: true,
  session: {
    id: 'test_session_' + Date.now(),
    customer_email: 'test@example.com',
    payment_status: 'paid',
    customer: 'test_customer_' + Date.now()
  }
}

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { theme } = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)

  // Debug mode for testing
  const isDebugMode = process.env.NODE_ENV === 'development' && searchParams.get('debug') === 'true'

  useEffect(() => {
    // Get and clear session ID from URL
    const urlSessionId = searchParams.get('session_id')
    if (urlSessionId) {
      setSessionId(urlSessionId)
      // Remove session_id from URL without triggering a refresh
      const newUrl = window.location.pathname
      window.history.replaceState({}, '', newUrl)
    }
  }, [searchParams])

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        return
      }
      
      if (isDebugMode) {
        console.log('Debug mode enabled')
        console.log('Storage availability:', {
          localStorage: isStorageAvailable('localStorage'),
          sessionStorage: isStorageAvailable('sessionStorage')
        })
      }

      try {
        // Check if we have a stored verification
        const storedVerification = storage.getItem(STORAGE_KEY)
        if (storedVerification) {
          if (isDebugMode) {
            console.log('Found stored verification:', storedVerification)
          }
          const { verified, session } = JSON.parse(storedVerification)
          if (verified) {
            setVerificationStatus('success')
            if (session?.customer_email) {
              setEmail(session.customer_email)
            }
            return
          }
        }

        // Use GET request with session ID in URL
        const response = await fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        if (isDebugMode) {
          console.log('Verification response:', data)
        }

        if (data.verified) {
          // Store verification data
          storage.setItem(STORAGE_KEY, JSON.stringify(data))
          setVerificationStatus('success')
          if (data.session?.customer_email) {
            setEmail(data.session.customer_email)
          }
        } else {
          setError(data.error || 'Verification failed')
          setVerificationStatus('error')
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
        setError(errorMessage)
        setVerificationStatus('error')
        if (isDebugMode) {
          console.error('Verification error:', error)
        }
      }
    }

    verifySession()
  }, [sessionId, isDebugMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      if (isDebugMode) {
        console.log('Submitting account creation with:', {
          email,
          verificationData: storage.getItem(STORAGE_KEY)
        })
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email, 
          password,
          verificationData: JSON.parse(storage.getItem(STORAGE_KEY) || '{}')
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Clear stored verification after successful account creation
        storage.removeItem(STORAGE_KEY)
        // Sign in the user
        await signIn('credentials', {
          email,
          password,
          callbackUrl: '/dashboard'
        })
        router.push('/dashboard')
        router.refresh() // Force a full refresh to clear any cached states
      } else {
        setError(data.error || 'Failed to create account')
        if (isDebugMode) {
          console.error('Account creation failed:', data)
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error creating account'
      setError(errorMessage)
      if (isDebugMode) {
        console.error('Account creation error:', error)
      }
    }
  }

  const handleGoogleSignUp = () => {
    try {
      // Store verification data before redirecting
      const verificationData = storage.getItem(STORAGE_KEY)
      if (verificationData) {
        if (isStorageAvailable('sessionStorage')) {
          sessionStorage.setItem(STORAGE_KEY, verificationData)
        }
      }
      signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      setError('Failed to initiate Google sign-in')
      if (isDebugMode) {
        console.error('Google sign-in error:', error)
      }
    }
  }

  const simulatePayment = () => {
    if (process.env.NODE_ENV === 'development') {
      storage.setItem(STORAGE_KEY, JSON.stringify(TEST_SESSION))
      setVerificationStatus('success')
      setEmail(TEST_SESSION.session.customer_email)
    }
  }

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    )
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <IconAlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Payment Verification Failed</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't verify your payment. Please try again or contact support if the problem persists.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4">
              <TiltButton>
                <Button
                  onClick={simulatePayment}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg"
                >
                  Simulate Successful Payment
                </Button>
              </TiltButton>
            </div>
          )}
          <Button 
            color="primary"
            href="/pricing"
            as="a"
            className="w-full"
          >
            Return to Pricing
          </Button>
        </div>
      </div>
    )
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
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconCheck className="w-8 h-8 text-green-500" />
            </div>
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
              Payment Successful!
            </motion.h1>
            <p className="text-gray-600 dark:text-gray-400">
              Create your account to get started
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <TiltButton className="w-full">
              <Button
                startContent={<IconBrandGoogle />}
                className={
                  theme === 'light'
                    ? 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 w-full'
                    : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 w-full'
                }
                size="lg"
                onClick={handleGoogleSignUp}
              >
                Continue with Google
              </Button>
            </TiltButton>
          </motion.div>

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

          <motion.div 
            className="space-y-6"
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
              labelPlacement="outside"
              placeholder="Enter your email"
              classNames={{
                base: "max-w-full",
                label: "text-sm font-medium text-foreground/90 mb-2",
                input: [
                  "bg-transparent",
                  "text-md",
                  theme === 'light' ? "text-black" : "text-white",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "h-12",
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
              labelPlacement="outside"
              placeholder="Enter your password"
              classNames={{
                base: "max-w-full",
                label: "text-sm font-medium text-foreground/90 mb-2",
                input: [
                  "bg-transparent",
                  "text-md",
                  theme === 'light' ? "text-black" : "text-white",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "h-12",
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

          <div className="mt-6">
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
                onClick={handleSubmit}
              >
                Create Account
              </Button>
            </TiltButton>
          </div>
        </Card>
      </TiltCard>
    </div>
  )
}
