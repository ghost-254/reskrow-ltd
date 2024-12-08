'use client'

import { ThemeProvider } from "next-themes"
import SupabaseProvider from "@/app/supabase-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SupabaseProvider>
  )
}

