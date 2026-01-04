'use client'

import { useState } from 'react'
import { PROCESS_INFO } from '@/lib/constants'

interface ProcessInfoProps {
  lactoseFree: boolean
}

export function ProcessInfo({ lactoseFree }: ProcessInfoProps) {
  const [isOpen, setIsOpen] = useState(false)

  const tips = lactoseFree ? PROCESS_INFO.tips.lactoseFree : PROCESS_INFO.tips.regular

  return (
    <div className="rounded-xl glass-solid overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/20 transition-all duration-300"
      >
        <span className="font-medium text-text-primary flex items-center gap-2">
          <span>Temperaturas y Tips</span>
          {lactoseFree && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              Deslactosado
            </span>
          )}
        </span>
        <svg
          className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-6">
          <Section title="Temperaturas">
            {PROCESS_INFO.temperatures.map((item) => (
              <InfoRow
                key={item.label}
                label={item.label}
                value={item.value}
                warning={item.warning}
              />
            ))}
          </Section>

          <Section title="Tips">
            <ul className="space-y-2">
              {tips.map((tip) => (
                <li key={tip} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-emerald-600 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      )}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-text-primary uppercase tracking-wide">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

function InfoRow({
  label,
  value,
  warning,
}: {
  label: string
  value: string
  warning?: boolean
}) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-text-secondary">{label}</span>
      <span className={warning ? 'text-orange-500 font-medium' : 'text-text-primary'}>
        {value}
      </span>
    </div>
  )
}
