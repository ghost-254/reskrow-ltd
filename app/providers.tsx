'use client'

import { ThemeProvider } from "next-themes"
import { FirebaseProvider } from "./firebase-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FirebaseProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </FirebaseProvider>
  )
}

