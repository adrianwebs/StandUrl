import type { Metadata, Viewport } from 'next'
import { Inter, Geist } from 'next/font/google'
import { AuthProvider } from '@/contexts/AuthContext'
import JsonLd from '@/components/JsonLd'
import { SITE_NAME, SITE_TAGLINE, SITE_URL, absoluteUrl } from '@/lib/site'
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

const siteUrl = SITE_URL

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME}: ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Objeto de diseño con NFC y QR para que tus clientes dejen su reseña en Google con un toque. Cambia el destino cuando quieras. Pruébalo 30 días.',
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteUrl,
    siteName: SITE_NAME,
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
    description:
      'Objeto de diseño con NFC y QR para que tus clientes dejen su reseña en Google con un toque. Pruébalo 30 días.',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME}: ${SITE_TAGLINE}`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

const siteLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/icon-512.png'),
    description: 'Objetos con NFC y QR impresos en 3D para que los clientes de un negocio dejen reseñas en Google.',
    address: { '@type': 'PostalAddress', addressLocality: 'Albacete', addressCountry: 'ES' },
    areaServed: 'ES',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: absoluteUrl('/'),
    inLanguage: 'es-ES',
  },
]

export const viewport: Viewport = {
  themeColor: '#FBFBF9',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${geist.variable}`}>
      <body className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <JsonLd data={siteLd} />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
