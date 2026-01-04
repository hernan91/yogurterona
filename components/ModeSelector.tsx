'use client'

export type CalculationMode = 'fromBase' | 'fromDesired' | 'fromCapacity'

interface ModeSelectorProps {
  mode: CalculationMode
  onChange: (mode: CalculationMode) => void
}

const modes: { key: CalculationMode; label: string; shortLabel: string }[] = [
  { key: 'fromBase', label: 'Tengo yogurt base', shortLabel: 'Tengo' },
  { key: 'fromDesired', label: 'Quiero obtener', shortLabel: 'Quiero' },
  { key: 'fromCapacity', label: 'Mi recipiente', shortLabel: 'Recipiente' },
]

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className="flex rounded-xl overflow-hidden glass-solid">
      {modes.map(({ key, label, shortLabel }) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          className={`flex-1 px-2 sm:px-3 py-3 text-xs sm:text-sm font-medium transition-all duration-300 ${
            mode === key
              ? 'glass-button-active'
              : 'text-text-secondary hover:bg-white/30'
          }`}
        >
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{shortLabel}</span>
        </button>
      ))}
    </div>
  )
}
