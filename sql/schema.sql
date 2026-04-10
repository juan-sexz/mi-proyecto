CREATE TABLE socios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20),
    fecha_registro DATE DEFAULT (CURRENT_DATE)
);

CREATE TABLE libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    autor VARCHAR(100),
    genero VARCHAR(50),
    cantidad_disponible INT DEFAULT 1
);

CREATE TABLE prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    socio_id INT,
    libro_id INT,
    fecha_prestamo DATE DEFAULT (CURRENT_DATE),
    fecha_devolucion DATE,
    estado VARCHAR(20) DEFAULT 'activo',
    FOREIGN KEY (socio_id) REFERENCES socios(id),
    FOREIGN KEY (libro_id) REFERENCES libros(id)
);