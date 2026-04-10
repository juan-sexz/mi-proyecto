-- Consulta 1: Ver todos los socios
SELECT * FROM socios;

-- Consulta 2: Ver columnas especificas de libros
SELECT titulo, autor, genero FROM libros;

-- Consulta 3: Prestamos activos
SELECT * FROM prestamos WHERE estado = 'activo';

-- Consulta 4: Libros por genero
SELECT * FROM libros WHERE genero = 'Novela';

-- Consulta 5: Libros ordenados alfabeticamente
SELECT * FROM libros ORDER BY titulo ASC;

-- Consulta 6: Socios mas recientes
SELECT * FROM socios ORDER BY fecha_registro DESC;

-- Consulta 7: JOIN prestamos con socio y libro
SELECT 
    p.id,
    s.nombre AS socio,
    l.titulo AS libro,
    p.fecha_prestamo,
    p.fecha_devolucion,
    p.estado
FROM prestamos p
JOIN socios s ON p.socio_id = s.id
JOIN libros l ON p.libro_id = l.id;

-- Consulta 8: JOIN solo prestamos activos
SELECT 
    s.nombre AS socio,
    l.titulo AS libro,
    p.fecha_devolucion
FROM prestamos p
JOIN socios s ON p.socio_id = s.id
JOIN libros l ON p.libro_id = l.id
WHERE p.estado = 'activo';