import { useEffect, useState } from "react";
import { Comida } from "../types/Comida";

/**
 *Lista de comidas registradas
 *permite editar y eliminar elementos
 * @param onEditar funcion para editar al pulsar el boton "Editar", recibe la comida seleccionada
 */
export default function ListaComidas({ onEditar }: { onEditar: (c: Comida) => void }) {
    const [comidas, setComidas] = useState<Comida[]>([]);

    /**
     *Carga todas las comidas desde el backend y actualiza el estado local
     */
    const cargar = () => {
        fetch("http://localhost:8080/api/comidas")
            .then(res => res.json())
            .then(data => setComidas(data));
    };

    /**
     *Elimina una comida del backend por su ID y vuelve a llamar a cargar la lista
     * @param id identificador de la comida a eliminar
     */
    const eliminar = async (id?: number) => {
        if (!id) return;
        await fetch(`http://localhost:8080/api/comidas/${id}`, { method: "DELETE" });
        cargar();
    };

    /**
     *Al hacer uso de este, se cargan todas las comidas por automatico
     */
    useEffect(() => {
        cargar();
    }, []);

    return (
        <div className="mt-6 max-w-5xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 text-center">Comidas Registradas</h2>
            <ul className="divide-y">
                {comidas.map((c) => (
                    <li key={c.id} className="flex justify-between items-center py-3 gap-4">
                        <div className="flex items-center gap-4">
                            {c.imagenUrl && (
                                <img
                                    src={c.imagenUrl}
                                    alt={c.nombre}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            )}
                            <div>
                                <p className="font-semibold">{c.nombre} ({c.tipo})</p>
                                <p className="text-sm text-gray-700">
                                    Calorías: {c.calorias} kcal | Proteínas: {c.proteinas} g | Carbohidratos: {c.carbohidratos} g | Grasas: {c.grasas} g
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onEditar(c)}
                                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => eliminar(c.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
                            >
                                Eliminar
                            </button>

                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
