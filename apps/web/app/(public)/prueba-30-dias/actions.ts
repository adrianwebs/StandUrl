'use server'

export type FormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

const PACK_LABELS: Record<string, string> = {
  starter: 'Pack Starter (1 objeto)',
  pro: 'Pack Pro (2 objetos)',
  business: 'Pack Business (4 objetos)',
  consulta: 'Aún no lo sé / consulta',
}

const MAX = { businessName: 120, city: 80, contact: 80, url: 500, message: 600 }

export async function submitProtoRequest(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  // Honeypot: un campo oculto que las personas no rellenan.
  if (formData.get('website')?.toString().trim()) {
    return { status: 'success', message: '¡Recibido! Te contactaremos en breve.' }
  }

  const businessName = formData.get('businessName')?.toString().trim().slice(0, MAX.businessName)
  const sectorValue = formData.get('sector')?.toString() || 'otro'
  const pack = formData.get('pack')?.toString() || 'consulta'
  const waitlist = formData.get('waitlist')?.toString() === '1'
  const city = formData.get('city')?.toString().trim().slice(0, MAX.city)
  const contact = formData.get('contact')?.toString().trim().slice(0, MAX.contact)
  const googleMapsUrl = formData.get('googleMapsUrl')?.toString().trim().slice(0, MAX.url) || undefined
  const message = formData.get('message')?.toString().trim().slice(0, MAX.message)

  if (!businessName || !city || !contact) {
    return { status: 'error', message: 'Rellena los campos obligatorios.' }
  }

  // La API actual solo admite estos campos. Hasta que se amplíe, el pack, la lista de espera
  // y el mensaje viajan dentro del campo "sector" (que aparece tal cual en el correo interno).
  const sector = [
    sectorValue,
    waitlist ? null : (PACK_LABELS[pack] ?? pack),
    waitlist ? 'LISTA DE ESPERA (modelo en preparación)' : null,
    message ? `Mensaje: ${message}` : null,
  ]
    .filter(Boolean)
    .join(' | ')

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

    return {
      status: 'success',
      message: waitlist
        ? '¡Apuntado! Te avisaremos en cuanto el modelo de tu sector esté listo.'
        : '¡Recibido! Te contactaremos para confirmar el pedido. No se te ha cobrado nada.',
    }
  } catch {
    return { status: 'error', message: 'Error de conexión. Inténtalo de nuevo.' }
  }
}
