import { useEffect, useState } from "react";
import { Usuario } from "../types/Usuario";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const cargarUsuarios = () => {
    fetch("http://localhost:8080/api/usuarios")
      .then(res => res.json())
      .then(data => setUsuarios(data));
  };

  const eliminarUsuario = async (id?: number) => {
    if (!id) return;
    await fetch(`http://localhost:8080/api/usuarios/${id}`, { method: "DELETE" });
    cargarUsuarios();
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <div className="mt-6 max-w-3xl mx-auto bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4 text-center">Usuarios Registrados</h2>
      <ul className="space-y-2">
        {usuarios.map(usuario => (
          <li key={usuario.id} className="flex justify-between items-center border-b pb-2">
            <span>{usuario.nombre} {usuario.apellido} - {usuario.meta}</span>
            <button onClick={() => eliminarUsuario(usuario.id)} className="text-red-500 hover:text-red-700">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
