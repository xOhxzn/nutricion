import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Usuario } from "../types/Usuario";
import { RegistroComida } from "../types/RegistroComida";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import AgregarComidaForm from "../components/AgregarComidaForm";
import ListaComidasDelDia from "../components/ListaComidasDelDia";


/**
 *Pagina para la gestión del seguimiento por cada usuario registrado
 *Ya muestralas graficas funcionales ahora al ingresar una comida aqui se refleja
 *Datos del usuario
 *Formulario y Lista de RegistroComidas Agregados
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
    const [recarga, setRecarga] = useState(false);

    /**
     *Activa la recarga de datos, usado despuyes de registrar o elimnar una commida para que no tenga que refrescar pagina
     */
    const recargar = () => setRecarga(prev => !prev);

    /**
     *Carga los datos del usuario, sus requerimientos y su consumo diario
     *manda query a la API para obtener la informacion actual y hace la suma de estpos
     */
    const cargarDatos = async () => {
        if (!usuarioId) return;

        const u = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}`).then(res => res.json());
        setUsuario(u);
        //Requerimmientps
        const cal = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}/requerimiento`).then(res => res.json());
        const prot = await fetch(`http://localhost:8080/api/usuarios/${usuarioId}/proteina-requerida`).then(res => res.json());
        setRequerido({ calorias: cal, proteinas: prot });

        //Registros dia hoy
        const hoy = new Date().toLocaleDateString('en-CA'); // <- formato YYYY-MM-DD
        const registrossComida: RegistroComida[] = await fetch(`http://localhost:8080/api/registro-comida/${usuarioId}/fecha?fecha=${hoy}`).then(res => res.json());
        console.log("Registros sin manejar ---", registrossComida);

        //suma acum del dia
        if (registrossComida.length > 0) {
            const totalesDelDia = registrossComida.reduce(
                (acum, comida) => ({
                    calorias: acum.calorias + comida.calorias,
                    proteinas: acum.proteinas + comida.proteinas,
                    carbohidratos: acum.carbohidratos + comida.carbohidratos,
                    grasas: acum.grasas + comida.grasas
                }),
                { calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 }
            );
            setDiario(totalesDelDia);
        } else {
            setDiario({ calorias: 0, proteinas: 0, carbohidratos: 0, grasas: 0 });
        }
        console.log("Registros --", registrossComida);

    };

    /**
     *carga automaticametee los datos
     */
    useEffect(() => {
        cargarDatos();
    }, [usuarioId, recarga]);

    if (!usuario) return <p className="text-center mt-10">Cargando usuario...</p>;

    const caloriasData = [
        { name: "Requerido", Calorías: requerido.calorias },
        { name: "Consumido", Calorías: diario.calorias },
    ];

    const proteinasData = [
        { name: "Requerido", Proteínas: requerido.proteinas },
        { name: "Consumido", Proteínas: diario.proteinas },
    ];

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-center mb-2">
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
                        <Bar dataKey="Calorías" fill="#6b03fc" />
                    </BarChart>
                </div>

                <div>
                    <h2 className="text-center font-semibold mb-2">Proteinas</h2>
                    <BarChart width={300} height={250} data={proteinasData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Proteínas" fill="#6b03fc" />
                    </BarChart>
                </div>
            </div>

            <div className="text-center space-y-1 mb-6">
                <p><strong>Calorías:</strong> {diario.calorias} / {requerido.calorias} kcal</p>
                <p><strong>Proteínas:</strong> {diario.proteinas} / {requerido.proteinas} g</p>
                <p><strong>Carbohidratos:</strong> {diario.carbohidratos} g</p>
                <p><strong>Grasas:</strong> {diario.grasas} g</p>
            </div>

            <AgregarComidaForm usuarioId={parseInt(usuarioId!)} onRegistrada={recargar} />
            <ListaComidasDelDia usuarioId={parseInt(usuarioId!)} recarga={recarga} onEliminar={recargar} />

        </div>
    );
}
