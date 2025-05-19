export type TipoComida = 'ingrediente' | 'platillo';

export interface Comida {
    id?: number;
    nombre: string;
    tipo: TipoComida;
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
    descripcion?: string;
}
