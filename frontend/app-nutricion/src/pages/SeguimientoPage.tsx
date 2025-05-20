import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Usuario } from "../types/Usuario";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

/**
 *Pagina para la gestión del seguimiento por cada usuario registrado
 *por ahora solo muestra las tablas de proteinas y caloriasa a  consumir pero los calculos ya estan hechos, se uso recharts para las graficas
 *re uiere instalacion npm install recharts
 */
export default function SeguimientoPage() {
    const { usuarioId } = useParams();
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [requerido, setRequerido] = useState({ calorias: 0, proteinas: 0 });
    const [diario, setDiario] = useState({
        calorias: 0,
        proteinas: 0,
        carbohidratos: 0,
        grasas: 0,
    });

    /**
     *Carga los datos del usuario, sus requerimientos y su consumo diario
     *manda query a la API para obtener la informacion actual
     */
    const cargarDatos = async () => {
        if (!usuarioId) return;

        const u = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`).then(res => res.json());
        setUsuario(u);

        const cal = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}/requerimiento`).then(res => res.json());
        const prot = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}/proteina-requerida`).then(res => res.json());

        setRequerido({ calorias: cal, proteinas: prot });

        const hoy = new Date().toISOString().split("T")[0];
        const d = await fetch(`http://localhost:8080/api/registro/${usuarioId}/fecha?fecha=${hoy}`).then(res => res.json());
        if (d.length > 0) {
            setDiario(d[0]);
        } else {
            setDiario({ calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 });
        }
    };

    /**
     *carga automaticametee los datos
     */
    useEffect(() => {
        cargarDatos();
    }, [usuarioId]);

    if (!usuario) return <p className="text-center mt-10">Cargando usuario...</p>;

    const caloriasData = [
        { name: "Requeridas", Calorias: requerido.calorias },
        { name: "Consumidas", CaloriasConsumidas: diario.calorias },
    ];

    const proteinasData = [
        { name: "Requeridas", Proteina: requerido.proteinas },
        { name: "Consumidas", ProteinaConsumida: diario.proteinas },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-4">
                Seguimiento nutricional de {usuario.nombre} {usuario.apellido}
            </h1>

            <p className="text-center mb-6">
                Sexo: {usuario.sexo === "MASCULINO" ? "Hombre" : "Mujer"} –
                Meta: {
                usuario.meta === "GANAR_MUSCULO" ? "Ganar Musculo" :
                    usuario.meta === "BAJAR_PESO" ? "Bajar Peso" :
                        usuario.meta === "GANAR_PESO" ? "Ganar Peso" :
                            "Mantenerse"
            } –
                Edad: {usuario.edad} –
                Peso: {usuario.peso} kg –
                Altura: {usuario.altura} cm
            </p>


            <div className="flex flex-col md:flex-row justify-center items-center gap-x-10 gap-y-8 mb-10">
                <div>
                    <h2 className="text-center font-semibold mb-2">Calorias</h2>
                    <BarChart width={300} height={250} data={caloriasData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Calorias" fill="#6b03fc" />
                    </BarChart>
                </div>

                <div>
                    <h2 className="text-center font-semibold mb-2">Proteinas</h2>
                    <BarChart width={300} height={250} data={proteinasData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Proteina" fill="#6b03fc" />
                    </BarChart>
                </div>
            </div>

            <div className="text-center space-y-1 mb-6">
                <p><strong>Calorias:</strong> {diario.calorias} / {requerido.calorias} kcal</p>
                <p><strong>Proteinas:</strong> {diario.proteinas} / {requerido.proteinas} g</p>
                <p><strong>Carbohidratos:</strong> {diario.carbohidratos} g</p>
                <p><strong>Grasas:</strong> {diario.grasas} g</p>
            </div>
        </div>
    );
}
