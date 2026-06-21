const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const poolMySQL = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/faculties', async (req, res) => {
    try {
        const [rows] = await poolMySQL.execute('SELECT nombre, gestion, ubicacion FROM faculties');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al obtener facultades: ' + error.message });
    }
});

app.post('/api/usuarios', async (req, res) => {
    const { nombre, contraseña, email } = req.body;

    try {
        const [result] = await poolMySQL.execute(
            'INSERT INTO usuarios (nombre, contraseña, email) VALUES (?, ?, ?)',
            [nombre, contraseña, email]
        );
        res.json({
            mensaje: 'Usuario guardado en MySQL',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});