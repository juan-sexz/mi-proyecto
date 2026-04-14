import { useState, useEffect } from 'react'

function App() {
  const [socios, setSocios] = useState([])
  const [libros, setLibros] = useState([])
  const [prestamos, setPrestamos] = useState([])
  const [nuevoSocio, setNuevoSocio] = useState({ nombre: '', email: '', telefono: '' })
  const [nuevoLibro, setNuevoLibro] = useState({ titulo: '', autor: '', genero: '', cantidad_disponible: 1 })
  const [editandoSocio, setEditandoSocio] = useState(null)
  const [editandoLibro, setEditandoLibro] = useState(null)
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

  const mostrarMensaje = (msg) => {
    setMensaje(msg)
    setTimeout(() => setMensaje(''), 3000)
  }

  const agregarSocio = () => {
    fetch('http://localhost:3000/socios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoSocio)
    }).then(() => {
      mostrarMensaje('Socio agregado correctamente')
      setNuevoSocio({ nombre: '', email: '', telefono: '' })
      cargarDatos()
    })
  }

  const agregarLibro = () => {
    fetch('http://localhost:3000/libros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoLibro)
    }).then(() => {
      mostrarMensaje('Libro agregado correctamente')
      setNuevoLibro({ titulo: '', autor: '', genero: '', cantidad_disponible: 1 })
      cargarDatos()
    })
  }

  const actualizarSocio = () => {
    fetch(`http://localhost:3000/socios/${editandoSocio.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editandoSocio)
    }).then(() => {
      mostrarMensaje('Socio actualizado correctamente')
      setEditandoSocio(null)
      cargarDatos()
    })
  }

  const actualizarLibro = () => {
    fetch(`http://localhost:3000/libros/${editandoLibro.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editandoLibro)
    }).then(() => {
      mostrarMensaje('Libro actualizado correctamente')
      setEditandoLibro(null)
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

      {editandoSocio && (
        <div style={{ background: '#f0f0f0', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
          <h3>Editando socio</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={editandoSocio.nombre}
              onChange={e => setEditandoSocio({ ...editandoSocio, nombre: e.target.value })} />
            <input value={editandoSocio.email}
              onChange={e => setEditandoSocio({ ...editandoSocio, email: e.target.value })} />
            <input value={editandoSocio.telefono}
              onChange={e => setEditandoSocio({ ...editandoSocio, telefono: e.target.value })} />
            <button onClick={actualizarSocio}>Guardar</button>
            <button onClick={() => setEditandoSocio(null)}>Cancelar</button>
          </div>
        </div>
      )}

      <h2>Socios</h2>
      <table border="1" cellPadding="8" style={{ marginBottom: '2rem' }}>
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Teléfono</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {socios.map(s => (
            <tr key={s.id}>
              <td>{s.id}</td><td>{s.nombre}</td><td>{s.email}</td><td>{s.telefono}</td>
              <td>
                <button onClick={() => setEditandoSocio({ ...s, id: Number(s.id) })}>Editar</button>
              </td>
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
        <input type="number" value={nuevoLibro.cantidad_disponible}
          onChange={e => setNuevoLibro({ ...nuevoLibro, cantidad_disponible: e.target.value })} />
        <button onClick={agregarLibro}>Agregar</button>
      </div>

      {editandoLibro && (
        <div style={{ background: '#f0f0f0', padding: '1rem', marginBottom: '1rem', borderRadius: '8px' }}>
          <h3>Editando libro</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input value={editandoLibro.titulo}
              onChange={e => setEditandoLibro({ ...editandoLibro, titulo: e.target.value })} />
            <input value={editandoLibro.autor}
              onChange={e => setEditandoLibro({ ...editandoLibro, autor: e.target.value })} />
            <input value={editandoLibro.genero}
              onChange={e => setEditandoLibro({ ...editandoLibro, genero: e.target.value })} />
            <input type="number" value={editandoLibro.cantidad_disponible}
              onChange={e => setEditandoLibro({ ...editandoLibro, cantidad_disponible: e.target.value })} />
            <button onClick={actualizarLibro}>Guardar</button>
            <button onClick={() => setEditandoLibro(null)}>Cancelar</button>
          </div>
        </div>
      )}

      <h2>Libros</h2>
      <table border="1" cellPadding="8" style={{ marginBottom: '2rem' }}>
        <thead>
          <tr><th>ID</th><th>Título</th><th>Autor</th><th>Género</th><th>Disponibles</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {libros.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td><td>{l.titulo}</td><td>{l.autor}</td>
              <td>{l.genero}</td><td>{l.cantidad_disponible}</td>
              <td>
                <button onClick={() => setEditandoLibro({ ...l, id: Number(l.id) })}>Editar</button>
              </td>
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