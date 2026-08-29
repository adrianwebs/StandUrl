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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white border border-[#E7E5E4] rounded-3xl p-6 sm:p-7 w-full max-w-xl shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E7E5E4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#F3EFE6] border border-[#E5DFD3] flex items-center justify-center text-[#18181B]">
              <QrIcon size={18} />
            </div>
            <div>
              <h3 className="font-bold text-[#111827] text-base leading-tight">
                {device.label}
              </h3>
              <p className="text-xs text-[#78716C]">
                Código QR vectorial · Token <span className="font-mono font-semibold text-[#111827]">{device.token}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#78716C] hover:text-[#111827] transition-colors p-1.5 rounded-lg hover:bg-[#F3EFE6]"
            title="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        {/* QR Preview & Model 3D Notice */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center my-4">
          {/* QR visual container */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#FBFBF9] border border-[#E7E5E4] rounded-2xl">
            <div
              className={`p-3 rounded-xl ${
                transparentBg
                  ? 'bg-[radial-gradient(#CCC_1px,transparent_1px)] [background-size:8px_8px] bg-white border border-[#E7E5E4]'
                  : 'bg-white border border-[#E7E5E4]'
              } shadow-sm transition-colors`}
            >
              {generating ? (
                <div className="w-44 h-44 flex items-center justify-center text-xs text-[#78716C]">
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
            <div className="flex items-center gap-2 mt-3 text-[11px] text-[#78716C]">
              <button
                type="button"
                onClick={() => setTransparentBg(prev => !prev)}
                className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                  transparentBg
                    ? 'bg-[#18181B] border-[#18181B] text-white'
                    : 'bg-white border-[#E7E5E4] text-[#111827] hover:bg-[#F3EFE6]'
                }`}
              >
                {transparentBg ? 'Fondo Transparente' : 'Fondo Blanco'}
              </button>
            </div>
          </div>

          {/* Details & Info for 3D modeling */}
          <div className="space-y-3 text-xs">
            <div className="bg-[#F3EFE6] border border-[#E5DFD3] rounded-2xl p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#B45309] font-bold text-[11px] uppercase tracking-wider">
                <Box size={14} />
                <span>Compatibilidad 3D / Blender</span>
              </div>
              <p className="text-[#78716C] leading-relaxed text-[11px]">
                Este SVG está generado con <strong className="text-[#111827]">polígonos 2D cerrados</strong> (sin líneas abiertas ni fondo blanco plano).
              </p>
              <div className="bg-white border border-[#E5DFD3] rounded-xl p-2.5 text-[10.5px] text-[#78716C] space-y-1">
                <p className="text-[#111827] font-bold">Pasos en Blender:</p>
                <ol className="list-decimal list-inside space-y-0.5 text-[#78716C]">
                  <li><code className="text-[#B45309] font-semibold">File &gt; Import &gt; SVG (.svg)</code></li>
                  <li>Selecciona la curva importada</li>
                  <li>En <strong className="text-[#111827]">Geometry &gt; Extrude</strong> sube el valor para darle grosor 3D sólido</li>
                </ol>
              </div>
            </div>

            <div className="bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl p-2.5 text-[11px] text-[#78716C]">
              <div className="font-mono text-[#111827] font-medium truncate mb-1" title={redirectUrl}>
                {redirectUrl}
              </div>
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#E7E5E4]">
                <button
                  onClick={copyRedirectLink}
                  className="inline-flex items-center gap-1 text-[#B45309] font-semibold hover:underline text-[11px]"
                >
                  {copiedLink ? <Check size={11} className="text-[#16A34A]" /> : <Copy size={11} />}
                  <span>{copiedLink ? 'Copiado' : 'Copiar URL'}</span>
                </button>
                <a
                  href={redirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#78716C] hover:text-[#111827] text-[11px] font-medium"
                >
                  <span>Probar</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#E7E5E4]">
          <button
            onClick={downloadSvgForBlender}
            disabled={generating || !svg3dContent}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-xs transition-colors shadow-md disabled:opacity-50"
          >
            <Download size={14} />
            <span>Descargar SVG (3D / Blender)</span>
          </button>

          <button
            onClick={downloadPng}
            disabled={generating || !pngDataUrl}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-[#F3EFE6] border border-[#E7E5E4] text-[#111827] font-bold text-xs transition-colors disabled:opacity-50"
          >
            <Download size={14} className="text-[#78716C]" />
            <span>Descargar PNG (1024px)</span>
          </button>

          <button
            onClick={copySvgCode}
            disabled={generating || !svg3dContent}
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#FBFBF9] hover:bg-[#F3EFE6] border border-[#E7E5E4] text-[#78716C] hover:text-[#111827] text-xs transition-colors sm:col-span-2 disabled:opacity-50 font-medium"
            title="Copiar código SVG para pegar en Illustrator o Figma"
          >
            {copiedSvg ? (
              <>
                <Check size={13} className="text-[#16A34A]" />
                <span className="text-[#16A34A] font-semibold">¡Código SVG copiado al portapapeles!</span>
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
