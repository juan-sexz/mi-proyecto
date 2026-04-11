import { useState, useEffect } from 'react'

function App() {
  const [socios, setSocios] = useState([])
  const [libros, setLibros] = useState([])
  const [prestamos, setPrestamos] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/socios')
      .then(res => res.json())
      .then(data => setSocios(data))

    fetch('http://localhost:3000/libros')
      .then(res => res.json())
      .then(data => setLibros(data))

    fetch('http://localhost:3000/prestamos')
      .then(res => res.json())
      .then(data => setPrestamos(data))
  }, [])

  // 👇 AGREGA ESTO AQUÍ, antes del return
  const formatFecha = (fecha) => {
    if (!fecha) return '-'
    return new Date(fecha).toLocaleDateString('es-CO')
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Biblioteca</h1>

      <h2>Socios</h2>
      <table border="1" cellPadding="8" style={{ marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {socios.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.nombre}</td>
              <td>{s.email}</td>
              <td>{s.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Libros</h2>
      <table border="1" cellPadding="8" style={{ marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Género</th>
            <th>Disponibles</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.titulo}</td>
              <td>{l.autor}</td>
              <td>{l.genero}</td>
              <td>{l.cantidad_disponible}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Préstamos</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Socio</th>
            <th>Libro</th>
            <th>Fecha préstamo</th>
            <th>Fecha devolución</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {prestamos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.socio}</td>
              <td>{p.libro}</td>
              {/* 👇 ESTAS DOS LÍNEAS SON LAS QUE CAMBIAN */}
              <td>{formatFecha(p.fecha_prestamo)}</td>
              <td>{formatFecha(p.fecha_devolucion)}</td>
              <td>{p.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App