// Marcador para modelos que todavía no existen. No muestra un objeto que no está disponible.
export default function ModelPlaceholder({ label = 'Modelo en preparación' }: { label?: string }) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label={label} className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <rect x="130" y="70" width="220" height="220" rx="44" fill="#FBFBF9" stroke="#D6D3D1" strokeWidth="3" strokeDasharray="10 10" />
      <circle cx="240" cy="170" r="42" fill="#F3EFE6" stroke="#B45309" strokeWidth="3" />
      <g fill="none" stroke="#18181B" strokeWidth="4" strokeLinecap="round">
        <path d="M228 158 a18 18 0 0 1 0 24" />
        <path d="M237 152 a27 27 0 0 1 0 36" />
        <path d="M246 146 a36 36 0 0 1 0 48" />
      </g>
      <text x="240" y="322" textAnchor="middle" fontSize="22" fontWeight="700" fill="#78716C" fontFamily="sans-serif">
        {label}
      </text>
    </svg>
  )
}
