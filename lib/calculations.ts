import { PROPORTIONS, FILTER_LEVELS, type ProportionKey, type MilkTypeKey, type FilterLevelKey } from './constants'

export interface CalculationResult {
  yogurtBase: number
  liquid: number
  milkPowderBase: number
  milkPowderThickener: number
  milkPowderTotal: number
  totalMix: number
  finalYogurt: number
  liquidLabel: string
  filterTime: string
}

function calculateBase(
  totalMix: number,
  starterGrams: number,
  proportionKey: ProportionKey,
  milkType: MilkTypeKey,
  filterLevel: FilterLevelKey
): CalculationResult {
  const proportion = PROPORTIONS[proportionKey]
  const filter = FILTER_LEVELS[filterLevel]
  const liquid = totalMix - starterGrams

  let milkPowderBase = 0
  let milkPowderThickener = 0
  let liquidLabel = 'Leche líquida'

  if (milkType === 'powderOnly') {
    milkPowderBase = liquid * proportion.powderPerLiterLiquid
    milkPowderThickener = totalMix * proportion.powderThickener
    liquidLabel = 'Agua'
  } else {
    milkPowderThickener = totalMix * proportion.powderThickener
  }

  const milkPowderTotal = milkPowderBase + milkPowderThickener
  const finalYogurt = totalMix * filter.yieldFactor

  return {
    yogurtBase: Math.round(starterGrams),
    liquid: Math.round(liquid),
    milkPowderBase: Math.round(milkPowderBase),
    milkPowderThickener: Math.round(milkPowderThickener),
    milkPowderTotal: Math.round(milkPowderTotal),
    totalMix: Math.round(totalMix),
    finalYogurt: Math.round(finalYogurt),
    liquidLabel,
    filterTime: filter.filterTime,
  }
}

export function calculateFromBase(
  baseGrams: number,
  proportionKey: ProportionKey,
  milkType: MilkTypeKey,
  filterLevel: FilterLevelKey
): CalculationResult {
  const proportion = PROPORTIONS[proportionKey]
  const totalMix = baseGrams / proportion.value

  return calculateBase(totalMix, baseGrams, proportionKey, milkType, filterLevel)
}

export function calculateFromDesired(
  desiredGrams: number,
  proportionKey: ProportionKey,
  milkType: MilkTypeKey,
  filterLevel: FilterLevelKey
): CalculationResult {
  const filter = FILTER_LEVELS[filterLevel]
  const proportion = PROPORTIONS[proportionKey]
  const totalMix = desiredGrams / filter.yieldFactor
  const starterGrams = totalMix * proportion.value

  return calculateBase(totalMix, starterGrams, proportionKey, milkType, filterLevel)
}

export function calculateFromCapacity(
  capacityMl: number,
  proportionKey: ProportionKey,
  milkType: MilkTypeKey,
  filterLevel: FilterLevelKey
): CalculationResult {
  const proportion = PROPORTIONS[proportionKey]
  const totalMix = capacityMl
  const starterGrams = totalMix * proportion.value

  return calculateBase(totalMix, starterGrams, proportionKey, milkType, filterLevel)
}
