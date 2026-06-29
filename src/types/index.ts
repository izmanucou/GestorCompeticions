export type Rol = 'admin' | 'arbitro' | 'jugador'

export type Competicion = {
  id: string
  nombre: string
  sistema_puntuacion: string
  activa: boolean
  created_at: string
}

export type Categoria = {
  id: string
  competicion_id: string
  nombre: string
  descripcion: string
}

export type Equipo = {
  id: string
  categoria_id: string
  nombre: string
  localidad: string
  activo: boolean
}