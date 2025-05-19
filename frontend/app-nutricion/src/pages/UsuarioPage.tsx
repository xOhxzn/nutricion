import UsuarioForm from "../components/UsuarioForm";
import ListaUsuarios from "../components/ListaUsuarios";
import { useState } from "react";

export default function UsuarioPage() {
    const [refrescar, setRefrescar] = useState(false);
    const recargar = () => setRefrescar(prev => !prev);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Usuarios</h1>
            <UsuarioForm onAdd={recargar} />
            <ListaUsuarios key={String(refrescar)} />
        </div>
    );
}
