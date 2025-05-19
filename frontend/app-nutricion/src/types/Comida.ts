export type TipoComida = 'ingrediente' | 'platillo';

export interface Comida {
    id?: number;
    nombre: string;
    tipo: string;
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
    descripcion: string;
    imagenUrl: string;
}

