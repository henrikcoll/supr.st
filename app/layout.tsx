import './globals.css'
import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import { Menu } from "@/components/menu"

export const metadata: Metadata = {
  title: 'supr.st',
  description: 'Simple url shortener',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-dvh">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col max-w-3xl px-4 py-4 mx-auto h-full">
            <Menu />
            <div className="flex-grow pt-20">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
