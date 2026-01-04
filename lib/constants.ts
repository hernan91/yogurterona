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
    needsHeating: true,
  },
  powderOnly: {
    label: 'Solo leche en polvo',
    description: 'Reconstituir toda la leche desde polvo',
    needsHeating: false,
  },
} as const

export type MilkTypeKey = keyof typeof MILK_TYPES

export const FILTER_LEVELS = {
  light: {
    label: 'Cremoso suave',
    yieldFactor: 0.70,
    description: 'Textura más líquida, similar al yogurt natural',
    filterTime: '1-2 horas',
    filterMinutes: 90,
  },
  medium: {
    label: 'Griego clásico',
    yieldFactor: 0.55,
    description: 'Consistencia típica del yogurt griego',
    filterTime: '2-4 horas',
    filterMinutes: 180,
  },
  firm: {
    label: 'Extra firme',
    yieldFactor: 0.40,
    description: 'Muy denso, casi como queso crema',
    filterTime: '6-12 horas',
    filterMinutes: 540,
  },
} as const

export type FilterLevelKey = keyof typeof FILTER_LEVELS

// Pasos del proceso con duración en minutos
export const PROCESS_STEPS = {
  heating: {
    id: 'heating',
    label: 'Calentar leche a 80-85°C',
    duration: 15,
    description: 'Mantener 10-15 min revolviendo',
    onlyForLiquidMilk: true,
  },
  cooling: {
    id: 'cooling',
    label: 'Enfriar a 40-45°C',
    duration: 30,
    description: 'Puede acelerar con baño de agua fría',
    onlyForLiquidMilk: true,
  },
  mixing: {
    id: 'mixing',
    label: 'Mezclar ingredientes',
    duration: 10,
    description: 'Agregar yogurt base y mezclar bien',
  },
  fermentation: {
    id: 'fermentation',
    label: 'Fermentación',
    duration: 450, // 7.5 horas promedio
    durationLactoseFree: 360, // 6 horas promedio
    description: 'Mantener a 40-43°C sin mover',
  },
  postCooling: {
    id: 'postCooling',
    label: 'Enfriado en heladera',
    duration: 180, // 3 horas
    description: 'Detiene la fermentación',
  },
  filtering: {
    id: 'filtering',
    label: 'Filtrado',
    duration: 180, // Se ajusta según FILTER_LEVELS
    description: 'Colar con tela o filtro',
  },
} as const

export const PROCESS_INFO = {
  temperatures: [
    { label: 'Calentamiento de leche', value: '80-85°C por 10-15 min' },
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

export const EDUCATIONAL_INFO = {
  whyHeat: {
    title: '¿Por qué calentar la leche a 80-85°C?',
    points: [
      'Desnaturaliza las proteínas del suero → yogurt más espeso y firme',
      'Mata bacterias competidoras → solo quedan vivas las del fermento',
      'Mejora la textura → las proteínas retienen mejor el agua (menos suero separado)',
      'Concentra los sólidos por evaporación',
    ],
    note: 'Con leche en polvo este paso es opcional, ya que el polvo fue procesado térmicamente durante su fabricación.',
  },
  whyProbiotics: {
    title: '¿Por qué usar yogurt con probióticos?',
    points: [
      'Los probióticos son bacterias vivas beneficiosas (Lactobacillus, Bifidobacterium)',
      'Mejoran la digestión y la salud intestinal',
      'Fortalecen el sistema inmunológico',
      'El yogurt base debe tener "cultivos vivos activos" en la etiqueta',
      'Más cepas = más diversidad de beneficios',
    ],
  },
  lactoseFreeEffects: {
    title: 'Efectos de usar leche deslactosada',
    points: [
      'La lactasa ya dividió la lactosa en glucosa + galactosa',
      'Las bacterias fermentan estos azúcares simples más rápido',
      'La fermentación puede completarse 1-2 horas antes',
      'El sabor final es ligeramente más dulce',
      'Apto para intolerantes a la lactosa',
      'El proceso de filtrado es igual al regular',
    ],
  },
  whyFilter: {
    title: '¿Por qué filtrar el yogurt?',
    points: [
      'Elimina el suero (líquido acuoso) concentrando las proteínas',
      'Más filtrado = más denso y cremoso',
      'El yogurt griego tiene ~2x más proteína que el regular',
      'El suero contiene nutrientes y se puede usar en otras recetas',
    ],
  },
}
