'use client'

import { useState, useMemo } from 'react'
import { ModeSelector, type CalculationMode } from './ModeSelector'
import { ProportionSelector } from './ProportionSelector'
import { MilkTypeSelector } from './MilkTypeSelector'
import { FilterLevelSelector } from './FilterLevelSelector'
import { Results } from './Results'
import { Timeline } from './Timeline'
import { ProcessInfo } from './ProcessInfo'
import { EducationalInfo } from './EducationalInfo'
import { calculateFromBase, calculateFromDesired, calculateFromCapacity } from '@/lib/calculations'
import type { ProportionKey, MilkTypeKey, FilterLevelKey } from '@/lib/constants'

export function Calculator() {
  const [mode, setMode] = useState<CalculationMode>('fromBase')
  const [grams, setGrams] = useState<string>('')
  const [proportion, setProportion] = useState<ProportionKey>('recommended')
  const [milkType, setMilkType] = useState<MilkTypeKey>('powderOnly')
  const [filterLevel, setFilterLevel] = useState<FilterLevelKey>('medium')
  const [lactoseFree, setLactoseFree] = useState(false)

  const result = useMemo(() => {
    const numGrams = parseFloat(grams)
    if (isNaN(numGrams) || numGrams <= 0) {
      return null
    }

    switch (mode) {
      case 'fromBase':
        return calculateFromBase(numGrams, proportion, milkType, filterLevel)
      case 'fromDesired':
        return calculateFromDesired(numGrams, proportion, milkType, filterLevel)
      case 'fromCapacity':
        return calculateFromCapacity(numGrams, proportion, milkType, filterLevel)
    }
  }, [grams, mode, proportion, milkType, filterLevel])

  const inputConfig = {
    fromBase: {
      label: 'Gramos de yogurt base que tengo',
      placeholder: 'Ej: 200',
    },
    fromDesired: {
      label: 'Gramos de yogurt que quiero obtener despues de filtrar',
      placeholder: 'Ej: 500',
    },
    fromCapacity: {
      label: 'Capacidad de mi recipiente (ml)',
      placeholder: 'Ej: 1000',
    },
  }

  const { label, placeholder } = inputConfig[mode]

  return (
    <div className="space-y-6">
      <ModeSelector mode={mode} onChange={setMode} />

      <div className="space-y-2">
        <label htmlFor="grams" className="block text-sm font-medium text-text-primary">
          {label}
        </label>
        <input
          id="grams"
          type="number"
          min="1"
          value={grams}
          onChange={(e) => setGrams(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl glass-input text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-green focus:ring-offset-2 transition-all"
        />
      </div>

      <ProportionSelector value={proportion} onChange={setProportion} />

      <MilkTypeSelector value={milkType} onChange={setMilkType} />

      <FilterLevelSelector value={filterLevel} onChange={setFilterLevel} />

      <label className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ${
        lactoseFree ? 'glass-button-active' : 'glass-solid hover:bg-white/40'
      }`}>
        <input
          type="checkbox"
          checked={lactoseFree}
          onChange={(e) => setLactoseFree(e.target.checked)}
          className="w-4 h-4 accent-accent-green"
        />
        <span className={lactoseFree ? 'text-white' : 'text-text-primary'}>
          Usar ingredientes deslactosados
        </span>
      </label>

      <Results result={result} milkType={milkType} />

      <Timeline
        milkType={milkType}
        filterLevel={filterLevel}
        lactoseFree={lactoseFree}
      />

      <ProcessInfo lactoseFree={lactoseFree} />

      <EducationalInfo showLactoseFree={lactoseFree} />
    </div>
  )
}
