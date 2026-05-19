import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReactNode } from "react"
import { StoreProvider } from "@/components/providers/store-provider"

export const metadata: Metadata = {
  title: "Academic Achievements Tracker",
  description: "Track and showcase your academic achievements with ease.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="lt">
      <StoreProvider>
        <body className="container mx-auto max-w-7xl">
          <Header />
          {children}
          <Footer />
        </body>
      </StoreProvider>
    </html>
  )
}
