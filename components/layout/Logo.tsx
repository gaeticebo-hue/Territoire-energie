import Image from "next/image"
import Link from "next/link"

type Props = {
  className?: string
  variant?: "dark" | "light"
}

export function Logo({ className = "", variant = "dark" }: Props) {
  if (variant === "dark") {
    return (
      <Link href="/" className={`flex items-center ${className}`}>
        <Image
          src="/logos/logoTAE.png"
          alt="Territoire Avenir Énergie"
          width={1024}
          height={504}
          priority
          className="h-16 w-auto sm:h-20"
        />
      </Link>
    )
  }

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <span
        aria-hidden
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-energy-400 via-energy-500 to-brand-600 text-white shadow-sm"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C12 2 6 8 6 13a6 6 0 0 0 12 0c0-5-6-11-6-11Z"
            fill="currentColor"
            fillOpacity="0.9"
          />
          <path d="M12 22v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-semibold tracking-tight text-white">Territoire Avenir</span>
        <span className="block text-sm font-medium text-energy-300">Énergie</span>
      </span>
    </Link>
  )
}
