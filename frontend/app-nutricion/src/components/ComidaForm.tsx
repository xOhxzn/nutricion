import { useState } from "react";
import { Comida } from "../types/Comida";

export default function ComidaForm({ onAdd }: { onAdd: () => void }) {
    const [comida, setComida] = useState<Comida>({
        nombre: "",
        tipo: "ingrediente",
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
        descripcion: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setComida(prev => ({
            ...prev,
            [name]: ["calorias", "proteinas", "carbohidratos", "grasas"].includes(name) ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch("http://localhost:8080/api/comidas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comida),
        });
        setComida({ nombre: "", tipo: "ingrediente", calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0, descripcion: "" });
        onAdd();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 bg-white p-6 rounded shadow max-w-md mx-auto mt-8">
            <div>
                <label className="block font-medium mb-1">Nombre</label>
                <input name="nombre" placeholder="Ej. Manzana" value={comida.nombre} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Tipo</label>
                <select name="tipo" value={comida.tipo} onChange={handleChange} className="w-full border p-2 rounded">
                    <option value="ingrediente">Ingrediente</option>
                    <option value="platillo">Platillo</option>
                </select>
            </div>

            <div>
                <label className="block font-medium mb-1">Calorías</label>
                <input name="calorias" type="number" value={comida.calorias} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium mb-1">Proteínas</label>
                <input name="proteinas" type="number" value={comida.proteinas} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium mb-1">Carbohidratos</label>
                <input name="carbohidratos" type="number" value={comida.carbohidratos} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium mb-1">Grasas</label>
                <input name="grasas" type="number" value={comida.grasas} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium mb-1">Descripción (opcional)</label>
                <textarea name="descripcion" value={comida.descripcion} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>
            

            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Agregar Comida
            </button>
        </form>
    );

}
