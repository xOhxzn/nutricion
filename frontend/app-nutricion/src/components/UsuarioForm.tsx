import { useEffect, useState } from "react";
import { Usuario } from "../types/Usuario";

interface Props {
    onAdd: () => void;
    usuarioInicial?: Usuario;
    onCancelEdit?: () => void;
}

export default function UsuarioForm({ onAdd, usuarioInicial, onCancelEdit }: Props) {
    const [usuario, setUsuario] = useState<Usuario>({
        nombre: "",
        apellido: "",
        edad: 0,
        peso: 0,
        altura: 0,
        meta: "GANAR_MUSCULO"
    });

    useEffect(() => {
        if (usuarioInicial) {
            setUsuario(usuarioInicial);
        } else {
            setUsuario({
                nombre: "",
                apellido: "",
                edad: 0,
                peso: 0,
                altura: 0,
                meta: "GANAR_MUSCULO"
            });
        }
    }, [usuarioInicial]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUsuario(prev => ({
            ...prev,
            [name]: ["edad", "peso", "altura"].includes(name) ? parseFloat(value) || 0 : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = usuario.id
            ? `http://localhost:8080/api/usuarios/${usuario.id}`
            : "http://localhost:8080/api/usuarios";

        const method = usuario.id ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });

        setUsuario({
            nombre: "",
            apellido: "",
            edad: 0,
            peso: 0,
            altura: 0,
            meta: "GANAR_MUSCULO"
        });

        onAdd();
        if (onCancelEdit) onCancelEdit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 bg-white p-6 rounded shadow max-w-md mx-auto mt-8">
            <h2 className="text-xl font-semibold mb-2">
                {usuario.id ? "Editar Usuario" : "Agregar Usuario"}
            </h2>

            <input name="nombre" placeholder="Nombre" value={usuario.nombre} onChange={handleChange} className="w-full border p-2 rounded" required />
            <input name="apellido" placeholder="Apellido" value={usuario.apellido} onChange={handleChange} className="w-full border p-2 rounded" required />
            <input name="edad" type="number" placeholder="Edad" value={usuario.edad} onChange={handleChange} className="w-full border p-2 rounded" required />
            <input name="peso" type="number" placeholder="Peso (kg)" value={usuario.peso} onChange={handleChange} className="w-full border p-2 rounded" required />
            <input name="altura" type="number" placeholder="Altura (cm)" value={usuario.altura} onChange={handleChange} className="w-full border p-2 rounded" required />

            <select name="meta" value={usuario.meta} onChange={handleChange} className="w-full border p-2 rounded">
                <option value="GANAR_MUSCULO">Ganar músculo</option>
                <option value="BAJAR_PESO">Bajar peso</option>
                <option value="GANAR_PESO">Ganar peso</option>
                <option value="MANTENERSE">Mantenerse</option>
            </select>

            <div className="flex gap-3">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {usuario.id ? "Guardar cambios" : "Agregar Usuario"}
                </button>
                {usuario.id && onCancelEdit && (
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

