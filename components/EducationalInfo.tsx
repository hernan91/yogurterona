'use client'

import { useState } from 'react'
import { EDUCATIONAL_INFO } from '@/lib/constants'

interface EducationalInfoProps {
  showLactoseFree: boolean
}

export function EducationalInfo({ showLactoseFree }: EducationalInfoProps) {
  const [isOpen, setIsOpen] = useState(false)

  const sections = [
    EDUCATIONAL_INFO.whyHeat,
    EDUCATIONAL_INFO.whyProbiotics,
    ...(showLactoseFree ? [EDUCATIONAL_INFO.lactoseFreeEffects] : []),
    EDUCATIONAL_INFO.whyFilter,
  ]

  return (
    <div className="rounded-xl glass-solid overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/20 transition-all duration-300"
      >
        <span className="font-medium text-text-primary">
          ¿Por qué cada paso?
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
          {sections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h3 className="text-sm font-semibold text-text-primary">
                {section.title}
              </h3>
              <ul className="space-y-1.5">
                {section.points.map((point) => (
                  <li key={point} className="text-sm text-text-secondary flex items-start gap-2">
                    <span className="text-emerald-600 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {'note' in section && (section as { note: string }).note && (
                <p className="text-xs text-amber-700 bg-amber-50 p-2 rounded-lg mt-2">
                  💡 {(section as { note: string }).note}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
