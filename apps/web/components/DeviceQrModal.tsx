'use client'

import { useEffect, useState, useMemo } from 'react'
import QRCode from 'qrcode'
import {
  X,
  Download,
  Copy,
  Check,
  ExternalLink,
  Code2,
  QrCode as QrIcon,
  Layers,
  Sparkles,
} from 'lucide-react'

export interface QrDeviceData {
  id: string
  token: string
  label: string
  destinationUrl?: string
  modelType?: string
}

interface DeviceQrModalProps {
  device: QrDeviceData | null
  onClose: () => void
  siteUrl?: string
}

export function DeviceQrModal({ device, onClose, siteUrl }: DeviceQrModalProps) {
  const [svgContent, setSvgContent] = useState<string>('')
  const [pngDataUrl, setPngDataUrl] = useState<string>('')
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedSvg, setCopiedSvg] = useState(false)
  const [transparentBg, setTransparentBg] = useState(false)
  const [generating, setGenerating] = useState(true)

  const redirectUrl = useMemo(() => {
    if (!device) return ''
    const origin =
      siteUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://standurl.com')
    return `${origin.replace(/\/$/, '')}/t/${device.token}?src=qr`
  }, [device, siteUrl])

  useEffect(() => {
    if (!device || !redirectUrl) return

    let isMounted = true
    setGenerating(true)

    async function generateCodes() {
      try {
        // Generar SVG vectorial puro (ideal para Blender, Fusion 360, FreeCAD, Illustrator, corte láser)
        const svg = await QRCode.toString(redirectUrl, {
          type: 'svg',
          margin: 1,
          errorCorrectionLevel: 'M',
          color: {
            dark: '#000000',
            light: transparentBg ? '#00000000' : '#FFFFFF',
          },
        })

        // Generar PNG de alta resolución (1024x1024)
        const png = await QRCode.toDataURL(redirectUrl, {
          type: 'image/png',
          width: 1024,
          margin: 1,
          errorCorrectionLevel: 'M',
          color: {
            dark: '#000000',
            light: transparentBg ? '#00000000' : '#FFFFFF',
          },
        })

        if (isMounted) {
          setSvgContent(svg)
          setPngDataUrl(png)
          setGenerating(false)
        }
      } catch (err) {
        console.error('Error generando códigos QR:', err)
        if (isMounted) setGenerating(false)
      }
    }

    generateCodes()

    return () => {
      isMounted = false
    }
  }, [device, redirectUrl, transparentBg])

  if (!device) return null

  const sanitizedFileName = `QR_${device.label.trim().replace(/[^a-zA-Z0-9_-]/g, '_')}_${device.token}`

  function downloadSvg() {
    if (!svgContent) return
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${sanitizedFileName}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  function downloadPng() {
    if (!pngDataUrl) return
    const link = document.createElement('a')
    link.href = pngDataUrl
    link.download = `${sanitizedFileName}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  async function copySvgCode() {
    if (!svgContent) return
    try {
      await navigator.clipboard.writeText(svgContent)
      setCopiedSvg(true)
      setTimeout(() => setCopiedSvg(false), 2000)
    } catch (e) {
      console.error(e)
    }
  }

  async function copyRedirectLink() {
    try {
      await navigator.clipboard.writeText(redirectUrl)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2000)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-[#111] border border-[#2A2A2A] rounded-2xl p-6 sm:p-7 w-full max-w-lg shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#222]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F5A623]/10 border border-[#F5A623]/20 flex items-center justify-center text-[#F5A623]">
              <QrIcon size={18} />
            </div>
            <div>
              <h3 className="font-bold text-[#FAFAFA] text-base leading-tight">
                {device.label}
              </h3>
              <p className="text-xs text-[#777]">
                Código QR vectorial · Token <span className="font-mono text-[#AAA]">{device.token}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#666] hover:text-[#FAFAFA] transition-colors p-1.5 rounded-lg hover:bg-[#222]"
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* QR Preview & Model 3D Notice */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-4">
          {/* QR visual container */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#181818] border border-[#282828] rounded-xl">
            <div
              className={`p-3 rounded-lg ${
                transparentBg
                  ? 'bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:8px_8px] bg-[#222]'
                  : 'bg-white'
              } shadow-lg transition-colors`}
            >
              {generating ? (
                <div className="w-44 h-44 flex items-center justify-center text-xs text-[#888]">
                  Generando QR...
                </div>
              ) : svgContent ? (
                <div
                  className="w-44 h-44 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              ) : null}
            </div>

            {/* Background toggle */}
            <div className="flex items-center gap-2 mt-3 text-[11px] text-[#888]">
              <button
                type="button"
                onClick={() => setTransparentBg(prev => !prev)}
                className={`px-2.5 py-1 rounded-md border text-xs font-medium transition-colors ${
                  transparentBg
                    ? 'bg-[#F5A623]/10 border-[#F5A623]/30 text-[#F5A623]'
                    : 'bg-[#222] border-[#333] text-[#AAA] hover:text-white'
                }`}
              >
                {transparentBg ? 'Fondo Transparente' : 'Fondo Blanco'}
              </button>
            </div>
          </div>

          {/* Details & Info for 3D modeling */}
          <div className="space-y-3 text-xs">
            <div className="bg-[#181818] border border-[#282828] rounded-xl p-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#F5A623] font-semibold text-[11px] uppercase tracking-wider">
                <Sparkles size={13} />
                <span>Optimizado para Modelado 3D</span>
              </div>
              <p className="text-[#999] leading-relaxed text-[11px]">
                El archivo <strong>.SVG</strong> es un vector limpio con rutas exactas. Puedes importarlo directamente en:
              </p>
              <ul className="text-[#888] text-[11px] list-disc list-inside space-y-0.5">
                <li>Fusion 360 / FreeCAD / AutoCAD</li>
                <li>Blender (Curva / Extrusión 3D)</li>
                <li>Illustrator / LightBurn (Corte láser)</li>
                <li>Impresión 3D de 2 colores</li>
              </ul>
            </div>

            <div className="bg-[#141414] border border-[#222] rounded-lg p-2.5 text-[11px] text-[#777]">
              <div className="font-mono text-[#AAA] truncate mb-1" title={redirectUrl}>
                {redirectUrl}
              </div>
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#222]">
                <button
                  onClick={copyRedirectLink}
                  className="inline-flex items-center gap-1 text-[#F5A623] hover:underline text-[11px]"
                >
                  {copiedLink ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                  <span>{copiedLink ? 'Copiado' : 'Copiar URL'}</span>
                </button>
                <a
                  href={redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#888] hover:text-[#FAFAFA] text-[11px]"
                >
                  <span>Probar</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#222]">
          <button
            onClick={downloadSvg}
            disabled={generating || !svgContent}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F5A623] hover:bg-[#E59512] text-[#0A0A0A] font-bold text-xs transition-colors shadow-lg shadow-[#F5A623]/20 disabled:opacity-50"
          >
            <Download size={14} />
            <span>Descargar SVG Vectorial</span>
          </button>

          <button
            onClick={downloadPng}
            disabled={generating || !pngDataUrl}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#333] hover:border-[#444] text-[#FAFAFA] font-semibold text-xs transition-colors disabled:opacity-50"
          >
            <Download size={14} className="text-[#888]" />
            <span>Descargar PNG (1024px)</span>
          </button>

          <button
            onClick={copySvgCode}
            disabled={generating || !svgContent}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#161616] hover:bg-[#202020] border border-[#2A2A2A] text-[#AAA] hover:text-[#FAFAFA] text-xs transition-colors sm:col-span-2 disabled:opacity-50"
            title="Copiar código SVG para pegar en Illustrator o Figma"
          >
            {copiedSvg ? (
              <>
                <Check size={13} className="text-green-400" />
                <span className="text-green-400 font-medium">¡Código SVG copiado al portapapeles!</span>
              </>
            ) : (
              <>
                <Code2 size={13} />
                <span>Copiar código SVG XML (pegar directo en Figma/Illustrator)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
