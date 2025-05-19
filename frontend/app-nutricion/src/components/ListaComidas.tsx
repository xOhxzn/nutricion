import { useEffect, useState } from "react";
import { Comida } from "../types/Comida";

export default function ListaComidas() {
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
        <div className="mt-6 max-w-4xl mx-auto bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Comidas Registradas</h2>
            <ul className="divide-y">
                {comidas.map((c) => (
                    <li key={c.id} className="flex justify-between items-center py-2">
                        <span>{c.nombre} ({c.tipo}) - {c.calorias} kcal</span>
                        <button onClick={() => eliminar(c.id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
