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
        <CheckCircle size={48} className="text-[#22C55E]" />
        <h3 className="font-heading text-2xl font-bold text-[#FAFAFA]">¡Solicitud recibida!</h3>
        <p className="text-[#888] max-w-sm">{state.message}</p>
        <p className="text-sm text-[#555]">Solemos responder el mismo día.</p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[#FAFAFA] mb-2">
          Nombre del negocio <span className="text-[#EF4444]">*</span>
        </label>
        <input
          name="businessName"
          type="text"
          required
          placeholder="Ej: Gimnasio Élite, Peluquería Ana..."
          className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-[#FAFAFA] placeholder:text-[#555] focus:outline-none focus:border-[#F5A623] transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#FAFAFA] mb-2">Sector</label>
        <select
          name="sector"
          className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-[#FAFAFA] focus:outline-none focus:border-[#F5A623] transition-colors text-sm"
        >
          <option value="gimnasio">🏋️ Gimnasio o fitness</option>
          <option value="peluqueria">✂️ Peluquería o barbería</option>
          <option value="restaurante">🍽️ Restaurante o cafetería</option>
          <option value="otro">Otro tipo de negocio</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#FAFAFA] mb-2">
          Ciudad <span className="text-[#EF4444]">*</span>
        </label>
        <input
          name="city"
          type="text"
          required
          placeholder="Ej: Madrid, Barcelona, Valencia..."
          className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-[#FAFAFA] placeholder:text-[#555] focus:outline-none focus:border-[#F5A623] transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#FAFAFA] mb-2">
          WhatsApp o teléfono <span className="text-[#EF4444]">*</span>
        </label>
        <input
          name="contact"
          type="text"
          required
          placeholder="+34 600 000 000"
          className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-[#FAFAFA] placeholder:text-[#555] focus:outline-none focus:border-[#F5A623] transition-colors text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#FAFAFA] mb-2">
          Enlace a tu ficha de Google Maps{' '}
          <span className="text-[#555] font-normal">(opcional)</span>
        </label>
        <input
          name="googleMapsUrl"
          type="url"
          placeholder="https://maps.google.com/..."
          className="w-full bg-[#111] border border-[#222] rounded-xl px-4 py-3 text-[#FAFAFA] placeholder:text-[#555] focus:outline-none focus:border-[#F5A623] transition-colors text-sm"
        />
      </div>

      {state.status === 'error' && (
        <div className="flex items-center gap-2 bg-[#EF4444]/10 border border-[#EF4444]/20 rounded-xl px-4 py-3 text-sm text-[#EF4444]">
          <AlertCircle size={16} />
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full flex items-center justify-center gap-2 bg-[#F5A623] text-black font-bold py-4 rounded-xl hover:bg-[#C47D0E] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-base"
      >
        {pending ? 'Enviando...' : 'Solicitar prototipo gratis'}
        {!pending && <ArrowRight size={18} />}
      </button>

      <p className="text-xs text-[#555] text-center">
        Sin tarjeta de crédito · Sin compromiso · Respondemos en menos de 24h
      </p>
    </form>
  )
}

export default function ProtoRequestPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-4">
            Pide tu prototipo gratis
          </h1>
          <p className="text-[#888] text-lg leading-relaxed">
            Te hacemos un objeto personalizado para tu negocio y lo probamos juntos 30 días.{' '}
            <strong className="text-[#FAFAFA]">Sin coste, sin compromiso.</strong>
          </p>
        </div>

        <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
          <ProtoForm />
        </div>

        {/* Trust signals */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {['30 días gratis', 'Sin tarjeta', 'Sin permanencia'].map((t) => (
            <div key={t} className="bg-[#111] border border-[#222] rounded-xl py-4 px-2">
              <p className="text-sm text-[#888]">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
