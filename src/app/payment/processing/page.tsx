'use client'

import { motion } from "framer-motion"

export default function PaymentProcessingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"></div>
        <h1 className="text-2xl font-bold mt-8 mb-2">Processing Your Payment</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Please don&apos;t close this window while we process your payment...
        </p>
      </motion.div>
    </div>
  )
}
