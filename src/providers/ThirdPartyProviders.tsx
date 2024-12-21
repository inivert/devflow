'use client'

import { useState } from "react"
import { NextUIProvider } from "@nextui-org/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export function ThirdPartyProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </QueryClientProvider>
  )
}
