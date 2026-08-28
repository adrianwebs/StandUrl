const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export interface AdminStats { totalBusinesses: number; activeBusinesses: number; totalDevices: number; activeDevices: number; totalScansMonth: number; totalScansAllTime: number }
export interface BusinessSummary { id: string; name: string; slug: string; email: string; sector: string; plan: string; isActive: boolean; createdAt: string; deviceCount: number; totalScans: number }
export interface DeviceSummary { id: string; token: string; label: string; destinationUrl: string; status: string; modelType: string; createdAt: string; interactionCount: number; lastScan: string | null }
export interface LoginResponse { accessToken: string; businessId: string; name: string; plan: string; role: string }
export interface CreateBusinessPayload { name: string; email: string; sector?: string; plan?: string }
export interface UpdateBusinessPayload { name?: string; sector?: string; plan?: string; isActive?: boolean }
export interface CreateDevicePayload { label: string; destinationUrl: string; modelType?: string }
export interface UpdateDevicePayload { label?: string; destinationUrl?: string; status?: string }

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
    const text = await res.text().catch(() => res.statusText)
    throw new Error('API ' + res.status + ': ' + text)
  }
  if (res.status === 204) return undefined as T
  return res.json()
}

export async function apiLogin(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(API_URL + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    throw new Error(res.status === 401 ? 'Email o contraseña incorrectos' : 'Error de conexión')
  }
  return res.json()
}

export const adminApi = {
  getStats: (token: string) => apiFetch<AdminStats>('/api/admin/stats', token),
  getBusinesses: (token: string) => apiFetch<BusinessSummary[]>('/api/admin/businesses', token),
  getBusiness: (token: string, id: string) => apiFetch<BusinessSummary>('/api/admin/businesses/' + id, token),
  createBusiness: (token: string, payload: CreateBusinessPayload) => apiFetch<BusinessSummary>('/api/admin/businesses', token, { method: 'POST', body: JSON.stringify(payload) }),
  updateBusiness: (token: string, id: string, payload: UpdateBusinessPayload) => apiFetch<BusinessSummary>('/api/admin/businesses/' + id, token, { method: 'PATCH', body: JSON.stringify(payload) }),
  getDevices: (token: string, businessId: string) => apiFetch<DeviceSummary[]>('/api/admin/businesses/' + businessId + '/devices', token),
  createDevice: (token: string, businessId: string, payload: CreateDevicePayload) => apiFetch<DeviceSummary>('/api/admin/businesses/' + businessId + '/devices', token, { method: 'POST', body: JSON.stringify(payload) }),
  updateDevice: (token: string, deviceId: string, payload: UpdateDevicePayload) => apiFetch<DeviceSummary>('/api/admin/devices/' + deviceId, token, { method: 'PATCH', body: JSON.stringify(payload) }),
  resendAccess: (token: string, businessId: string) => apiFetch<{ message: string; email?: string }>('/api/admin/businesses/' + businessId + '/resend-access', token, { method: 'POST' }),
}
