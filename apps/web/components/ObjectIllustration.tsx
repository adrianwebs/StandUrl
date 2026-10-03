// Ilustración vectorial del objeto (pesa) con chip NFC y QR. Sustituir por fotografía real cuando exista.
export default function ObjectIllustration({
  className,
  label = 'Ilustración de una pesa hexagonal con chip NFC y código QR',
  tone = 'dark',
}: {
  className?: string
  label?: string
  tone?: 'dark' | 'amber'
}) {
  const body = tone === 'dark' ? '#18181B' : '#B45309'
  const bodyLight = tone === 'dark' ? '#3F3F46' : '#D97706'
  const handle = tone === 'dark' ? '#27272A' : '#92400E'
  const qr = [
    [0, 0], [1, 0], [2, 0], [4, 0], [6, 0], [0, 1], [2, 1], [3, 1], [6, 1], [0, 2], [1, 2], [2, 2], [4, 2], [5, 2],
    [3, 3], [5, 3], [0, 4], [1, 4], [3, 4], [4, 4], [6, 4], [0, 5], [2, 5], [5, 5], [6, 5], [0, 6], [1, 6], [4, 6], [6, 6],
  ]
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label={label} className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="oi-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={bodyLight} />
          <stop offset="1" stopColor={body} />
        </linearGradient>
        <linearGradient id="oi-handle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={bodyLight} />
          <stop offset="0.45" stopColor={handle} />
          <stop offset="1" stopColor={body} />
        </linearGradient>
      </defs>
      <ellipse cx="240" cy="318" rx="176" ry="15" fill="#E5DFD3" opacity="0.7" />
      {/* Ondas NFC */}
      <g fill="none" stroke="#B45309" strokeWidth="5" strokeLinecap="round">
        <path d="M205 112 a48 48 0 0 1 70 0" opacity="0.95" />
        <path d="M186 90 a76 76 0 0 1 108 0" opacity="0.6" />
        <path d="M167 68 a104 104 0 0 1 146 0" opacity="0.3" />
      </g>
      {/* Discos exteriores */}
      <rect x="34" y="138" width="38" height="104" rx="12" fill="url(#oi-head)" />
      <rect x="408" y="138" width="38" height="104" rx="12" fill="url(#oi-head)" />
      {/* Cabezas hexagonales (vista lateral) */}
      <rect x="66" y="108" width="74" height="164" rx="20" fill="url(#oi-head)" />
      <rect x="340" y="108" width="74" height="164" rx="20" fill="url(#oi-head)" />
      <rect x="76" y="116" width="10" height="148" rx="5" fill="#FFFFFF" opacity="0.12" />
      <rect x="350" y="116" width="10" height="148" rx="5" fill="#FFFFFF" opacity="0.12" />
      {/* Barra */}
      <rect x="132" y="168" width="216" height="44" rx="16" fill="url(#oi-handle)" />
      <rect x="146" y="174" width="188" height="6" rx="3" fill="#FFFFFF" opacity="0.14" />
      {/* Chip NFC */}
      <circle cx="240" cy="190" r="27" fill="#F3EFE6" stroke="#B45309" strokeWidth="3" />
      <g fill="none" stroke="#18181B" strokeWidth="3.2" strokeLinecap="round">
        <path d="M232 182 a12 12 0 0 1 0 16" />
        <path d="M238 178 a18 18 0 0 1 0 24" />
        <path d="M244 174 a24 24 0 0 1 0 32" />
      </g>
      {/* QR estilizado */}
      <rect x="77" y="148" width="52" height="52" rx="6" fill="#F3EFE6" />
      <g fill="#18181B">
        {qr.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={83 + x * 6} y={154 + y * 6} width="5" height="5" rx="1" />
        ))}
      </g>
    </svg>
  )
}
