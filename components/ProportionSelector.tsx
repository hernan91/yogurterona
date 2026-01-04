'use client'

import { PROPORTIONS, type ProportionKey } from '@/lib/constants'

interface ProportionSelectorProps {
  value: ProportionKey
  onChange: (value: ProportionKey) => void
}

export function ProportionSelector({ value, onChange }: ProportionSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Proporcion de yogurt base
      </label>
      <div className="space-y-2">
        {(Object.keys(PROPORTIONS) as ProportionKey[]).map((key) => {
          const proportion = PROPORTIONS[key]
          return (
            <label
              key={key}
              className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                value === key
                  ? 'glass-button-active'
                  : 'glass-solid hover:bg-white/40'
              }`}
            >
              <input
                type="radio"
                name="proportion"
                value={key}
                checked={value === key}
                onChange={() => onChange(key)}
                className="mt-1 accent-accent-green"
              />
              <div>
                <span className={`font-medium ${value === key ? 'text-white' : 'text-text-primary'}`}>
                  {proportion.label} ({Math.round(proportion.value * 100)}%)
                </span>
                <p className={`text-sm ${value === key ? 'text-white/80' : 'text-text-secondary'}`}>
                  {proportion.description}
                </p>
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}
