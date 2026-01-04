'use client'

import { FILTER_LEVELS, type FilterLevelKey } from '@/lib/constants'

interface FilterLevelSelectorProps {
  value: FilterLevelKey
  onChange: (value: FilterLevelKey) => void
}

export function FilterLevelSelector({ value, onChange }: FilterLevelSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Consistencia final
      </label>
      <div className="space-y-2">
        {(Object.keys(FILTER_LEVELS) as FilterLevelKey[]).map((key) => {
          const level = FILTER_LEVELS[key]
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
                name="filterLevel"
                value={key}
                checked={value === key}
                onChange={() => onChange(key)}
                className="mt-1 accent-accent-green"
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${value === key ? 'text-white' : 'text-text-primary'}`}>
                    {level.label}
                  </span>
                  <span className={`text-xs ${value === key ? 'text-white/70' : 'text-text-secondary'}`}>
                    {level.filterTime}
                  </span>
                </div>
                <p className={`text-sm ${value === key ? 'text-white/80' : 'text-text-secondary'}`}>
                  {level.description}
                </p>
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}
