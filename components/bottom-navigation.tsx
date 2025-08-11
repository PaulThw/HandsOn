"use client"

import { Home, Search, Calendar, User, Calculator } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Suchen", href: "/dolmetscher" },
    { icon: Calendar, label: "Termine", href: "/termine" },
    { icon: Calculator, label: "Abrechnung", href: "/abrechnung" },
    { icon: User, label: "Profil", href: "/profil" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary border-t border-border z-50">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center py-3 px-4 transition-all duration-200 active:scale-95",
                isActive ? "text-petrol-400" : "text-gray-400",
              )}
              onClick={() => {
                // Haptic feedback für mobile Geräte
                if (navigator.vibrate) {
                  navigator.vibrate(10)
                }
              }}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
