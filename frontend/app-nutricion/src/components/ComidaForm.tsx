import { useEffect, useState } from "react";
import { Comida } from "../types/Comida";

interface Props {
    onAdd: () => void;
    comidaInicial?: Comida;
    onCancelEdit?: () => void;
}

/**
 *Formulario para registrar o editar comidas
 *tanto para el modo de creacion como de edicion
 * @param onAdd callback que se ejecuta despues de guardar
 * @param comidaInicial comida a editar
 * @param onCancelEdit funcion para cancelar la edicion
 */
export default function ComidaForm({ onAdd, comidaInicial, onCancelEdit }: Props) {
    const [comida, setComida] = useState<Comida>({
        nombre: "",
        tipo: "ingrediente",
        tipoPlatillo: "desayuno",
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
        descripcion: "",
        imagenUrl: ""
    });

    /**
     *Al cargar o cambiar la comida inicial, se llena el formulario con esos datos
     *en dado caso no hay datos, se reinicia este a sus valores por defecto
     */
    useEffect(() => {
        if (comidaInicial) {
            setComida(comidaInicial);
        } else {
            setComida({
                nombre: "",
                tipo: "ingrediente",
                tipoPlatillo: "desayuno",
                calorias: 0,
                proteinas: 0,
                carbohidratos: 0,
                grasas: 0,
                descripcion: "",
                imagenUrl: ""
            });
        }
    }, [comidaInicial]);


    /**
     *Maneja los cambios en los campos del form
     * @param e evento de cambio del input
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setComida(prev => ({
            ...prev,
            [name]: ["calorias", "proteinas", "carbohidratos", "grasas"].includes(name) ? parseFloat(value) || 0 : value
        }));
    };

    /**
     *Conecta los datos del formulario al backend
     *Usa POST si es una nueva comida o PUT si es actualizar
     * @param e evento de envio del form
     */
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
            tipoPlatillo: "desayuno",
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
                <p className="text-sm text-gray-500 mt-1">
                    Se registrará {comida.tipo === "platillo" ? "por pieza(s)" : "en base a 100 gramos"}.
                </p>
            </div>
            {comida.tipo === "platillo" && (
                <div>
                    <label className="block font-medium mb-1">Tipo de Platillo</label>
                    <select name="tipoPlatillo" value={comida.tipoPlatillo} onChange={handleChange} className="w-full border p-2 rounded">
                        <option value="desayuno">Desayuno</option>
                        <option value="almuerzo">Almuerzo</option>
                        <option value="cena">Cena</option>
                        <option value="snack">Snack</option>
                    </select>
                </div>
            )}

            <div>
                <label className="block font-medium mb-1">Calorías (kcal)</label>
                <input name="calorias" type="number" value={comida.calorias} onChange={handleChange} className="w-full border p-2 rounded" required/>
            </div>

            <div>
                <label className="block font-medium mb-1">Proteínas (g)</label>
                <input name="proteinas" type="number" value={comida.proteinas} onChange={handleChange} className="w-full border p-2 rounded" required/>
            </div>

            <div>
                <label className="block font-medium mb-1">Carbohidratos (g)</label>
                <input name="carbohidratos" type="number" value={comida.carbohidratos} onChange={handleChange} className="w-full border p-2 rounded" required/>
            </div>

            <div>
                <label className="block font-medium mb-1">Grasas (g)</label>
                <input name="grasas" type="number" value={comida.grasas} onChange={handleChange} className="w-full border p-2 rounded" required/>
            </div>

            <div>
                <label className="block font-medium mb-1">{comida.tipo === "platillo" ? "Receta" : "Descripción (opcional)"}</label>
                <textarea name="descripcion" value={comida.descripcion} onChange={handleChange} className="w-full border p-2 rounded"/>
            </div>

            <div>
                <label className="block font-medium mb-1">URL de imagen (opcional)</label>
                <input name="imagenUrl" value={comida.imagenUrl} onChange={handleChange} placeholder="https://..." className="w-full border p-2 rounded" required/>
            </div>

            <div className="flex gap-3">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
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
