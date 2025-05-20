import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Usuario } from "../types/Usuario";

/**
 *Página de seguimiento nutricional para un usuario específico
 *por ahora solo muestra los datos fisicos del usuario y su meta
 */
export default function SeguimientoPage() {
    const { usuarioId } = useParams();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState(true);

    /**
     *Al usar este, se consulta el usuario por id
     */
    useEffect(() => {
        fetch(`http://localhost:8080/api/usuarios/${usuarioId}`)
            .then(res => {
                if (!res.ok) throw new Error("No se encontró el usuario");
                return res.json();
            })
            .then(data => setUsuario(data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, [usuarioId]);

    // Mientras se carga la informacion
    if (loading) return <p className="text-center mt-10">Cargando usuario...</p>;

    if (!usuario) return <p className="text-center mt-10 text-red-600">Usuario no encontrado</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Seguimiento nutricional de {usuario.nombre} {usuario.apellido}
            </h1>
            <p className="text-center">
                Edad: {usuario.edad} años – Peso: {usuario.peso} kg – Altura: {usuario.altura} cm
            </p>
            <p className="text-center">Meta: {usuario.meta}</p>
            {/* Aquí irá el selector de comidas o progreso por día */}
        </div>
    );
}
