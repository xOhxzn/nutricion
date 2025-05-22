export type TipoComida = 'ingrediente' | 'platillo';
export type TipoPlatillo = 'desayuno' | 'almuerzo' | 'cena';

export interface Comida {
    id?: number;
    nombre: string;
    tipo: TipoComida;
    tipoPlatillo?: TipoPlatillo;
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
    descripcion: string;
    imagenUrl: string;
}
