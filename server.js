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

app.get('/api/facultades', async (req, res) => {
    try {
        const [rows] = await poolMySQL.execute('SELECT nombre, gestion, ubicacion FROM facultades');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al obtener facultades: ' + error.message });
    }
});

app.get('/api/usuarios', async (req, res) => {
    try {
        const [rows] = await poolMySQL.execute('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al obtener usuarios: ' + error.message });
    }
});


app.post('/api/usuarios', async (req, res) => {
    const { nombre, contraseña, email } = req.body;

    try {
        const [existe] = await poolMySQL.execute('SELECT * FROM usuarios WHERE nombre = ? AND email = ?', [nombre, email]);
        if (existe.length > 0) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }
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

app.post('/api/login', async (req, res) => {
    const { nombre, contraseña } = req.body;

    try {
        const [result] = await poolMySQL.execute(
            'INSERT INTO login (nombre, contraseña) VALUES (?, ?)',
            [nombre, contraseña]
        );
        res.json({
            mensaje: 'Usuario guardado en MySQL',
            id: result.insertId
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario: ' + error.message });
    }
});

// --- Endpoints de Cuestionario ---

app.get('/api/obtener-preguntas', async (req, res) => {
    try {
        const [preguntas] = await poolMySQL.execute('SELECT id, orden, titulo, descripcion FROM preguntas ORDER BY orden');
        const [opciones] = await poolMySQL.execute('SELECT id, pregunta_id, texto_opcion, perfil_asociado FROM opciones');

        const resultado = preguntas.map(pregunta => {
            const opcionesPregunta = opciones
                .filter(opcion => opcion.pregunta_id === pregunta.id)
                .map(opcion => ({
                    id: opcion.id,
                    texto_opcion: opcion.texto_opcion,
                    perfil_asociado: opcion.perfil_asociado
                }));

            return {
                id: pregunta.id,
                orden: pregunta.orden,
                titulo: pregunta.titulo,
                descripcion: pregunta.descripcion,
                opciones: opcionesPregunta
            };
        });

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al obtener preguntas: ' + error.message });
    }
});



app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});