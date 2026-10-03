import { ImageResponse } from 'next/og'

export const alt = 'StandUrl: soporte NFC y QR para reseñas de Google'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#F3EFE6',
          color: '#111827',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, color: '#B45309', letterSpacing: 2, textTransform: 'uppercase' }}>StandUrl</div>
        <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.1, marginTop: 24, maxWidth: 980 }}>
          Soporte NFC y QR para reseñas de Google
        </div>
        <div style={{ fontSize: 34, marginTop: 32, color: '#57534E' }}>Un objeto de diseño. Pruébalo 30 días.</div>
      </div>
    ),
    size
  )
}
