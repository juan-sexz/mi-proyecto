import { useState, useEffect } from 'react'

function App() {
  const [socios, setSocios] = useState([])
  const [libros, setLibros] = useState([])
  const [prestamos, setPrestamos] = useState([])
  const [nuevoSocio, setNuevoSocio] = useState({ nombre: '', email: '', telefono: '' })
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', autor: '', genero: '', cantidad_disponible: 1 })
  const [mensaje, setMensaje] = useState('')

  const cargarDatos = () => {
    fetch('http://localhost:3000/socios').then(r => r.json()).then(setSocios)
    fetch('http://localhost:3000/libros').then(r => r.json()).then(setLibros)
    fetch('http://localhost:3000/prestamos').then(r => r.json()).then(setPrestamos)
  }

  useEffect(() => { cargarDatos() }, [])

  const formatFecha = (fecha) => {
    if (!fecha) return '-'
    return new Date(fecha).toLocaleDateString('es-CO')
  }

  const agregarSocio = () => {
    fetch('http://localhost:3000/socios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoSocio)
    })
      .then(r => r.json())
      .then(() => {
        setMensaje('Socio agregado correctamente')
        setNuevoSocio({ nombre: '', email: '', telefono: '' })
        cargarDatos()
      })
  }

  const agregarLibro = () => {
    fetch('http://localhost:3000/libros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoLibro)
    })
      .then(r => r.json())
      .then(() => {
        setMensaje('Libro agregado correctamente')
        setNuevoLibro({ titulo: '', autor: '', genero: '', cantidad_disponible: 1 })
        cargarDatos()
      })
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Biblioteca</h1>

      {mensaje && <p style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</p>}

      <h2>Agregar socio</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        <input placeholder="Nombre" value={nuevoSocio.nombre}
          onChange={e => setNuevoSocio({ ...nuevoSocio, nombre: e.target.value })} />
        <input placeholder="Email" value={nuevoSocio.email}
          onChange={e => setNuevoSocio({ ...nuevoSocio, email: e.target.value })} />
        <input placeholder="Teléfono" value={nuevoSocio.telefono}
          onChange={e => setNuevoSocio({ ...nuevoSocio, telefono: e.target.value })} />
        <button onClick={agregarSocio}>Agregar</button>
      </div>

      <h2>Socios</h2>
      <table border="1" cellPadding="8" style={{ marginBottom: '2rem' }}>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th></tr>
        </thead>
        <tbody>
          {socios.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td><td>{s.nombre}</td><td>{s.email}</td><td>{s.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Agregar libro</h2>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
        <input placeholder="Título" value={nuevoLibro.titulo}
          onChange={e => setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })} />
        <input placeholder="Autor" value={nuevoLibro.autor}
          onChange={e => setNuevoLibro({ ...nuevoLibro, autor: e.target.value })} />
        <input placeholder="Género" value={nuevoLibro.genero}
          onChange={e => setNuevoLibro({ ...nuevoLibro, genero: e.target.value })} />
        <input type="number" placeholder="Cantidad" value={nuevoLibro.cantidad_disponible}
          onChange={e => setNuevoLibro({ ...nuevoLibro, cantidad_disponible: e.target.value })} />
        <button onClick={agregarLibro}>Agregar</button>
      </div>

      <h2>Libros</h2>
      <table border="1" cellPadding="8" style={{ marginBottom: '2rem' }}>
        <thead>
          <tr><th>ID</th><th>Título</th><th>Autor</th><th>Género</th><th>Disponibles</th></tr>
        </thead>
        <tbody>
          {libros.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td><td>{l.titulo}</td><td>{l.autor}</td>
              <td>{l.genero}</td><td>{l.cantidad_disponible}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Préstamos</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr><th>ID</th><th>Socio</th><th>Libro</th><th>Fecha préstamo</th><th>Fecha devolución</th><th>Estado</th></tr>
        </thead>
        <tbody>
          {prestamos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.socio}</td><td>{p.libro}</td>
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