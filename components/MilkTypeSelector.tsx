'use client'

import { MILK_TYPES, type MilkTypeKey } from '@/lib/constants'

interface MilkTypeSelectorProps {
  value: MilkTypeKey
  onChange: (value: MilkTypeKey) => void
}

export function MilkTypeSelector({ value, onChange }: MilkTypeSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Tipo de leche
      </label>
      <div className="space-y-2">
        {(Object.keys(MILK_TYPES) as MilkTypeKey[]).map((key) => {
          const milkType = MILK_TYPES[key]
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
                name="milkType"
                value={key}
                checked={value === key}
                onChange={() => onChange(key)}
                className="mt-1 accent-accent-green"
              />
              <div>
                <span className={`font-medium ${value === key ? 'text-white' : 'text-text-primary'}`}>
                  {milkType.label}
                </span>
                <p className={`text-sm ${value === key ? 'text-white/80' : 'text-text-secondary'}`}>
                  {milkType.description}
                </p>
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}
