'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import QRCode from 'qrcode'
import {
  X,
  Download,
  Copy,
  Check,
  ExternalLink,
  Code2,
  QrCode as QrIcon,
  Sparkles,
  Box,
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

/**
 * Genera un SVG compuesto exclusivamente por polígonos cerrados 2D (comando 'Z').
 * Diseñado específicamente para Blender, Fusion 360, FreeCAD e impresoras 3D,
 * garantizando que al importar en Blender se reconozcan como caras sólidas y se puedan
 * extruir (Geometry > Extrude) sin líneas abiertas ni errores de curva.
 */
function buildBlenderCompatibleSvg(
  url: string,
  options: {
    margin?: number
    moduleSize?: number
    includeBackground?: boolean
  } = {}
): string {
  const margin = options.margin ?? 1
  const moduleSize = options.moduleSize ?? 10
  const includeBackground = options.includeBackground ?? false

  const qr = QRCode.create(url, { errorCorrectionLevel: 'M' })
  const matrixSize = qr.modules.size
  const totalUnits = (matrixSize + margin * 2) * moduleSize

  let pathD = ''

  for (let row = 0; row < matrixSize; row++) {
    let col = 0
    while (col < matrixSize) {
      if (qr.modules.get(row, col)) {
        // Agrupar módulos horizontales consecutivos en un solo polígono cerrado para optimizar geometría
        const startCol = col
        while (col < matrixSize && qr.modules.get(row, col)) {
          col++
        }
        const spanCols = col - startCol
        const x = (startCol + margin) * moduleSize
        const y = (row + margin) * moduleSize
        const width = spanCols * moduleSize
        const height = moduleSize

        // Polígono rectangular cerrado con comando Z explícito
        pathD += `M${x},${y}h${width}v${height}h-${width}Z `
      } else {
        col++
      }
    }
  }

  const bgRect = includeBackground
    ? `<rect width="${totalUnits}" height="${totalUnits}" fill="#FFFFFF"/>\n`
    : ''

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalUnits} ${totalUnits}" width="${totalUnits}" height="${totalUnits}" shape-rendering="crispEdges">
${bgRect}<path fill="#000000" fill-rule="nonzero" stroke="none" d="${pathD.trim()}"/>
</svg>`
}

export function DeviceQrModal({ device, onClose, siteUrl }: DeviceQrModalProps) {
  const [svg3dContent, setSvg3dContent] = useState<string>('')
  const [pngDataUrl, setPngDataUrl] = useState<string>('')
  const [copiedLink, setCopiedLink] = useState(false)
  const [copiedSvg, setCopiedSvg] = useState(false)
  const [transparentBg, setTransparentBg] = useState(true)
  const [generating, setGenerating] = useState(true)

  const redirectUrl = useMemo(() => {
    if (!device) return ''
    const origin =
      siteUrl || (typeof window !== 'undefined' ? window.location.origin : 'https://standurl.com')
    return `${origin.replace(/\/$/, '')}/t/${device.token}?src=qr`
  }, [device, siteUrl])

  const generateCodes = useCallback(async () => {
    if (!device || !redirectUrl) return

    setGenerating(true)
    try {
      // SVG vectorial con polígonos cerrados para Blender / CAD 3D (sin fondo)
      const svg3d = buildBlenderCompatibleSvg(redirectUrl, {
        margin: 1,
        moduleSize: 10,
        includeBackground: !transparentBg,
      })

      // PNG de alta resolución (1024x1024)
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

      setSvg3dContent(svg3d)
      setPngDataUrl(png)
      setGenerating(false)
    } catch (err) {
      console.error('Error generando códigos QR:', err)
      setGenerating(false)
    }
  }, [device, redirectUrl, transparentBg])

  useEffect(() => {
    generateCodes()
  }, [generateCodes])

  if (!device) return null

  const sanitizedFileName = `QR_${device.label.trim().replace(/[^a-zA-Z0-9_-]/g, '_')}_${device.token}`

  function downloadSvgForBlender() {
    // Generar siempre SVG puro sin fondo y con polígonos cerrados para Blender
    const pure3dSvg = buildBlenderCompatibleSvg(redirectUrl, {
      margin: 1,
      moduleSize: 10,
      includeBackground: false,
    })

    const blob = new Blob([pure3dSvg], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${sanitizedFileName}_3D.svg`
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
    if (!svg3dContent) return
    try {
      await navigator.clipboard.writeText(svg3dContent)
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
      <div className="bg-[#111] border border-[#2A2A2A] rounded-2xl p-6 sm:p-7 w-full max-w-xl shadow-2xl animate-in fade-in zoom-in-95 duration-150">
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
              ) : svg3dContent ? (
                <div
                  className="w-44 h-44 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                  dangerouslySetInnerHTML={{ __html: svg3dContent }}
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
                <Box size={14} />
                <span>Compatibilidad 3D / Blender</span>
              </div>
              <p className="text-[#AAA] leading-relaxed text-[11px]">
                Este SVG está generado con <strong>polígonos 2D cerrados</strong> (sin líneas abiertas ni fondo blanco plano).
              </p>
              <div className="bg-[#0F0F0F] border border-[#262626] rounded-lg p-2 text-[10.5px] text-[#888] space-y-1">
                <p className="text-[#CCC] font-semibold">Pasos en Blender:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-[#AAA]">
                  <li><code className="text-[#F5A623]">File &gt; Import &gt; SVG (.svg)</code></li>
                  <li>Selecciona la curva importada</li>
                  <li>En <strong>Geometry &gt; Extrude</strong> sube el valor para darle grosor 3D sólido</li>
                </ol>
              </div>
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
            onClick={downloadSvgForBlender}
            disabled={generating || !svg3dContent}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#F5A623] hover:bg-[#E59512] text-[#0A0A0A] font-bold text-xs transition-colors shadow-lg shadow-[#F5A623]/20 disabled:opacity-50"
          >
            <Download size={14} />
            <span>Descargar SVG (3D / Blender)</span>
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
            disabled={generating || !svg3dContent}
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
