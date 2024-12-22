'use client'

import Link from "next/link"
import { Button } from "@nextui-org/react"
import ThemeToggle from "./ThemeToggle"
import { useTheme } from "next-themes"

export function Header() {
  const { theme } = useTheme()
  
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur-md bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo and Nav Links */}
          <div className="flex items-center gap-8">
            <Link 
              href="/" 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            >
              DevFlow
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/why-website"
                className="text-base font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                Why a Website?
              </Link>
              <Link
                href="/pricing"
                className="text-base font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                Pricing
              </Link>
            </nav>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <Button
              as={Link}
              href="/sign-in"
              className={
                "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 " +
                "shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] " +
                "backdrop-blur-lg backdrop-saturate-150 hidden md:flex"
              }
              size="md"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
      
      {/* Gradient Border Bottom */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </header>
  )
}
