import { useEffect, useState } from "react";
import { Comida } from "../types/Comida";

export default function ListaComidas({ onEditar }: { onEditar: (c: Comida) => void }) {
    const [comidas, setComidas] = useState<Comida[]>([]);

    const cargar = () => {
        fetch("http://localhost:8080/api/comidas")
            .then(res => res.json())
            .then(data => setComidas(data));
    };

    const eliminar = async (id?: number) => {
        if (!id) return;
        await fetch(`http://localhost:8080/api/comidas/${id}`, { method: "DELETE" });
        cargar();
    };

    useEffect(() => {
        cargar();
    }, []);

    return (
        <div className="mt-6 max-w-5xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 text-center">Comidas Registradas</h2>
            <ul className="divide-y">
                {comidas.map((c) => (
                    <li key={c.id} className="flex justify-between items-center py-2 gap-4">
                        <div className="flex items-center gap-4">
                            {c.imagenUrl && (
                                <img src={c.imagenUrl} alt={c.nombre} className="w-16 h-16 object-cover rounded" />
                            )}
                            <span>
      <strong>{c.nombre}</strong> ({c.tipo}) – {c.calorias} kcal
    </span>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => onEditar(c)} className="text-blue-500 hover:text-blue-700">Editar</button>
                            <button onClick={() => eliminar(c.id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    );
}
