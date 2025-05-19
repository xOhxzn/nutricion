export type Meta = 'GANAR_MUSCULO' | 'BAJAR_PESO' | 'GANAR_PESO' | 'MANTENERSE';

export interface Usuario {
  id?: number;
  nombre: string;
  apellido: string;
  edad: number;
  peso: number;
  altura: number;
  meta: Meta;
}
