import { useState } from "react";
import { Comida } from "../types/Comida";
import ListaComidas from "../components/ListaComidas";
import ComidaForm from "../components/ComidaForm";

export default function ComidaPage() {
    const [refrescar, setRefrescar] = useState(false);
    const [comidaParaEditar, setComidaParaEditar] = useState<Comida | null>(null);

    const recargar = () => setRefrescar(prev => !prev);
    const cancelarEdicion = () => setComidaParaEditar(null); // <- ESTA es la clave


    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">Gestion de Comidas</h1>

            <ComidaForm
                onAdd={recargar}
                comidaInicial={comidaParaEditar || undefined}
                onCancelEdit={cancelarEdicion}
            />

            <ListaComidas
                key={String(refrescar)}
                onEditar={setComidaParaEditar}
            />
        </div>
    );
}
