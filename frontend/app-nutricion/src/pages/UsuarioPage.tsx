import UsuarioForm from "../components/UsuarioForm";
import ListaUsuarios from "../components/ListaUsuarios";
import { useState } from "react";
import { Usuario } from "../types/Usuario";

/**
 *Pagina para la gestión de usuarios
 *se usan los componentes de formulario para crear/editar comidas y la lista de usuarios registrados
 */
export default function UsuarioPage() {
    const [refrescar, setRefrescar] = useState(false);
    const [usuarioEditando, setUsuarioEditando] = useState<Usuario | undefined>(undefined);


    const recargar = () => setRefrescar(prev => !prev);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Usuarios</h1>
            <UsuarioForm
                onAdd={recargar}
                usuarioInicial={usuarioEditando}
                onCancelEdit={() => setUsuarioEditando(undefined)}
            />
            <ListaUsuarios
                key={String(refrescar)}
                onEditar={(usuario) => setUsuarioEditando(usuario)}
            />
        </div>
    );
}
