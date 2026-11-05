'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { clientApi, type FileLink, type FileLinkEvent, type SharedFile } from '@/lib/clientApi'
import {
  AlertCircle,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  CircleDashed,
  Copy,
  Download,
  Eye,
  FileText,
  Loader2,
  Mail,
  RefreshCw,
  Send,
  Trash2,
  Upload,
  UserPlus,
} from 'lucide-react'

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })
}

function linkUrl(token: string) {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://standurl.com'
  return `${origin}/d/${token}`
}

function mailtoHref(link: FileLink, fileName: string, businessName: string) {
  const subject = `Te envío «${fileName}»`
  const body =
    `Hola ${link.recipientName},\n\n` +
    `Te dejo aquí el documento «${fileName}» para que lo descargues:\n\n` +
    `${linkUrl(link.token)}\n\n` +
    `Cualquier duda, responde a este correo.\n\nUn saludo,\n${businessName}`
  return `mailto:${encodeURIComponent(link.recipientEmail ?? '')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

function fileKind(name: string) {
  const ext = name.includes('.') ? name.split('.').pop()!.toUpperCase() : ''
  return ext && ext.length <= 5 ? ext : 'Fichero'
}

/**
 * Bloque para pegar en el correo: un botón con el nombre del fichero en vez de la URL en crudo.
 * Va en una tabla con estilos en línea porque es lo único que respetan Gmail, Outlook y Apple Mail
 * al pegar (Outlook ignora el padding de los <a>).
 */
function emailSnippet(file: SharedFile, link: FileLink) {
  const url = linkUrl(link.token)
  const label = `Descargar ${file.originalName}`
  const meta = `${fileKind(file.originalName)} · ${formatSize(file.sizeBytes)}`
  const html =
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin:8px 0;">` +
    `<tr><td bgcolor="#18181B" style="background:#18181B;border-radius:8px;">` +
    `<a href="${escapeHtml(url)}" target="_blank" style="display:inline-block;padding:12px 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:bold;color:#FFFFFF;text-decoration:none;border-radius:8px;">` +
    `&#11015;&#65039; ${escapeHtml(label)}</a></td></tr>` +
    `<tr><td style="padding-top:6px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#78716C;">${escapeHtml(meta)}</td></tr>` +
    `</table>`
  // Texto plano para clientes que no aceptan formato: al menos lleva una frase delante de la URL
  const text = `${label} (${meta}):\n${url}`
  return { html, text }
}

async function copyRich(html: string, text: string) {
  if (typeof ClipboardItem !== 'undefined' && navigator.clipboard?.write) {
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([text], { type: 'text/plain' }),
      }),
    ])
    return
  }
  // Navegadores sin ClipboardItem (Firefox antiguo): copiar una selección con formato
  const container = document.createElement('div')
  container.innerHTML = html
  container.style.position = 'fixed'
  container.style.left = '-9999px'
  document.body.appendChild(container)
  const range = document.createRange()
  range.selectNodeContents(container)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
  const ok = document.execCommand('copy')
  selection?.removeAllRanges()
  container.remove()
  if (!ok) throw new Error('copy failed')
}

function LinkStatus({ link }: { link: FileLink }) {
  if (link.downloadCount > 0) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
        <Download size={11} />
        Descargado {formatDate(link.firstDownloadedAt)}
        {link.downloadCount > 1 && ` · ${link.downloadCount} veces`}
      </span>
    )
  }
  if (link.openCount > 0) {
    return (
      <span
        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#B45309] bg-[#FEF3C7] border border-[#FDE68A] px-2 py-0.5 rounded-full"
        title="Se abrió la página del enlace pero no se pulsó Descargar. Puede ser la persona o el antivirus de su correo."
      >
        <Eye size={11} />
        Abierto sin descargar
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#78716C] bg-[#F3EFE6] border border-[#E5DFD3] px-2 py-0.5 rounded-full">
      <CircleDashed size={11} />
      Pendiente
    </span>
  )
}

