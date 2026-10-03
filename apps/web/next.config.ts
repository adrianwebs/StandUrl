import type { NextConfig } from 'next'

const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:57068'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async redirects() {
    return [
      // El prototipo gratis se sustituyó por la prueba de 30 días.
      { source: '/prototipo-gratis', destination: '/prueba-30-dias', permanent: true },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/t/:path*',
        destination: `${apiUrl}/t/:path*`,
      },
    ]
  },
}

export default nextConfig
