import { useEffect, useState } from "react";
import { Comida } from "../types/Comida";

interface RegistroComida {
    id: number;
    cantidad: number;
    tipo: string;
    comida: Comida;
    calorias: number;
    proteinas: number;
    carbohidratos: number;
    grasas: number;
}

interface Usua {
    usuarioId: number;
    recarga: boolean;
    onEliminar: () => void;
}

/**
 *Lista de comidas comidas registradas por un usuario en el dia hoy
 *permite editar y eliminar elementos
 * @param {number} usuarioId - identificador del usuario cuyas comidas se consultan
 * @param {boolean} recarga - centinela para volver a cargar los datos cuando cambie
 * @param {Function} onEliminar - funcion para cuando se elimine un regsitro
 */
export default function ListaComidasDelDia({ usuarioId, recarga, onEliminar }: Usua) {
    const [registros, setRegistros] = useState<RegistroComida[]>([]);

    /**
     *Carga los registros de comida del dia hoy para el usuario
     */
    const cargar = async () => {
        const hoy = new Date().toLocaleDateString("en-CA"); // formato YYYY-MM-DD
        const res = await fetch(
            `http://localhost:8080/api/registro-comida/${usuarioId}/fecha?fecha=${hoy}`
        );
        const data = await res.json();
        console.log("data --", data);
        setRegistros(data);
    };

    useEffect(() => {
        cargar();
    }, [usuarioId, recarga]);

    /**
     *Elimina un registro de comida por su identificador y manda a cargar otra vez la lista local
     * @param {number} id - identificador del registro a eliminar
     */
    const eliminar = async (id: number) => {
        await fetch(`http://localhost:8080/api/registro-comida/${id}`, {
            method: "DELETE",
        });
        cargar();
        onEliminar();
    };

    return (
        <div className="mt-6 max-w-5xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 text-center">Comidas del día</h2>
            {registros.length === 0 ? (
                <p className="text-center text-gray-500">No se han registrado comidas hoy.</p>
            ) : (
                <ul className="divide-y">
                    {registros.map((r) => (
                        <li key={r.id} className="flex justify-between items-center py-3 gap-4">
                            <div className="flex items-center gap-4">
                                {r.comida.imagenUrl && (
                                    <img src={r.comida.imagenUrl} alt={r.comida.nombre} className="w-32 h-32 object-cover rounded"/>
                                )}
                                <div>
                                    <p className="font-semibold">
                                        {r.comida.nombre}{" "}
                                        {r.comida.tipo === "platillo" && r.comida.tipoPlatillo
                                            ? `(${r.comida.tipoPlatillo.charAt(0).toUpperCase() + r.comida.tipoPlatillo.slice(1)})`
                                            : `(${r.comida.tipo})`}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Calorias: {r.calorias.toFixed(1)} kcal | Proteinas:{" "}
                                        {r.proteinas.toFixed(1)} g | Carbohidratos:{" "}
                                        {r.carbohidratos.toFixed(1)} g | Grasas:{" "}
                                        {r.grasas.toFixed(1)} g
                                    </p>
                                    <p className="text-sm text-gray-500 ">
                                        Cantidad: {r.cantidad} {r.tipo}
                                    </p>
                                    {r.comida.tipo === "platillo" && r.comida.descripcion && (
                                        <p className="text-sm text-gray-600 mt-1">
                                            <strong>Receta:</strong> {r.comida.descripcion}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => eliminar(r.id)} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
                                    Eliminar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
