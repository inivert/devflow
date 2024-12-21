'use client'

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@nextui-org/react"
import { useTheme } from "next-themes"

export default function Home() {
  const { theme } = useTheme()

  return (
    <div className="flex-1">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container mx-auto flex max-w-[64rem] flex-col items-center gap-4 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl text-foreground">
              Modern Development
              <span className="text-primary"> Workflow</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-default-600">
              Streamline your development process with our powerful tools and features.
              Build faster, collaborate better, and ship with confidence.
            </p>
          </motion.div>

          <motion.div 
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              as={Link}
              href="/features"
              color="primary"
              variant="shadow"
              size="lg"
              className="neon-glow neon-glow-primary"
            >
              Get Started
            </Button>
            <Button
              as={Link}
              href="/pricing"
              variant="bordered"
              size="lg"
              className="neon-glow"
            >
              View Pricing
            </Button>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              {
                title: "Modern Stack",
                description: "Built with Next.js 13, TypeScript, and Tailwind CSS",
                icon: "🚀",
              },
              {
                title: "Beautiful UI",
                description: "Sleek and modern interface with NextUI components",
                icon: "✨",
              },
              {
                title: "Developer Experience",
                description: "Enhanced DX with powerful development tools",
                icon: "🛠️",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-primary/20 bg-background/50 p-8 backdrop-blur-sm"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{feature.title}</h3>
                <p className="text-default-600">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
