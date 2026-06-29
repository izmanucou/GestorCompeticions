 'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

type FilaClasificacion = {
  id: string
  puntos: number
  partidas_jugadas: number
  victorias: number
  derrotas: number
  empates: number
  equipo: {
    nombre: string
    localidad: string
  }
}

export default function TablaClasificacion({ categoriaId }: { categoriaId: string }) {
  const [filas, setFilas] = useState<FilaClasificacion[]>([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function cargarClasificacion() {
      const { data, error } = await supabase
        .from('clasificacion')
        .select(`
          id,
          puntos,
          partidas_jugadas,
          victorias,
          derrotas,
          empates,
          equipo (
            nombre,
            localidad
          )
        `)
        .eq('categoria_id', categoriaId)
        .order('puntos', { ascending: false })

      if (!error && data) {
        setFilas(data.map(item => ({
            ...item,
            equipo: Array.isArray(item.equipo) ? item.equipo[0] : item.equipo
        })) as FilaClasificacion[])
        }
      setCargando(false)
    }

    cargarClasificacion()
  }, [categoriaId])

  if (cargando) return <p className="text-gray-500">Carregant classificació...</p>

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
            <th className="px-4 py-3 text-left">Pos</th>
            <th className="px-4 py-3 text-left">Equip</th>
            <th className="px-4 py-3 text-center">PJ</th>
            <th className="px-4 py-3 text-center">V</th>
            <th className="px-4 py-3 text-center">D</th>
            <th className="px-4 py-3 text-center">E</th>
            <th className="px-4 py-3 text-center font-bold text-gray-800">Pts</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila, index) => (
            <tr
              key={fila.id}
              className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                index === 0 ? 'bg-amber-50' : ''
              }`}
            >
              <td className="px-4 py-3 text-gray-400">{index + 1}</td>
              <td className="px-4 py-3">
                <span className="font-medium text-gray-800">{fila.equipo.nombre}</span>
                <span className="ml-2 text-gray-400 text-xs">{fila.equipo.localidad}</span>
              </td>
              <td className="px-4 py-3 text-center text-gray-600">{fila.partidas_jugadas}</td>
              <td className="px-4 py-3 text-center text-green-600">{fila.victorias}</td>
              <td className="px-4 py-3 text-center text-red-500">{fila.derrotas}</td>
              <td className="px-4 py-3 text-center text-gray-400">{fila.empates}</td>
              <td className="px-4 py-3 text-center font-bold text-gray-800">{fila.puntos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}