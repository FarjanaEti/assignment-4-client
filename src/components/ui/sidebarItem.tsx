import Link from "next/link"
import { cn } from "@/lib/utils"

type SidebarItemProps = {
  label: string
  href: string
}

export function SidebarItem({ label, href }: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-2 text-sm font-medium transition",
        "hover:bg-muted hover:text-primary"
      )}
    >
      {label}
    </Link>
  )
}
