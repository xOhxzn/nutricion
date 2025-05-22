
-- Tabla USUARIO
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    apellido TEXT NOT NULL,
    edad INT NOT NULL,
    peso DOUBLE PRECISION NOT NULL,
    altura INT NOT NULL,
    meta TEXT NOT NULL,
    sexo TEXT NOT NULL
);

-- Tabla COMIDA
CREATE TABLE comida (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    calorias DOUBLE PRECISION NOT NULL,
    proteinas DOUBLE PRECISION NOT NULL,
    carbohidratos DOUBLE PRECISION NOT NULL,
    grasas DOUBLE PRECISION NOT NULL,
    tipo TEXT NOT NULL,
    imagen_url TEXT
);

-- Tabla REGISTRO_COMIDA
CREATE TABLE registro_comida (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    calorias DOUBLE PRECISION NOT NULL,
    proteinas DOUBLE PRECISION NOT NULL,
    carbohidratos DOUBLE PRECISION NOT NULL,
    grasas DOUBLE PRECISION NOT NULL,
    cantidad DOUBLE PRECISION NOT NULL,
    tipo TEXT NOT NULL,
    usuario_id INT NOT NULL,
    comida_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (comida_id) REFERENCES comida(id) ON DELETE CASCADE
);
