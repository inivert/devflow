"use client";

import { useTheme } from "next-themes"
import { Button } from "@nextui-org/react"
import { SunIcon } from "@heroicons/react/24/outline"
import { MoonIcon } from "@heroicons/react/24/outline"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      isIconOnly
      variant="light"
      aria-label="Toggle theme"
      className="rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? (
        <MoonIcon className="h-5 w-5" />
      ) : (
        <SunIcon className="h-5 w-5" />
      )}
    </Button>
  )
}
