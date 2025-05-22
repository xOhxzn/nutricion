import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../types/Usuario";

interface Props {
    onEditar: (usuario: Usuario) => void;
}

/**
 *Lista de usuarios registrados
 *permite editar, eliminar o iniciar seguimiento para cada usuario registrado
 *  @param onEditar función para editar al pulsar el boton "Editar", recibe el usuarrio seleccionado
 */
export default function ListaUsuarios({ onEditar }: Props) {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const navigate = useNavigate();

    /**
     *Carga todaos los usuarios desde el backend y actualiza el estado local
     */
    const cargarUsuarios = () => {
        fetch("http://localhost:8080/api/usuarios")
            .then(res => res.json())
            .then(data => setUsuarios(data));
    };

    /**
     *Elimina un usuario del backend por su id y vuelve a llamar a cargar la lista
     * @param id identificador de la comida a eliminar
     */
    const eliminar = async (id?: number) => {
        if (!id) return;
        await fetch(`http://localhost:8080/api/usuarios/${id}`, { method: "DELETE" });
        cargarUsuarios();
    };

    /**
     *Al hacer uso de este, se cargan todos los usuarios por automatico
     */
    useEffect(() => {
        cargarUsuarios();
    }, []);

    return (
        <div className="mt-6 max-w-5xl mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4 text-center">Usuarios Registrados</h2>
            <ul className="divide-y">
                {usuarios.map((usuario) => (
                    <li key={usuario.id} className="flex justify-between items-center py-3 gap-4">
                        <div>
                            <p className="font-semibold">
                                {usuario.nombre} {usuario.apellido} ({usuario.sexo === "MASCULINO" ? "Hombre" : "Mujer"})
                            </p>
                            <p className="text-sm text-gray-700">
                                Edad: {usuario.edad} años | Peso: {usuario.peso} kg | Altura: {usuario.altura} cm | Meta: {usuario.meta}
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => onEditar(usuario)} className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
                                Editar
                            </button>
                            <button onClick={() => eliminar(usuario.id)} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition">
                                Eliminar
                            </button>
                            <button onClick={() => navigate(`/seguimiento/${usuario.id}`)} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition">
                                Comenzar seguimiento
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
