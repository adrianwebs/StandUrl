'use client'

import { useActionState } from 'react'
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { submitProtoRequest, type FormState } from './actions'
import { PACKS, formatEUR } from '@/lib/pricing'

const initialState: FormState = { status: 'idle' }

const inputClass =
  'w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-3 text-[#111827] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#18181B] transition-colors text-sm'
const labelClass = 'block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2'

export default function ProtoForm({
  defaultPack,
  defaultSector,
  waitlist,
  defaultMessage = '',
}: {
  defaultPack: string
  defaultSector: string
  waitlist: boolean
  defaultMessage?: string
}) {
  const [state, action, pending] = useActionState(submitProtoRequest, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center" role="status">
        <CheckCircle size={48} className="text-green-600" />
        <h2 className="font-heading text-2xl font-bold text-[#111827]">¡Solicitud recibida!</h2>
        <p className="text-[#78716C] max-w-sm">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="waitlist" value={waitlist ? '1' : '0'} />
      {/* Honeypot anti-spam: oculto para personas */}
      <div className="hidden" aria-hidden>
        <label>
          No rellenar
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {!waitlist && (
        <div>
          <label htmlFor="pack" className={labelClass}>
            Pack
          </label>
          <select id="pack" name="pack" defaultValue={defaultPack} className={inputClass}>
            {PACKS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {p.units} objeto{p.units > 1 ? 's' : ''} · {formatEUR(p.price)}
              </option>
            ))}
            <option value="consulta">Aún no lo sé</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="businessName" className={labelClass}>
          Nombre del negocio <span className="text-[#DC2626]">*</span>
        </label>
        <input
          id="businessName"
          name="businessName"
          type="text"
          required
          maxLength={120}
          placeholder="Ej: Gimnasio Élite, Peluquería Ana…"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="sector" className={labelClass}>
          Sector
        </label>
        <select id="sector" name="sector" defaultValue={defaultSector} className={inputClass}>
          <option value="gimnasio">Gimnasio o fitness</option>
          <option value="peluqueria">Peluquería o barbería</option>
          <option value="restaurante">Restaurante o cafetería</option>
          <option value="otro">Otro tipo de negocio</option>
        </select>
      </div>

      <div>
        <label htmlFor="city" className={labelClass}>
          Ciudad <span className="text-[#DC2626]">*</span>
        </label>
        <input id="city" name="city" type="text" required maxLength={80} placeholder="Ej: Albacete, Madrid, Valencia…" className={inputClass} />
      </div>

      <div>
        <label htmlFor="contact" className={labelClass}>
          WhatsApp, teléfono o correo <span className="text-[#DC2626]">*</span>
        </label>
        <input id="contact" name="contact" type="text" required maxLength={80} placeholder="+34 600 000 000" className={inputClass} />
      </div>

      <div>
        <label htmlFor="googleMapsUrl" className={labelClass}>
          Enlace a tu ficha de Google Maps <span className="text-[#A8A29E] font-normal lowercase">(opcional)</span>
        </label>
        <input id="googleMapsUrl" name="googleMapsUrl" type="url" maxLength={500} placeholder="https://maps.google.com/…" className={inputClass} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          ¿Algo que debamos saber? <span className="text-[#A8A29E] font-normal lowercase">(opcional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          maxLength={600}
          defaultValue={defaultMessage}
          placeholder="Cuántos puntos quieres cubrir, si quieres tu logo, dudas…"
          className={inputClass}
        />
      </div>

      {state.status === 'error' && (
        <div role="alert" className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} />
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full flex items-center justify-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-base shadow-md cursor-pointer"
      >
        {pending ? 'Enviando…' : waitlist ? 'Apuntarme a la lista de espera' : 'Enviar solicitud'}
        {!pending && <ArrowRight size={18} />}
      </button>

      <p className="text-xs text-[#78716C] text-center font-medium">
        No se te cobra nada al enviar el formulario. Al enviarlo aceptas nuestra{' '}
        <a href="/legal/privacidad" className="text-[#B45309] hover:underline">
          política de privacidad
        </a>
        .
      </p>
    </form>
  )
}
