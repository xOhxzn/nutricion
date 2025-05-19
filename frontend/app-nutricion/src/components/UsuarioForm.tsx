import { useState } from "react";
import { Usuario } from "../types/Usuario";

export default function UsuarioForm({ onAdd }: { onAdd: () => void }) {
  const [formData, setFormData] = useState<Usuario>({
    nombre: "",
    apellido: "",
    edad: 0,
    peso: 0,
    altura: 0,
    meta: "GANAR_MUSCULO",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "edad" || name === "peso" || name === "altura" ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("http://localhost:8080/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setFormData({ nombre: "", apellido: "", edad: 0, peso: 0, altura: 0, meta: "GANAR_MUSCULO" });
    onAdd();
  };

    return (
        <form onSubmit={handleSubmit} className="space-y-3 bg-white p-6 rounded shadow max-w-md mx-auto mt-8">
            <div>
                <label className="block font-medium mb-1">Nombre</label>
                <input name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Apellido</label>
                <input name="apellido" placeholder="Apellido" value={formData.apellido} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Edad</label>
                <input name="edad" type="number" placeholder="Edad" value={formData.edad} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Peso (kg)</label>
                <input name="peso" type="number" placeholder="Peso" value={formData.peso} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Altura (cm)</label>
                <input name="altura" type="number" placeholder="Altura" value={formData.altura} onChange={handleChange} className="w-full border p-2 rounded" required />
            </div>

            <div>
                <label className="block font-medium mb-1">Meta</label>
                <select name="meta" value={formData.meta} onChange={handleChange} className="w-full border p-2 rounded">
                    <option value="GANAR_MUSCULO">Ganar músculo</option>
                    <option value="BAJAR_PESO">Bajar peso</option>
                    <option value="GANAR_PESO">Ganar peso</option>
                    <option value="MANTENERSE">Mantenerse</option>
                </select>
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Agregar Usuario
            </button>
        </form>
    );

}
