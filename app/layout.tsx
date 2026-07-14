import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Territoire Avenir Énergie — Achat groupé d'électricité renouvelable",
    template: "%s — Territoire Avenir Énergie",
  },
  description:
    "Programme d'achat groupé d'électricité renouvelable pour entreprises du Pays Basque et de Nouvelle-Aquitaine : PPA multi-acheteurs, couverture des prix de l'électricité et décarbonation.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
