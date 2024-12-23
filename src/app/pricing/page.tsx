'use client'

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, Button, Switch } from "@nextui-org/react"
import { IconCheck } from "@tabler/icons-react"
import { useTheme } from "next-themes"
import TiltCard from "@/components/ui/TiltCard"
import TiltButton from "@/components/ui/TiltButton"

interface PricingPlan {
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  stripePriceIdYearly: string
  stripePriceIdMonthly: string
  highlighted?: boolean
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    description: "Perfect for individual developers",
    monthlyPrice: 19.99,
    yearlyPrice: 199.99,
    features: [
      "AI-powered code generation",
      "Basic project templates",
      "Community support",
      "Standard response time",
      "5 projects per month"
    ],
    stripePriceIdYearly: 'price_yearly_basic',  // Replace with your actual Stripe price IDs
    stripePriceIdMonthly: 'price_monthly_basic',
  },
  {
    name: "Pro",
    description: "For professional developers",
    monthlyPrice: 39.99,
    yearlyPrice: 399.99,
    features: [
      "Everything in Basic",
      "Advanced project templates",
      "Priority support",
      "Faster response time",
      "15 projects per month",
      "Custom branding",
      "API access"
    ],
    stripePriceIdYearly: 'price_yearly_pro',  // Replace with your actual Stripe price IDs
    stripePriceIdMonthly: 'price_monthly_pro',
    highlighted: true
  },
  {
    name: "Enterprise",
    description: "For teams and organizations",
    monthlyPrice: 99.99,
    yearlyPrice: 999.99,
    features: [
      "Everything in Pro",
      "Unlimited projects",
      "24/7 priority support",
      "Custom integrations",
      "Team collaboration",
      "Advanced analytics",
      "Custom AI training",
      "SLA guarantee"
    ],
    stripePriceIdYearly: 'price_yearly_enterprise',  // Replace with your actual Stripe price IDs
    stripePriceIdMonthly: 'price_monthly_enterprise',
  }
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const STORAGE_KEY = 'payment_verification'

export default function PricingPage() {
  const { theme } = useTheme()
  const [isYearly, setIsYearly] = useState(true)
  const [hasPaid, setHasPaid] = useState(false)

  useEffect(() => {
    // Check if user has already paid
    const verificationData = localStorage.getItem(STORAGE_KEY)
    if (verificationData) {
      try {
        const { verified } = JSON.parse(verificationData)
        setHasPaid(verified)
      } catch (error) {
        console.error('Error parsing verification data:', error)
      }
    }
  }, [])

  const handleSubscribe = async (plan: PricingPlan) => {
    if (hasPaid) {
      // Redirect to account creation if they've already paid
      window.location.href = '/payment/success'
      return
    }

    try {
      const priceId = isYearly ? plan.stripePriceIdYearly : plan.stripePriceIdMonthly

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          priceId,
          isYearly 
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    }
  }

  return (
    <div className="min-h-screen py-20 px-4">
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.h1 
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Choose the plan that best fits your needs
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className={isYearly ? "text-gray-500" : "text-primary font-semibold"}>Monthly</span>
            <Switch 
              defaultSelected
              size="lg"
              color="primary"
              isSelected={isYearly}
              onValueChange={setIsYearly}
            />
            <span className={isYearly ? "text-primary font-semibold" : "text-gray-500"}>
              Yearly{" "}
              <span className="text-green-500 text-sm">
                (Save 20%)
              </span>
            </span>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
              whileHover={{
                scale: 1.05,
                rotateX: 10,
                rotateY: 10,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }}
              whileTap={{ scale: 0.95 }}
              className="flex"
            >
              <TiltCard className="flex">
                <Card 
                  className={`p-6 w-full backdrop-blur-xl backdrop-saturate-150 border border-opacity-20 ${
                    theme === 'light'
                      ? 'bg-white/60 border-white'
                      : 'bg-gray-900/60 border-gray-700'
                  } ${
                    plan.highlighted 
                      ? "border-2 border-primary shadow-lg" 
                      : ""
                  }`}
                >
                  <div className="text-center mb-6">
                    {plan.highlighted && (
                      <motion.span 
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm mb-4 inline-block"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        Most Popular
                      </motion.span>
                    )}
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                        ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    {plan.features.map((feature, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <IconCheck className="w-5 h-5 text-green-500" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <TiltButton className="w-full">
                    <Button
                      className={`w-full shadow-lg ${
                        plan.highlighted
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      }`}
                      size="lg"
                      onClick={() => handleSubscribe(plan)}
                      as="button"
                    >
                      Get Started
                    </Button>
                  </TiltButton>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-500 dark:text-gray-400">
            All plans include a 14-day money-back guarantee.{" "}
            <a href="/terms" className="text-primary hover:underline">
              Terms apply
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
