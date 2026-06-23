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
        const [rows] = await poolMySQL.execute(
            'SELECT nombre, gestion, ubicacion FROM facultades'
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al obtener facultades: ' + error.message });
    }
});

app.get('/api/carreras/comparar/:ids', async (req, res) => {
    const idsCarreras = req.params.ids
        .split(',')
        .map(id => Number(id.trim()))
        .filter(id => Number.isInteger(id) && id > 0);

    try {
        const [rows] = await poolMySQL.query(
            'SELECT nombre_carrera, duracion, modalidad, titulo_universitario FROM carreras WHERE id_carrera IN (?)',
            [idsCarreras]
        );

        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al comparar carreras: ' + error.message });
    }
});

app.get('/api/carreras/:perfil', async (req, res) => {
    const perfil = req.params.perfil;
    try {
        const [rows] = await poolMySQL.execute(
            'SELECT id_carrera, nombre_carrera, perfil_asociado FROM carreras WHERE perfil_asociado = ?',
            [perfil]
        );
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Fallo al obtener carreras: ' + error.message });
    }
});


app.get('/api/usuarios', async (req, res) => {
    try {
        const [rows] = await poolMySQL.execute('SELECT nombre, email FROM usuarios');
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

app.get('/api/obtener-pregunta', async (req, res) => {
    try {
        const [preguntas] = await poolMySQL.execute(
            'SELECT id, titulo, descripcion FROM preguntas WHERE id = ? LIMIT 1',
            [1]
        );

        if (preguntas.length === 0) {
            return res.status(404).json({ error: 'Pregunta inicial no encontrada' });
        }

        const pregunta = preguntas[0];
        const [opciones] = await poolMySQL.execute(
            'SELECT texto_opcion, perfil_asociado FROM opciones WHERE pregunta_id = ?',
            [pregunta.id]
        );

        res.json({
            titulo: pregunta.titulo,
            descripcion: pregunta.descripcion,
            opciones: opciones.map(opcion => ({
                texto_opcion: opcion.texto_opcion,
                perfil_asociado: opcion.perfil_asociado
            }))
        });
    } catch (error) {
        res.status(500).json({ error: 'Fallo al obtener pregunta inicial: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor listo en http://localhost:${PORT}`);
});
