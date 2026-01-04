import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#059669',
}

export const metadata: Metadata = {
  title: 'Calculadora de Yogurt Griego Casero',
  description: 'Calcula las proporciones exactas de ingredientes para hacer yogurt griego casero. Configura tipo de leche, densidad y obtén cantidades precisas.',
  keywords: ['yogurt griego', 'casero', 'calculadora', 'receta', 'proporciones'],
  authors: [{ name: 'Yogurterona' }],
  openGraph: {
    title: 'Calculadora de Yogurt Griego Casero',
    description: 'Calcula las proporciones exactas para tu yogurt griego casero',
    type: 'website',
    locale: 'es_AR',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
