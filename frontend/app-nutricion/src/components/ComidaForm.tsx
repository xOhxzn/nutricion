import { useEffect, useState } from "react";
import { Comida } from "../types/Comida";

interface Props {
    onAdd: () => void;
    comidaInicial?: Comida;
    onCancelEdit?: () => void;
}

export default function ComidaForm({ onAdd, comidaInicial, onCancelEdit }: Props) {
    const [comida, setComida] = useState<Comida>({
        nombre: "",
        tipo: "ingrediente",
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
        descripcion: "",
        imagenUrl: ""
    });

    useEffect(() => {
        if (comidaInicial) {
            setComida(comidaInicial);
        } else {
            setComida({
                nombre: "",
                tipo: "ingrediente",
                calorias: 0,
                proteinas: 0,
                carbohidratos: 0,
                grasas: 0,
                descripcion: "",
                imagenUrl: ""
            });
        }
    }, [comidaInicial]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setComida(prev => ({
            ...prev,
            [name]: ["calorias", "proteinas", "carbohidratos", "grasas"].includes(name) ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = comida.id
            ? `http://localhost:8080/api/comidas/${comida.id}`
            : "http://localhost:8080/api/comidas";

        const method = comida.id ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(comida),
        });

        setComida({
            nombre: "",
            tipo: "ingrediente",
            calorias: 0,
            proteinas: 0,
            carbohidratos: 0,
            grasas: 0,
            descripcion: "",
            imagenUrl: ""
        });

        onAdd();
        if (onCancelEdit) onCancelEdit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 bg-white p-6 rounded shadow max-w-md mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-2">
                {comida.id ? "Editar Comida" : "Agregar Comida"}
            </h2>

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
            <div>
                <label className="block font-medium mb-1">URL de imagen (opcional)</label>
                <input name="imagenUrl" value={comida.imagenUrl} onChange={handleChange} placeholder="https://..." className="w-full border p-2 rounded"/>
            </div>


            <div className="flex gap-3">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    {comida.id ? "Guardar cambios" : "Agregar Comida"}
                </button>
                {comida.id && onCancelEdit && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
