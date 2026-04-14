const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if (err) { console.error('Error:', err); return }
  console.log('Conectado a MySQL correctamente')
})

app.get('/socios', (req, res) => {
  db.query('SELECT * FROM socios', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

app.get('/libros', (req, res) => {
  db.query('SELECT * FROM libros', (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

app.get('/prestamos', (req, res) => {
  const query = `SELECT p.id, s.nombre AS socio, l.titulo AS libro,
    p.fecha_prestamo, p.fecha_devolucion, p.estado
    FROM prestamos p
    JOIN socios s ON p.socio_id = s.id
    JOIN libros l ON p.libro_id = l.id`
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

app.post('/socios', (req, res) => {
  const { nombre, email, telefono } = req.body
  db.query('INSERT INTO socios (nombre, email, telefono) VALUES (?, ?, ?)',
    [nombre, email, telefono], (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ mensaje: 'Socio creado', id: result.insertId })
    })
})

app.post('/libros', (req, res) => {
  const { titulo, autor, genero, cantidad_disponible } = req.body
  db.query('INSERT INTO libros (titulo, autor, genero, cantidad_disponible) VALUES (?, ?, ?, ?)',
    [titulo, autor, genero, cantidad_disponible], (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ mensaje: 'Libro creado', id: result.insertId })
    })
})

app.post('/prestamos', (req, res) => {
  const { socio_id, libro_id, fecha_devolucion } = req.body
  db.query('INSERT INTO prestamos (socio_id, libro_id, fecha_devolucion) VALUES (?, ?, ?)',
    [socio_id, libro_id, fecha_devolucion], (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ mensaje: 'Prestamo creado', id: result.insertId })
    })
})

app.put('/socios/:id', (req, res) => {
  const { nombre, email, telefono } = req.body
  const id = req.params.id
  console.log('PUT socios id:', id, 'datos:', req.body)
  db.query('UPDATE socios SET nombre=?, email=?, telefono=? WHERE id=?',
    [nombre, email, telefono, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      console.log('Filas afectadas:', result.affectedRows)
      res.json({ mensaje: 'Socio actualizado' })
    })
})

app.put('/libros/:id', (req, res) => {
  const { titulo, autor, genero, cantidad_disponible } = req.body
  const id = req.params.id
  db.query('UPDATE libros SET titulo=?, autor=?, genero=?, cantidad_disponible=? WHERE id=?',
    [titulo, autor, genero, cantidad_disponible, id], (err, result) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json({ mensaje: 'Libro actualizado' })
    })
})

const PORT = process.env.PORT || 3000
app.delete('/socios/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM socios WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ mensaje: 'Socio eliminado' })
  })
})

app.delete('/libros/:id', (req, res) => {
  const id = req.params.id
  db.query('DELETE FROM libros WHERE id=?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json({ mensaje: 'Libro eliminado' })
  })
})
app.get('/socios/buscar', (req, res) => {
  const { nombre } = req.query
  db.query('SELECT * FROM socios WHERE nombre LIKE ?',
    [`%${nombre}%`], (err, results) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(results)
    })
})

app.get('/libros/buscar', (req, res) => {
  const { titulo } = req.query
  db.query('SELECT * FROM libros WHERE titulo LIKE ? OR genero LIKE ?',
    [`%${titulo}%`, `%${titulo}%`], (err, results) => {
      if (err) return res.status(500).json({ error: err.message })
      res.json(results)
    })
})
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})