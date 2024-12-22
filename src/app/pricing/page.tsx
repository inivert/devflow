'use client'

import { Button } from "@nextui-org/react"
import { IconCheck } from "@tabler/icons-react"
import { motion } from "framer-motion"
import TiltCard from "@/components/ui/TiltCard"
import TiltButton from "@/components/ui/TiltButton"

const plans = [
  {
    name: "Basic",
    price: "$19",
    description: "Perfect for small businesses just getting started",
    features: [
      "Custom domain",
      "Basic website builder",
      "1 email account",
      "5GB storage",
      "SSL certificate",
      "24/7 support"
    ]
  },
  {
    name: "Professional",
    price: "$49",
    description: "Great for growing businesses needing more features",
    features: [
      "Everything in Basic",
      "Advanced website builder",
      "5 email accounts",
      "20GB storage",
      "SEO tools",
      "Analytics dashboard",
      "Priority support"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$99",
    description: "For businesses requiring advanced features and support",
    features: [
      "Everything in Professional",
      "Unlimited email accounts",
      "100GB storage",
      "Advanced SEO tools",
      "Custom integrations",
      "Dedicated support team",
      "99.9% uptime SLA"
    ]
  }
]

export default function PricingPage() {
  return (
    <div className="w-full pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Choose the perfect plan for your business needs
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard
                className={`relative rounded-2xl p-8 bg-background ${
                  plan.popular
                    ? "border-2 border-blue-500 dark:border-blue-400"
                    : "border border-gray-200 dark:border-gray-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">/month</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <IconCheck className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <TiltButton>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                    size="lg"
                  >
                    Get Started
                  </Button>
                </TiltButton>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Have questions? <span className="text-blue-500">Contact our sales team</span>
          </p>
        </div>
      </div>
    </div>
  )
}
