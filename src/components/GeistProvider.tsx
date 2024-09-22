"use client"

import { GeistProvider as GeistProviderCore, CssBaseline } from '@geist-ui/core'

export function GeistProvider({ children }: { children: React.ReactNode }) {
  return (
    <GeistProviderCore>
      <CssBaseline />
      {children}
    </GeistProviderCore>
  )
}