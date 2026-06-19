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
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages', 'login.html'));
});

app.post('/api/users', async (req, res) => {
    const { nombre, apellido, email, edad } = req.body;

    try {
        const [result] = await poolMySQL.execute(
            'INSERT INTO users (nombre, apellido, email, edad) VALUES (?, ?, ?, ?)',
            [nombre, apellido, email, edad]
        );
        res.json({
            mensaje: 'Usuario guardado en MySQL',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users', async (req, res) => {
    const [rows] = await poolMySQL.execute('SELECT * FROM users');
    res.json(rows);
});

app.listen(PORT, () => {
    console.log(` Servidor listo en http://localhost:${PORT}`);
});