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
  async rewrites() {
    return [
      {
        source: '/t/:path*',
        destination: `${apiUrl}/t/:path*`,
      },
      {
        // Enlaces de descarga con seguimiento (página + fichero los sirve la API)
        source: '/d/:path*',
        destination: `${apiUrl}/d/:path*`,
      },
    ]
  },
}

export default nextConfig