function LinkRow({
  link,
  file,
  businessName,
  onDeleted,
}: {
  link: FileLink
  file: SharedFile
  businessName: string
  onDeleted: (id: string) => void
}) {
  const { token } = useAuth()
  const [copied, setCopied] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState<'ok' | 'error' | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [events, setEvents] = useState<FileLinkEvent[] | null>(null)
  const [busy, setBusy] = useState(false)

  function copy() {
    navigator.clipboard.writeText(linkUrl(link.token))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function copyForEmail() {
    const { html, text } = emailSnippet(file, link)
    try {
      await copyRich(html, text)
      setCopiedEmail('ok')
    } catch {
      setCopiedEmail('error')
    }
    setTimeout(() => setCopiedEmail(null), 4000)
  }

  async function toggleHistory() {
    const next = !showHistory
    setShowHistory(next)
    if (next && token) {
      try {
        setEvents(await clientApi.getFileLinkEvents(token, link.id))
      } catch {
        setEvents([])
      }
    }
  }

  async function remove() {
    if (!token || !confirm(`¿Retirar el enlace de ${link.recipientName}? Dejará de funcionar.`)) return
    setBusy(true)
    try {
      await clientApi.deleteFileLink(token, link.id)
      onDeleted(link.id)
    } finally {
      setBusy(false)
    }
  }

  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-sm text-[#111827] truncate">{link.recipientName}</span>
            <LinkStatus link={link} />
          </div>
          {link.recipientEmail && (
            <span className="block text-xs text-[#78716C] truncate">{link.recipientEmail}</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1 shrink-0">
          <button
            onClick={copyForEmail}
            className="inline-flex items-center gap-1 text-xs font-bold text-white bg-[#18181B] hover:bg-[#27272A] px-2.5 py-1.5 rounded-lg transition-colors"
            title="Copia un botón «Descargar …» para pegarlo en tu correo, en vez del enlace en crudo"
          >
            {copiedEmail === 'ok' ? <Check size={12} /> : <ClipboardCopy size={12} />}
            {copiedEmail === 'ok' ? 'Copiado' : 'Copiar para el correo'}
          </button>
          {link.recipientEmail && (
            <a
              href={mailtoHref(link, file.originalName, businessName)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#111827] bg-[#F3EFE6] hover:bg-[#E5DFD3] border border-[#E5DFD3] px-2.5 py-1.5 rounded-lg transition-colors"
              title="Abrir tu programa de correo con el mensaje y el enlace ya escritos"
            >
              <Mail size={12} className="text-[#B45309]" />
              Redactar correo
            </a>
          )}
          <button
            onClick={copy}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#78716C] hover:text-[#111827] px-2 py-1.5 rounded-lg hover:bg-[#F3EFE6] transition-colors"
            title="Copiar enlace personal"
          >
            {copied ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
            {copied ? 'Copiado' : 'Copiar enlace'}
          </button>
          <button
            onClick={toggleHistory}
            className="p-1.5 rounded-lg text-[#78716C] hover:text-[#111827] hover:bg-[#F3EFE6] transition-colors"
            title="Ver historial"
          >
            {showHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button
            onClick={remove}
            disabled={busy}
            className="p-1.5 rounded-lg text-[#A8A29E] hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
            title="Retirar enlace"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      {copiedEmail === 'ok' && (
        <p className="mt-2 text-xs text-green-700 font-medium">
          Listo: pégalo en el cuerpo de tu correo (Ctrl+V / ⌘+V) y aparecerá como un botón de descarga.
        </p>
      )}
      {copiedEmail === 'error' && (
        <p className="mt-2 text-xs text-red-600 font-medium">
          Tu navegador no permite copiar con formato. Usa «Copiar enlace» y enlázalo a un texto en tu correo.
        </p>
      )}

      {showHistory && (
        <div className="mt-2 bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-3 py-2 text-xs text-[#78716C]">
          {events === null ? (
            <Loader2 size={13} className="animate-spin" />
          ) : events.length === 0 ? (
            <span>Sin actividad todavía. Enlace creado el {formatDate(link.createdAt)}.</span>
          ) : (
            <ul className="space-y-1">
              {events.map((ev, i) => (
                <li key={i} className="flex items-center gap-2">
                  {ev.type === 'download' ? (
                    <Download size={11} className="text-green-600 shrink-0" />
                  ) : (
                    <Eye size={11} className="text-[#B45309] shrink-0" />
                  )}
                  <span className="font-semibold text-[#111827]">{formatDate(ev.timestamp)}</span>
                  <span>{ev.type === 'download' ? 'Descargó el fichero' : 'Abrió el enlace'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  )
}

function FileCard({
  file,
  businessName,
  onChange,
  onDeleted,
}: {
  file: SharedFile
  businessName: string
  onChange: (f: SharedFile) => void
  onDeleted: (id: string) => void
}) {
  const { token } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  const downloaded = file.links.filter(l => l.downloadCount > 0).length

  async function addRecipient(e: React.FormEvent) {
    e.preventDefault()
    if (!token) return
    setError('')
    setAdding(true)
    try {
      const link = await clientApi.createFileLink(token, file.id, {
        recipientName: name.trim(),
        recipientEmail: email.trim() || undefined,
      })
      onChange({ ...file, links: [...file.links, link] })
      setName('')
      setEmail('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'No se pudo crear el enlace')
    } finally {
      setAdding(false)
    }
  }

  async function removeFile() {
    if (!token || !confirm(`¿Eliminar «${file.originalName}» y todos sus enlaces?`)) return
    await clientApi.deleteFile(token, file.id)
    onDeleted(file.id)
  }

  return (
    <div className="bg-white border border-[#E7E5E4] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-[#F3EFE6] border border-[#E5DFD3] flex items-center justify-center text-[#18181B] shrink-0">
            <FileText size={20} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-[#111827] text-base leading-tight truncate" title={file.originalName}>
              {file.originalName}
            </h3>
            <p className="text-xs text-[#78716C] mt-0.5">
              {formatSize(file.sizeBytes)} · subido el {formatDate(file.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {file.links.length > 0 && (
            <span className="text-xs font-bold text-[#111827] bg-[#FBFBF9] border border-[#E7E5E4] px-2.5 py-1 rounded-full">
              {downloaded}/{file.links.length} descargado
            </span>
          )}
          <button
            onClick={removeFile}
            className="p-1.5 rounded-lg text-[#A8A29E] hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Eliminar fichero"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {file.links.length > 0 && (
        <ul className="divide-y divide-[#E7E5E4] border-t border-[#E7E5E4] pt-3">
          {file.links.map(link => (
            <LinkRow
              key={link.id}
              link={link}
              file={file}
              businessName={businessName}
              onDeleted={id => onChange({ ...file, links: file.links.filter(l => l.id !== id) })}
            />
          ))}
        </ul>
      )}

      <form onSubmit={addRecipient} className="bg-[#FBFBF9] border border-[#E7E5E4] rounded-2xl p-3 space-y-2">
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#78716C]">
          <UserPlus size={12} /> Crear enlace para un destinatario
        </span>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            required
            maxLength={120}
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Nombre (p. ej. Laura · Gym Fit)"
            className="flex-1 min-w-0 bg-white border border-[#E7E5E4] rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#18181B]"
          />
          <input
            type="email"
            maxLength={254}
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email (opcional)"
            className="flex-1 min-w-0 bg-white border border-[#E7E5E4] rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none focus:border-[#18181B]"
          />
          <button
            type="submit"
            disabled={adding}
            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-xs disabled:opacity-50 transition-colors"
          >
            {adding ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
            Crear enlace
          </button>
        </div>
        {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      </form>
    </div>
  )
}

export function FileSharesSection({ businessName }: { businessName: string }) {
  const { token } = useAuth()
  const [files, setFiles] = useState<SharedFile[] | null>(null)
  const [uploading, setUploading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const load = useCallback(async () => {
    if (!token) return
    setRefreshing(true)
    try {
      setFiles(await clientApi.getFiles(token))
      setError('')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar los ficheros')
      setFiles(prev => prev ?? [])
    } finally {
      setRefreshing(false)
    }
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !token) return
    setError('')
    setUploading(true)
    try {
      const created = await clientApi.uploadFile(token, file)
      setFiles(prev => [{ ...created, links: [] }, ...(prev ?? [])])
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'No se pudo subir el fichero')
    } finally {
      setUploading(false)
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[#111827]">Envíos con seguimiento</h2>
          <p className="text-xs text-[#78716C]">
            Sube un documento, crea un enlace para cada persona y pégalo en tu correo. Verás quién lo descarga y
            cuándo, y te avisaremos por email con la primera descarga de cada uno.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={load}
            disabled={refreshing}
            className="p-2 rounded-xl border border-[#E7E5E4] bg-white text-[#78716C] hover:text-[#111827] hover:bg-[#F3EFE6] transition-colors disabled:opacity-50"
            title="Actualizar estado"
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-[#18181B] hover:bg-[#27272A] px-3.5 py-2 rounded-xl transition-colors disabled:opacity-50"
          >
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            {uploading ? 'Subiendo…' : 'Subir fichero'}
          </button>
          <input ref={inputRef} type="file" className="hidden" onChange={handleUpload} />
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-2xl">
          <AlertCircle size={17} className="shrink-0 mt-0.5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {files === null ? (
        <div className="h-32 bg-white border border-[#E7E5E4] rounded-3xl animate-pulse" />
      ) : files.length === 0 ? (
        <div className="bg-white border border-dashed border-[#D6D3D1] rounded-3xl p-8 text-center space-y-2">
          <Upload size={28} className="mx-auto text-[#A8A29E]" />
          <h3 className="font-bold text-[#111827] text-sm">Aún no has compartido ningún fichero</h3>
          <p className="text-xs text-[#78716C] max-w-md mx-auto">
            Ideal para catálogos, presupuestos o dossieres: sabrás si el cliente se lo ha descargado o si toca
            volver a llamarle.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {files.map(file => (
            <FileCard
              key={file.id}
              file={file}
              businessName={businessName}
              onChange={updated => setFiles(prev => (prev ?? []).map(f => (f.id === updated.id ? updated : f)))}
              onDeleted={id => setFiles(prev => (prev ?? []).filter(f => f.id !== id))}
            />
          ))}
        </div>
      )}
    </section>
  )
}
