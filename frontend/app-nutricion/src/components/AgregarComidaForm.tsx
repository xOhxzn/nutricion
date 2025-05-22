import { useEffect, useState } from "react";
import { Comida } from "../types/Comida";

interface Usua {
    usuarioId: number;
    onRegistrada: () => void;
}


/**
 *Formulario para registrar una comida para un usuario
 *permite seleccionar una comida existente, ingresar la cantidad y registrarla
 * @param {number} usuarioId - identificador del usuario al que se esta registrando la comida
 * @param {Function} onRegistrada - funcion para despues de guardar
 */
export default function AgregarComidaForm({ usuarioId, onRegistrada }: Usua) {
    const [comidas, setComidas] = useState<Comida[]>([]);
    const [comidaId, setComidaId] = useState<number>();
    const [cantidad, setCantidad] = useState<number>(1);
    const [tipo, setTipo] = useState<"gramos" | "piezas">("gramos");

    /**
     *Carga la lista de comidas desde el backend al usar este
     */
    useEffect(() => {
        fetch("http://localhost:8080/api/comidas")
            .then(res => res.json())
            .then(data => setComidas(data));
    }, []);

    /**
     *Maneja los cambios en los campos del form
     *Si la coomida es ingrediente se registra en gramosa en base 100 y si es platillo en piezas
     */
    const handleSubmit = async () => {
        if (!comidaId || cantidad <= 0) return;

        const comida = comidas.find(c => c.id === comidaId);
        if (!comida) return;

        await fetch("http://localhost:8080/api/registro-comida", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                comida: { id: comidaId },
                usuario: { id: usuarioId },
                cantidad,
                tipo
            })
        });

        setCantidad(1);
        setComidaId(undefined);
        setTipo("gramos");
        onRegistrada();
    };

    return (
        <div className="mt-8 max-w-lg mx-auto bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-3">Registrar comida</h3>

            <select className="w-full border p-2 mb-3 rounded" value={comidaId || ""} onChange={e => {
                    const id = Number(e.target.value);
                    setComidaId(id);
                    const comida = comidas.find(c => c.id === id);
                    setTipo(comida?.tipo === "platillo" ? "piezas" : "gramos");
                }}
            >
                <option value="">Selecciona una comida</option>
                {comidas.map(c => (
                    <option key={c.id} value={c.id}>
                        {c.nombre} ({c.tipo})
                    </option>
                ))}
            </select>

            <input type="number" value={cantidad} min={1} onChange={e => setCantidad(parseFloat(e.target.value))} className="w-full border p-2 mb-1 rounded" placeholder={`Cantidad en ${tipo}`}/>
            <p className="text-sm text-gray-500 mb-3">
                La cantidad se registra en <strong>{tipo}</strong>.
            </p>

            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                Registrar comida
            </button>
        </div>
    );
}