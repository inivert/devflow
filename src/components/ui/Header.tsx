'use client'

import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Button,
} from "@nextui-org/react"
import { ThemeSwitcher } from "./mode-toggle"

const navigation = [
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export function Header() {
  const { theme } = useTheme()

  return (
    <Navbar maxWidth="xl">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link href="/" className="flex justify-start items-center gap-1">
            <motion.div
              className="text-xl font-bold text-foreground"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              DevFlow
            </motion.div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="center">
        <ul className="hidden sm:flex gap-4 justify-start ml-2">
          {navigation.map((item) => (
            <NavbarItem key={item.name}>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="text-default-600 hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitcher />
          <Button
            as={Link}
            className="neon-glow neon-glow-primary"
            color="primary"
            href="/sign-in"
            variant="flat"
          >
            Sign In
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navigation.map((item) => (
            <NavbarMenuItem key={item.name}>
              <Link
                href={item.href}
                className="text-default-600 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="flex items-center gap-2 mt-4">
            <ThemeSwitcher />
            <Button
              as={Link}
              className="neon-glow neon-glow-primary"
              color="primary"
              href="/sign-in"
              variant="flat"
              fullWidth
            >
              Sign In
            </Button>
          </div>
        </div>
      </NavbarMenu>
    </Navbar>
  )
}
