'use client'

import { FloatingDock } from "./floating-dock"
import {
  IconHome2,
  IconBulb,
  IconCreditCard,
  IconUser,
} from "@tabler/icons-react"

const navItems = [
  {
    title: 'Home',
    icon: <IconHome2 className="h-8 w-8 stroke-[1.25]" />,
    href: '/'
  },
  {
    title: 'Why a Website',
    icon: <IconBulb className="h-8 w-8 stroke-[1.25]" />,
    href: '/why-website'
  },
  {
    title: 'Pricing',
    icon: <IconCreditCard className="h-8 w-8 stroke-[1.25]" />,
    href: '/pricing'
  },
  {
    title: 'Account',
    icon: <IconUser className="h-8 w-8 stroke-[1.25]" />,
    href: '/sign-in'
  }
]

export function MobileDock() {
  return (
    <FloatingDock items={navItems} />
  )
}
