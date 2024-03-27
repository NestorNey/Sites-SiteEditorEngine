import '@/styles/globals.css'
import { Metadata } from 'next'

export const metadata = {
  title: 'Sites'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  )
}
