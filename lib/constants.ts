export const PROPORTIONS = {
  low: {
    label: 'Baja',
    value: 0.15,
    description: 'Fermentación más lenta, sabor más suave',
    powderPerLiterLiquid: 0.100,
    powderThickener: 0.045,
  },
  recommended: {
    label: 'Recomendada',
    value: 0.20,
    description: 'Balance ideal, ~200g por litro de mezcla',
    powderPerLiterLiquid: 0.107,
    powderThickener: 0.050,
  },
  dense: {
    label: 'Densa',
    value: 0.27,
    description: 'Fermentación rápida, sabor más ácido',
    powderPerLiterLiquid: 0.100,
    powderThickener: 0.045,
  },
} as const

export type ProportionKey = keyof typeof PROPORTIONS

export const MILK_TYPES = {
  liquidAndPowder: {
    label: 'Leche líquida + polvo',
    description: 'Usar leche líquida como base y agregar polvo para espesar',
  },
  powderOnly: {
    label: 'Solo leche en polvo',
    description: 'Reconstituir toda la leche desde polvo (más económico, más control)',
  },
} as const

export type MilkTypeKey = keyof typeof MILK_TYPES

export const FILTER_LEVELS = {
  light: {
    label: 'Cremoso suave',
    yieldFactor: 0.70,
    description: 'Textura más líquida, similar al yogurt natural',
    filterTime: '1-2 horas',
  },
  medium: {
    label: 'Griego clásico',
    yieldFactor: 0.55,
    description: 'Consistencia típica del yogurt griego',
    filterTime: '2-4 horas',
  },
  firm: {
    label: 'Extra firme',
    yieldFactor: 0.40,
    description: 'Muy denso, casi como queso crema',
    filterTime: '6-12 horas',
  },
} as const

export type FilterLevelKey = keyof typeof FILTER_LEVELS

export const PROCESS_INFO = {
  times: {
    regular: [
      { label: 'Reposo en heladera pre-fermentación', value: '3 horas (diferido)' },
      { label: 'Fermentación', value: '7-8 horas a 40-43°C' },
      { label: 'Enfriado post-fermentación', value: '3 horas en heladera' },
    ],
    lactoseFree: [
      { label: 'Reposo en heladera pre-fermentación', value: '3 horas (diferido)' },
      { label: 'Fermentación', value: '5-7 horas a 40-43°C', note: 'Puede ser más rápida' },
      { label: 'Enfriado post-fermentación', value: '3 horas en heladera' },
    ],
  },
  temperatures: [
    { label: 'Fermentación ideal', value: '40-43°C' },
    { label: 'No superar', value: '45°C (mata los cultivos)', warning: true },
    { label: 'Almacenamiento', value: '4°C' },
  ],
  tips: {
    regular: [
      'Usá yogurt natural sin azúcar como base',
      'Verificá que el yogurt base tenga cultivos vivos activos',
      'Mantené todos los utensilios muy limpios',
      'No muevas el recipiente durante la fermentación',
      'El suero se puede usar para otras recetas',
    ],
    lactoseFree: [
      'Usá yogurt deslactosado como base',
      'La fermentación puede completarse antes - vigilá desde las 5 horas',
      'La lactasa ya hidrolizó los azúcares, las bacterias fermentan más rápido',
      'Mantené todos los utensilios muy limpios',
      'El suero deslactosado también sirve para otras recetas',
    ],
  },
}
