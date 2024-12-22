'use client'

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export const FloatingDock = ({
  items,
}: {
  items: {
    title: string
    icon: React.ReactNode
    href: string
  }[]
}) => {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-0 right-0 mx-auto w-full max-w-screen-sm px-4 md:hidden">
      <nav className="mx-auto w-fit rounded-2xl bg-[#0d0f12]/90 backdrop-blur-md px-6 py-3">
        <ul className="flex items-center justify-between gap-8">
          {items.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                    isActive ? "text-white" : "text-gray-500 hover:text-gray-300"
                  )}
                >
                  {item.icon}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
