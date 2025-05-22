import { Comida } from "./Comida";
import { Usuario } from "./Usuario";

export interface RegistroComida {
    id: number;
    fecha: string;
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
    cantidad: number;
    tipo: string;
    comida: Comida;
    usuario: Usuario;
}
