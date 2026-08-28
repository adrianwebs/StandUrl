import type { Metadata, Viewport } from 'next'
import { Inter, Geist } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://standurl.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'StandUrl — Objetos NFC para reseñas de Google',
    template: '%s | StandUrl',
  },
  description:
    'Objeto 3D personalizado para tu negocio con NFC + QR. Tus clientes dejan reseñas en Google con un solo toque. Sin apps, sin fricción.',
  keywords: [
    'tarjeta nfc reseñas google personalizada',
    'objeto 3d reseñas google',
    'dispositivo nfc reseñas negocio',
    'aumentar reseñas google negocio local',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: 'StandUrl',
    title: 'StandUrl — Objetos NFC para reseñas de Google',
    description:
      'Objeto 3D personalizado para tu negocio con NFC + QR. Reseñas de Google con un toque.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StandUrl — Objetos NFC para reseñas de Google',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${geist.variable}`}>
      <body className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
