'use client'

import type { CalculationResult } from '@/lib/calculations'
import type { MilkTypeKey } from '@/lib/constants'

interface ResultsProps {
  result: CalculationResult | null
  milkType: MilkTypeKey
}

export function Results({ result, milkType }: ResultsProps) {
  if (!result) {
    return (
      <div className="p-6 rounded-xl glass-solid text-center text-text-secondary">
        Ingresa una cantidad para ver los resultados
      </div>
    )
  }

  return (
    <div className="p-6 rounded-xl glass-solid space-y-4">
      <h2 className="text-lg font-semibold text-text-primary">Ingredientes</h2>

      <div className="space-y-3">
        <ResultRow label="Yogurt base" value={`${result.yogurtBase}g`} />
        <ResultRow label={result.liquidLabel} value={`${result.liquid}ml`} />

        {milkType === 'powderOnly' ? (
          <>
            <ResultRow
              label="Leche en polvo (base)"
              value={`${result.milkPowderBase}g`}
              secondary
            />
            <ResultRow
              label="Leche en polvo (espesante)"
              value={`${result.milkPowderThickener}g`}
              secondary
            />
            <ResultRow
              label="Leche en polvo total"
              value={`${result.milkPowderTotal}g`}
              bold
            />
          </>
        ) : (
          <ResultRow
            label="Leche en polvo (espesante)"
            value={`${result.milkPowderThickener}g`}
          />
        )}
      </div>

      <div className="border-t border-white/30 pt-4 space-y-3">
        <ResultRow label="Mezcla total" value={`${result.totalMix}ml`} />
        <ResultRow
          label="Yogurt griego final"
          value={`~${result.finalYogurt}g`}
          highlight
        />
      </div>
    </div>
  )
}

interface ResultRowProps {
  label: string
  value: string
  secondary?: boolean
  bold?: boolean
  highlight?: boolean
}

function ResultRow({ label, value, secondary, bold, highlight }: ResultRowProps) {
  return (
    <div className={`flex justify-between items-center ${secondary ? 'text-sm pl-4' : ''}`}>
      <span className={`${secondary ? 'text-text-secondary' : 'text-text-primary'}`}>
        {label}
      </span>
      <span
        className={`font-mono ${
          highlight
            ? 'text-accent-green font-bold text-lg'
            : bold
              ? 'font-semibold text-text-primary'
              : 'text-text-primary'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
