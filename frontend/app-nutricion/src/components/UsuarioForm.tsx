import { useEffect, useState } from "react";
import { Usuario } from "../types/Usuario";

interface Props {
    onAdd: () => void;
    usuarioInicial?: Usuario;
    onCancelEdit?: () => void;
}

/**
 *Formulario para registrar o editar un usuario
 *tanto para el modo de creacion como de edicion
 * @param onAdd callback que se ejecuta despues de guardar
 * @param usuarioInicial usuario a editar
 * @param onCancelEdit función para cancelar la edicion
 */
export default function UsuarioForm({ onAdd, usuarioInicial, onCancelEdit }: Props) {
    const [usuario, setUsuario] = useState<Usuario>({
        nombre: "",
        apellido: "",
        edad: 0,
        peso: 0,
        altura: 0,
        meta: "GANAR_MUSCULO",
        sexo: "MASCULINO"
    });

    /**
     *Al cargar o cambiar usuario inicial, se llena el formulario con esos datos
     *en dado caso no hay datos, se reinicia este a sus valores por defecto
     */
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
                meta: "GANAR_MUSCULO",
                sexo: "MASCULINO"
            });
        }
    }, [usuarioInicial]);

    /**
     *Maneja los cambios en los campos del form
     * @param e evento de cambio del input
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUsuario(prev => ({
            ...prev,
            [name]: ["edad", "peso", "altura"].includes(name) ? parseFloat(value) || 0 : value
        }));
    };

    /**
     *Conecta los datos del formulario al backend
     *Usa POST si es una nueva comida o PUT si es actualizar
     * @param e evento de envio del form
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = usuario.id
            ? `http://localhost:8080/api/usuarios/${usuario.id}`
            : "http://localhost:8080/api/usuarios";

        const method = usuario.id ? "PUT" : "POST";
        console.log("Datos -- ", usuario);

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

            <div>
                <label className="block font-medium mb-1">Nombre</label>
                <input name="nombre" value={usuario.nombre} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Apellido</label>
                <input name="apellido" value={usuario.apellido} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Edad</label>
                <input name="edad" type="number" value={usuario.edad} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Peso (kg)</label>
                <input name="peso" type="number" value={usuario.peso} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Altura (cm)</label>
                <input name="altura" type="number" value={usuario.altura} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Meta</label>
                <select name="meta" value={usuario.meta} onChange={handleChange} className="w-full border p-2 rounded">
                    <option value="GANAR_MUSCULO">Ganar musculo</option>
                    <option value="BAJAR_PESO">Bajar peso</option>
                    <option value="GANAR_PESO">Ganar peso</option>
                    <option value="MANTENERSE">Mantenerse</option>
                </select>
            </div>

            <div>
                <label className="block font-medium mb-1">Sexo</label>
                <select name="sexo" value={usuario.sexo} onChange={handleChange} className="w-full border p-2 rounded" required>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMENINO">Femenino</option>
                </select>
            </div>

            <div className="flex gap-3">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    {usuario.id ? "Guardar cambios" : "Agregar Usuario"}
                </button>
                {usuario.id && onCancelEdit && (
                    <button type="button" onClick={onCancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}

