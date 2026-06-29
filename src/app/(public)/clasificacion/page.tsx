import TablaClasificacion from '@/components/clasificacion/TablaClasificacion'

export default function PaginaClasificacion() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Classificació</h1>
      <p className="text-gray-500 mb-6">Lliga de Raspall 2026</p>

      <h2 className="text-lg font-semibold text-gray-700 mb-3">Masculí</h2>
      <TablaClasificacion categoriaId="22222222-2222-2222-2222-222222222222" />
    </main>
  )
}