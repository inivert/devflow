'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardBody, Button, Switch } from "@nextui-org/react"
import { useTheme } from "next-themes"
import { PiCheckBold } from "react-icons/pi"

const plans = [
  {
    name: "Starter",
    price: { monthly: 9, yearly: 90 },
    description: "Perfect for side projects and small teams",
    features: [
      "Up to 5 team members",
      "5GB storage",
      "Basic support",
      "Core features",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: { monthly: 29, yearly: 290 },
    description: "Best for growing teams and businesses",
    features: [
      "Up to 20 team members",
      "20GB storage",
      "Priority support",
      "Advanced features",
      "Custom integrations",
    ],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: { monthly: 99, yearly: 990 },
    description: "For large-scale organizations",
    features: [
      "Unlimited team members",
      "Unlimited storage",
      "24/7 support",
      "All features",
      "Custom solutions",
      "Dedicated account manager",
    ],
    highlight: false,
  },
]

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(true)
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
          Simple, transparent pricing
        </h1>
        <p className={`text-xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
          Choose the plan that's right for you
        </p>
      </motion.div>

      <div className="flex items-center gap-4 mb-12">
        <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-400'}>Monthly</span>
        <Switch
          defaultSelected={isYearly}
          onChange={() => setIsYearly(!isYearly)}
          size="lg"
          color="primary"
        />
        <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-400'}>
          Yearly
          <span className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded-full">
            Save 20%
          </span>
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1200px] w-full"
      >
        {plans.map((plan) => (
          <div key={plan.name} className="relative">
            {plan.highlight && (
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit bg-blue-500 text-white px-4 py-1 rounded-full text-sm z-10">
                Most Popular
              </div>
            )}
            <Card
              className={`w-full ${
                plan.highlight
                  ? 'border-2 border-blue-500'
                  : theme === 'light'
                  ? 'bg-white'
                  : 'bg-gray-900'
              }`}
            >
              <CardHeader className="flex flex-col gap-2 p-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {plan.description}
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.price.yearly : plan.price.monthly}
                  </span>
                  <span className={`ml-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </div>
              </CardHeader>
              <CardBody className="p-6 pt-0">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <PiCheckBold className="w-5 h-5 text-blue-500" />
                      <span className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-8 ${
                    plan.highlight
                      ? 'bg-blue-500 text-white'
                      : theme === 'light'
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-900'
                  }`}
                  size="lg"
                >
                  Get Started
                </Button>
              </CardBody>
            </Card>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
