import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsuarioPage from "./pages/UsuarioPage";
import ComidaPage from "./pages/ComidaPage";
import SeguimientoPage from "./pages/SeguimientoPage";


/**
 *Main
 *nav principal y todas las rutas entre las paginas con react-router-dom
 */
export default function App() {
    return (
        <Router>
            <nav className="bg-blue-600 text-white p-4 flex gap-4 justify-center">
                <Link to="/" className="hover:underline">Usuarios</Link>
                <Link to="/comidas" className="hover:underline">Comidas</Link>
            </nav>
            <Routes>
                <Route path="/" element={<UsuarioPage />} />
                <Route path="/comidas" element={<ComidaPage />} />
                <Route path="/seguimiento/:usuarioId" element={<SeguimientoPage />} />
            </Routes>
        </Router>
    );
}
