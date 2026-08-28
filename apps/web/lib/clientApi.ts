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

async function apiFetch<T>(path: string, token: string, options?: RequestInit): Promise<T> {
  const res = await fetch(API_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
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
}
