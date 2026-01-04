# Calculadora de Yogurt Griego Casero

## Descripción del Proyecto

Aplicación web simple para calcular las proporciones exactas de ingredientes para hacer yogurt griego casero. Permite al usuario configurar diferentes variables y obtener las cantidades precisas.

## Stack Tecnológico

- **Framework**: Next.js 14+ (App Router)
- **Estilos**: Tailwind CSS
- **Despliegue**: Vercel
- **Base de datos**: Ninguna (todo client-side)

## Funcionalidades

### Calculadora Principal

El usuario puede elegir entre dos modos de cálculo:

1. **"Tengo X gramos de yogurt"** → Calcula cuánto yogurt griego obtendrá
2. **"Quiero obtener X gramos"** → Calcula cuántos gramos de yogurt starter necesita

### Opciones Configurables

#### Proporción de Yogurt Starter
- **Baja** (15%): Fermentación más lenta, sabor más suave
- **Recomendada** (20%): Balance ideal, ~200g por litro de mezcla
- **Densa** (27%): Fermentación rápida, sabor más ácido

#### Tipo de Leche
- **Leche líquida + leche en polvo**: Usar leche líquida como base y agregar polvo para espesar
- **Solo leche en polvo**: Reconstituir toda la leche desde polvo (más económico, más control)

#### Opciones Adicionales
- **Deslactosada**: Checkbox para indicar si usa ingredientes deslactosados (solo informativo, no cambia cálculos)

### Información del Proceso

Mostrar una sección informativa con:

#### Tiempos
- Reposo en heladera pre-fermentación: 3 horas (diferido)
- Fermentación: 7-8 horas a 40-43°C
- Enfriado post-fermentación: 3 horas en heladera
- Filtrado: 2-4 horas (según consistencia deseada)

#### Temperaturas
- Fermentación ideal: 40-43°C
- No superar: 45°C (mata los cultivos)
- Almacenamiento: 4°C

## Proporciones Base (por litro de mezcla final)

```
PROPORCIÓN BAJA (15%):
- Yogurt starter: 150g
- Agua/leche: 850ml
- Leche en polvo (reconstitución): 100g por litro de líquido
- Leche en polvo (espesante): 45g por litro de mezcla

PROPORCIÓN RECOMENDADA (20%):
- Yogurt starter: 200g
- Agua/leche: 800ml  
- Leche en polvo (reconstitución): 107g por litro de líquido
- Leche en polvo (espesante): 50g por litro de mezcla

PROPORCIÓN DENSA (27%):
- Yogurt starter: 270g
- Agua/leche: 730ml
- Leche en polvo (reconstitución): 100g por litro de líquido
- Leche en polvo (espesante): 45g por litro de mezcla
```

## Fórmulas de Cálculo

### Modo "Solo leche en polvo"
```
mezcla_total = yogurt_starter / proporcion_elegida
agua = mezcla_total - yogurt_starter
leche_polvo_base = agua * 0.107  (107g por litro de agua)
leche_polvo_espesante = mezcla_total * 0.050  (50g por litro)
leche_polvo_total = leche_polvo_base + leche_polvo_espesante
```

### Modo "Leche líquida + polvo"
```
mezcla_total = yogurt_starter / proporcion_elegida
leche_liquida = mezcla_total - yogurt_starter
leche_polvo_espesante = mezcla_total * 0.050  (solo para espesar)
```

### Rendimiento Final (post-filtrado)
```
yogurt_griego_final = mezcla_total * 0.55  (se pierde ~45% como suero)
```

## Diseño UI/UX

### Estética
- Diseño limpio y moderno
- Colores cálidos/cremosos que evoquen lácteos (blancos, cremas, toques de verde suave)
- Tipografía legible
- Iconos simples para las opciones
- Mobile-first

### Layout
```
┌─────────────────────────────────────┐
│           🥛 TÍTULO                 │
├─────────────────────────────────────┤
│  [Modo de cálculo - Toggle/Tabs]    │
│                                     │
│  Input: gramos ___________          │
│                                     │
│  ┌─ Proporción ─────────────────┐   │
│  │ ○ Baja  ● Recomendada  ○ Densa│  │
│  └──────────────────────────────┘   │
│                                     │
│  ┌─ Tipo de leche ──────────────┐   │
│  │ ○ Líquida + polvo            │   │
│  │ ● Solo polvo                 │   │
│  └──────────────────────────────┘   │
│                                     │
│  ☐ Usar deslactosada               │
│                                     │
│  [    CALCULAR    ]                 │
├─────────────────────────────────────┤
│         RESULTADOS                  │
│  ┌──────────────────────────────┐   │
│  │ Yogurt starter:    280g      │   │
│  │ Agua:              1120ml    │   │
│  │ Leche en polvo:    190g      │   │
│  │ ─────────────────────────    │   │
│  │ Mezcla total:      1400ml    │   │
│  │ Yogurt final:      ~770g     │   │
│  └──────────────────────────────┘   │
├─────────────────────────────────────┤
│      📋 PROCESO (colapsable)        │
│  • Tiempos                          │
│  • Temperaturas                     │
│  • Tips                             │
└─────────────────────────────────────┘
```

## Estructura de Archivos

```
/app
  /page.tsx              # Página principal con la calculadora
  /layout.tsx            # Layout con metadata
  /globals.css           # Estilos globales + Tailwind
/components
  /Calculator.tsx        # Componente principal de la calculadora
  /ModeSelector.tsx      # Selector de modo de cálculo
  /ProportionSelector.tsx # Selector de proporción
  /MilkTypeSelector.tsx  # Selector tipo de leche
  /Results.tsx           # Muestra los resultados
  /ProcessInfo.tsx       # Información del proceso (colapsable)
/lib
  /calculations.ts       # Funciones de cálculo puras
  /constants.ts          # Constantes (proporciones, tiempos, etc.)
```

## Notas de Implementación

- Todos los cálculos deben ser reactivos (recalcular en tiempo real al cambiar inputs)
- Validar que los inputs sean números positivos
- Redondear resultados a enteros para practicidad
- El componente ProcessInfo debe estar colapsado por defecto en mobile
- Usar `useState` para manejar el estado del formulario
- No es necesario persistir nada

## Colores Sugeridos

```css
--cream: #FFF8E7
--yogurt-white: #FEFEFA  
--accent-green: #7CB342
--text-primary: #424242
--text-secondary: #757575
--border: #E0E0E0
```

## Metadata SEO

```
title: "Calculadora de Yogurt Griego Casero"
description: "Calcula las proporciones exactas de ingredientes para hacer yogurt griego casero. Configura tipo de leche, densidad y obtén cantidades precisas."
```