INSERT INTO socios (nombre, email, telefono) VALUES
('Ana García', 'ana@email.com', '3001234567'),
('Carlos López', 'carlos@email.com', '3109876543'),
('María Torres', 'maria@email.com', '3205556677');

INSERT INTO libros (titulo, autor, genero, cantidad_disponible) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 'Novela', 3),
('El principito', 'Antoine de Saint-Exupéry', 'Ficción', 2),
('Clean Code', 'Robert C. Martin', 'Tecnología', 1);

INSERT INTO prestamos (socio_id, libro_id, fecha_devolucion, estado) VALUES
(1, 1, '2025-04-20', 'activo'),
(2, 3, '2025-04-15', 'devuelto'),
(3, 2, '2025-04-25', 'activo');