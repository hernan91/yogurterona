'use client'

import { useState, useMemo } from 'react'
import { PROCESS_STEPS, FILTER_LEVELS, MILK_TYPES, type FilterLevelKey, type MilkTypeKey } from '@/lib/constants'

interface TimelineProps {
  milkType: MilkTypeKey
  filterLevel: FilterLevelKey
  lactoseFree: boolean
}

interface TimelineStep {
  id: string
  label: string
  description: string
  startTime: Date
  endTime: Date
  duration: number
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000)
}

export function Timeline({ milkType, filterLevel, lactoseFree }: TimelineProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [startTime, setStartTime] = useState(() => {
    const now = new Date()
    now.setMinutes(Math.ceil(now.getMinutes() / 5) * 5, 0, 0)
    return now
  })

  const steps = useMemo(() => {
    const result: TimelineStep[] = []
    let currentTime = new Date(startTime)
    const needsHeating = MILK_TYPES[milkType].needsHeating

    // Paso 1: Calentar (solo si usa leche líquida)
    if (needsHeating) {
      const duration = PROCESS_STEPS.heating.duration
      result.push({
        id: 'heating',
        label: PROCESS_STEPS.heating.label,
        description: PROCESS_STEPS.heating.description,
        startTime: new Date(currentTime),
        endTime: addMinutes(currentTime, duration),
        duration,
      })
      currentTime = addMinutes(currentTime, duration)

      // Paso 2: Enfriar
      const coolingDuration = PROCESS_STEPS.cooling.duration
      result.push({
        id: 'cooling',
        label: PROCESS_STEPS.cooling.label,
        description: PROCESS_STEPS.cooling.description,
        startTime: new Date(currentTime),
        endTime: addMinutes(currentTime, coolingDuration),
        duration: coolingDuration,
      })
      currentTime = addMinutes(currentTime, coolingDuration)
    }

    // Paso 3: Mezclar
    const mixingDuration = PROCESS_STEPS.mixing.duration
    result.push({
      id: 'mixing',
      label: PROCESS_STEPS.mixing.label,
      description: PROCESS_STEPS.mixing.description,
      startTime: new Date(currentTime),
      endTime: addMinutes(currentTime, mixingDuration),
      duration: mixingDuration,
    })
    currentTime = addMinutes(currentTime, mixingDuration)

    // Paso 4: Fermentación
    const fermentationDuration = lactoseFree
      ? PROCESS_STEPS.fermentation.durationLactoseFree
      : PROCESS_STEPS.fermentation.duration
    result.push({
      id: 'fermentation',
      label: PROCESS_STEPS.fermentation.label,
      description: lactoseFree
        ? 'Mantener a 40-43°C (vigilar desde las 5h)'
        : PROCESS_STEPS.fermentation.description,
      startTime: new Date(currentTime),
      endTime: addMinutes(currentTime, fermentationDuration),
      duration: fermentationDuration,
    })
    currentTime = addMinutes(currentTime, fermentationDuration)

    // Paso 5: Enfriado
    const coolingPostDuration = PROCESS_STEPS.postCooling.duration
    result.push({
      id: 'postCooling',
      label: PROCESS_STEPS.postCooling.label,
      description: PROCESS_STEPS.postCooling.description,
      startTime: new Date(currentTime),
      endTime: addMinutes(currentTime, coolingPostDuration),
      duration: coolingPostDuration,
    })
    currentTime = addMinutes(currentTime, coolingPostDuration)

    // Paso 6: Filtrado
    const filterDuration = FILTER_LEVELS[filterLevel].filterMinutes
    result.push({
      id: 'filtering',
      label: PROCESS_STEPS.filtering.label,
      description: `${FILTER_LEVELS[filterLevel].label} (${FILTER_LEVELS[filterLevel].filterTime})`,
      startTime: new Date(currentTime),
      endTime: addMinutes(currentTime, filterDuration),
      duration: filterDuration,
    })

    return result
  }, [startTime, milkType, filterLevel, lactoseFree])

  const totalMinutes = steps.reduce((acc, step) => acc + step.duration, 0)
  const totalHours = Math.floor(totalMinutes / 60)
  const remainingMinutes = totalMinutes % 60

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number)
    const newTime = new Date()
    newTime.setHours(hours, minutes, 0, 0)
    setStartTime(newTime)
  }

  const handleStartNow = () => {
    const now = new Date()
    now.setMinutes(Math.ceil(now.getMinutes() / 5) * 5, 0, 0)
    setStartTime(now)
  }

  return (
    <div className="rounded-xl glass-solid overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/20 transition-all duration-300"
      >
        <span className="font-medium text-text-primary flex items-center gap-2">
          <span>Cronograma</span>
          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
            {totalHours}h {remainingMinutes > 0 ? `${remainingMinutes}min` : ''} total
          </span>
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
        <div className="px-6 pb-6 space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-text-secondary">Empiezo a las:</label>
            <input
              type="time"
              value={`${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}`}
              onChange={handleTimeChange}
              className="px-3 py-1.5 rounded-lg glass-input text-sm text-text-primary"
            />
            <button
              type="button"
              onClick={handleStartNow}
              className="px-3 py-1.5 text-xs rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
            >
              Ahora
            </button>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-emerald-200 my-1" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-text-primary">{step.label}</p>
                      <p className="text-xs text-text-secondary">{step.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-emerald-700">{formatTime(step.startTime)}</p>
                      <p className="text-xs text-text-secondary">
                        {step.duration >= 60
                          ? `${Math.floor(step.duration / 60)}h ${step.duration % 60 > 0 ? `${step.duration % 60}min` : ''}`
                          : `${step.duration}min`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-white/30">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Yogurt listo:</span>
              <span className="font-mono font-bold text-emerald-700">
                {formatTime(steps[steps.length - 1]?.endTime || startTime)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
