import { useEffect, useState } from "react";
import { Usuario } from "../types/Usuario";


interface Props {
  onEditar: (usuario: Usuario) => void;
}

export default function ListaUsuarios({ onEditar }: Props) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const cargarUsuarios = () => {
    fetch("http://localhost:8080/api/usuarios")
        .then(res => res.json())
        .then(data => setUsuarios(data));
  };

  const eliminar = async (id?: number) => {
    if (!id) return;
    await fetch(`http://localhost:8080/api/usuarios/${id}`, { method: "DELETE" });
    cargarUsuarios();
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
      <div className="mt-6 max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4 text-center">Usuarios Registrados</h2>
        <ul className="divide-y">
          {usuarios.map(usuario => (
              <li key={usuario.id} className="flex justify-between items-center py-2">
            <span>
              <strong>{usuario.nombre} {usuario.apellido}</strong> - {usuario.edad} años, {usuario.peso}kg, {usuario.altura}cm, Meta: {usuario.meta}
            </span>
                <div className="flex gap-2">
                  <button onClick={() => onEditar(usuario)} className="text-blue-500 hover:text-blue-700">Editar</button>
                  <button onClick={() => eliminar(usuario.id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
}
