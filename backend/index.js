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
  if (err) {
    console.error('Error conectando a la base de datos:', err)
    return
  }
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
  const query = `
    SELECT p.id, s.nombre AS socio, l.titulo AS libro,
           p.fecha_prestamo, p.fecha_devolucion, p.estado
    FROM prestamos p
    JOIN socios s ON p.socio_id = s.id
    JOIN libros l ON p.libro_id = l.id
  `
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message })
    res.json(results)
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})