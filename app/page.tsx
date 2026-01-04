import { Calculator } from '@/components/Calculator'

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-700">
            Calculadora de Yogurt Griego
          </h1>
          <p className="text-gray-500">
            Calcula las proporciones exactas para tu yogurt casero
          </p>
        </header>

        <div className="glass rounded-2xl p-6">
          <Calculator />
        </div>
      </div>
    </main>
  )
}
