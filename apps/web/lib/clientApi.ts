const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export interface BusinessProfile {
  id: string
  name: string
  slug: string
  email: string
  sector: string
  plan: string
  createdAt: string
  deviceCount: number
}

export interface ClientStats {
  thisMonth: number
  lastMonth: number
  trendPercent: number
  totalDevices: number
}

export interface ClientDevice {
  id: string
  token: string
  label: string
  destinationUrl: string
  status: string
  modelType: string
  createdAt: string
  interactionCount?: number
}

export interface DeviceDetailedStats {
  total: number
  thisMonth: number
  recent: Array<{
    timestamp: string
    source: string
    userAgent: string
  }>
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

export interface FileLink {
  id: string
  token: string
  recipientName: string
  recipientEmail: string | null
  isActive: boolean
  createdAt: string
  openCount: number
  downloadCount: number
  firstOpenedAt: string | null
  firstDownloadedAt: string | null
  lastDownloadedAt: string | null
}

export interface SharedFile {
  id: string
  originalName: string
  contentType: string
  sizeBytes: number
  createdAt: string
  links: FileLink[]
}

export interface FileLinkEvent {
  type: 'open' | 'download'
  timestamp: string
  userAgent: string | null
}

async function apiFetch<T>(path: string, token: string, options?: RequestInit): Promise<T> {
  const isForm = typeof FormData !== 'undefined' && options?.body instanceof FormData
  const res = await fetch(API_URL + path, {
    ...options,
    headers: {
      // Con FormData el navegador pone el Content-Type multipart con su boundary
      ...(isForm ? {} : { 'Content-Type': 'application/json' }),
      Authorization: 'Bearer ' + token,
      ...options?.headers,
    },
  })
  if (!res.ok) {
    let errorMsg = res.statusText
    try {
      const data = await res.json()
      errorMsg = data.error || data.detail || data.message || errorMsg
    } catch {
      const text = await res.text().catch(() => '')
      if (text) errorMsg = text
    }
    throw new Error(errorMsg || `Error ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export const clientApi = {
  getMe: (token: string) => apiFetch<BusinessProfile>('/api/businesses/me', token),
  getMyStats: (token: string) => apiFetch<ClientStats>('/api/businesses/me/stats', token),
  getMyDevices: (token: string) => apiFetch<ClientDevice[]>('/api/devices', token),
  updateDevice: (token: string, deviceId: string, payload: { destinationUrl?: string; label?: string; status?: string }) =>
    apiFetch<ClientDevice>('/api/devices/' + deviceId, token, { method: 'PATCH', body: JSON.stringify(payload) }),
  getDeviceStats: (token: string, deviceId: string) =>
    apiFetch<DeviceDetailedStats>('/api/devices/' + deviceId + '/stats', token),
  changePassword: (token: string, payload: ChangePasswordPayload) =>
    apiFetch<{ message: string }>('/api/businesses/me/change-password', token, { method: 'POST', body: JSON.stringify(payload) }),

  // ── Ficheros con enlaces de descarga con seguimiento ──
  getFiles: (token: string) => apiFetch<SharedFile[]>('/api/files', token),
  uploadFile: (token: string, file: File) => {
    const form = new FormData()
    form.append('file', file)
    return apiFetch<SharedFile>('/api/files', token, { method: 'POST', body: form })
  },
  deleteFile: (token: string, fileId: string) =>
    apiFetch<void>('/api/files/' + fileId, token, { method: 'DELETE' }),
  createFileLink: (token: string, fileId: string, payload: { recipientName: string; recipientEmail?: string }) =>
    apiFetch<FileLink>('/api/files/' + fileId + '/links', token, { method: 'POST', body: JSON.stringify(payload) }),
  deleteFileLink: (token: string, linkId: string) =>
    apiFetch<void>('/api/files/links/' + linkId, token, { method: 'DELETE' }),
  getFileLinkEvents: (token: string, linkId: string) =>
    apiFetch<FileLinkEvent[]>('/api/files/links/' + linkId + '/events', token),
}
