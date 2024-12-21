'use client'

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThirdPartyProviders } from "./ThirdPartyProviders"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThirdPartyProviders>{children}</ThirdPartyProviders>
    </NextThemesProvider>
  )
}
