'use server'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitProtoRequest(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const businessName = formData.get('businessName')?.toString().trim()
  const sector = formData.get('sector')?.toString()
  const city = formData.get('city')?.toString().trim()
  const contact = formData.get('contact')?.toString().trim()
  const googleMapsUrl = formData.get('googleMapsUrl')?.toString().trim() || undefined

  if (!businessName || !city || !contact) {
    return { status: 'error', message: 'Rellena los campos obligatorios.' }
  }

  try {
    const apiUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
    const res = await fetch(`${apiUrl}/api/proto-request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, sector, city, contact, googleMapsUrl }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      return { status: 'error', message: (err as { error?: string }).error || 'Error al enviar. Inténtalo de nuevo.' }
    }

    return { status: 'success', message: '¡Recibido! Te contactaremos en menos de 24 horas.' }
  } catch {
    return { status: 'error', message: 'Error de conexión. Inténtalo de nuevo.' }
  }
}
