'use client'

import { useActionState } from 'react'
import { submitProtoRequest, type FormState } from './actions'
import type { Metadata } from 'next'
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

const initialState: FormState = { status: 'idle' }

function ProtoForm() {
  const [state, action, pending] = useActionState(submitProtoRequest, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <CheckCircle size={48} className="text-green-600" />
        <h3 className="font-heading text-2xl font-bold text-[#111827]">¡Solicitud recibida!</h3>
        <p className="text-[#78716C] max-w-sm">{state.message}</p>
        <p className="text-sm text-[#A8A29E] font-medium">Solemos responder el mismo día.</p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
          Nombre del negocio <span className="text-[#DC2626]">*</span>
        </label>
        <input
          name="businessName"
          type="text"
          required
          placeholder="Ej: Gimnasio Élite, Peluquería Ana..."
          className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-3 text-[#111827] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#18181B] transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">Sector</label>
        <select
          name="sector"
          className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-3 text-[#111827] focus:outline-none focus:border-[#18181B] transition-colors text-sm"
        >
          <option value="gimnasio">🏋️ Gimnasio o fitness</option>
          <option value="peluqueria">✂️ Peluquería o barbería</option>
          <option value="restaurante">🍽️ Restaurante o cafetería</option>
          <option value="otro">Otro tipo de negocio</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
          Ciudad <span className="text-[#DC2626]">*</span>
        </label>
        <input
          name="city"
          type="text"
          required
          placeholder="Ej: Madrid, Barcelona, Valencia..."
          className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-3 text-[#111827] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#18181B] transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
          WhatsApp o teléfono <span className="text-[#DC2626]">*</span>
        </label>
        <input
          name="contact"
          type="text"
          required
          placeholder="+34 600 000 000"
          className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-3 text-[#111827] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#18181B] transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
          Enlace a tu ficha de Google Maps{' '}
          <span className="text-[#A8A29E] font-normal lowercase">(opcional)</span>
        </label>
        <input
          name="googleMapsUrl"
          type="url"
          placeholder="https://maps.google.com/..."
          className="w-full bg-[#FBFBF9] border border-[#E7E5E4] rounded-xl px-4 py-3 text-[#111827] placeholder:text-[#A8A29E] focus:outline-none focus:border-[#18181B] transition-colors text-sm"
        />
      </div>

      {state.status === 'error' && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
          <AlertCircle size={16} />
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full flex items-center justify-center gap-2 bg-[#18181B] hover:bg-[#27272A] text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-base shadow-md cursor-pointer"
      >
        {pending ? 'Enviando...' : 'Solicitar prototipo gratis'}
        {!pending && <ArrowRight size={18} />}
      </button>

      <p className="text-xs text-[#78716C] text-center font-medium">
        Sin tarjeta de crédito · Sin compromiso · Respondemos en menos de 24h
      </p>
    </form>
  )
}

export default function ProtoRequestPage() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-4 sm:px-6 bg-[#FBFBF9] text-[#111827]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#F3EFE6] border border-[#E5DFD3] text-[#B45309] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            Demostración Gratuita
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#111827] mb-4 tracking-tight">
            Pide tu prototipo gratis
          </h1>
          <p className="text-[#78716C] text-lg leading-relaxed">
            Te hacemos un objeto personalizado para tu negocio y lo probamos juntos 30 días.{' '}
            <strong className="text-[#111827]">Sin coste, sin compromiso.</strong>
          </p>
        </div>

        <div className="bg-white border border-[#E7E5E4] rounded-3xl p-8 sm:p-10 shadow-sm">
          <ProtoForm />
        </div>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {['30 días gratis', 'Sin tarjeta', 'Sin permanencia'].map((t) => (
            <div key={t} className="bg-[#F3EFE6] border border-[#E5DFD3] rounded-2xl py-4 px-2">
              <p className="text-xs sm:text-sm font-bold text-[#111827]">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
