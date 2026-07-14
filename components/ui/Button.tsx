import Link from "next/link"
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "secondary" | "outline" | "outline-inverse" | "ghost"
type Size = "sm" | "md" | "lg"

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 focus-visible:outline-brand-700",
  secondary: "bg-energy-600 text-white hover:bg-energy-700 focus-visible:outline-energy-600",
  outline: "border border-brand-300 text-brand-800 hover:bg-brand-50 focus-visible:outline-brand-700",
  "outline-inverse": "border border-white/30 text-white hover:bg-white/10 focus-visible:outline-white",
  ghost: "text-brand-800 hover:bg-brand-50 focus-visible:outline-brand-700",
}

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base",
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none"

type BaseProps = {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

type LinkButtonProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className"> & { href: string }

type PlainButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> & { href?: never }

export function Button(props: LinkButtonProps | PlainButtonProps) {
  const { variant = "primary", size = "md", children, className = "", href, ...rest } = props
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as Omit<LinkButtonProps, keyof BaseProps | "href">)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={classes} {...(rest as Omit<PlainButtonProps, keyof BaseProps | "href">)}>
      {children}
    </button>
  )
}
