import ComidaForm from "../components/ComidaForm";
import ListaComidas from "../components/ListaComidas";
import { useState } from "react";

export default function ComidaPage() {
    const [refrescar, setRefrescar] = useState(false);
    const recargar = () => setRefrescar(prev => !prev);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Gestión de Comidas</h1>
            <ComidaForm onAdd={recargar} />
            <ListaComidas key={String(refrescar)} />
        </div>
    );
}
