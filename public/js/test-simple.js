document.addEventListener('DOMContentLoaded', iniciarPreguntaSimple);

const tituloPreguntaDom = document.getElementById('titulo-pregunta-dom');
const descripcionPreguntaDom = document.getElementById('descripcion-pregunta-dom');
const contenedorOpcionesDom = document.getElementById('contenedor-opciones-dom');

async function iniciarPreguntaSimple() {
    try {
        const respuesta = await fetch('/api/obtener-pregunta');

        if (!respuesta.ok) {
            throw new Error('No se pudo obtener la pregunta inicial');
        }

        const pregunta = await respuesta.json();
        renderizarPregunta(pregunta);
    } catch (error) {
        console.error(error);
        window.location.href = '../index.html';
    }
}

function renderizarPregunta(pregunta) {
    tituloPreguntaDom.textContent = pregunta.titulo;
    descripcionPreguntaDom.textContent = pregunta.descripcion;
    contenedorOpcionesDom.innerHTML = '';

    pregunta.opciones.forEach(opcion => {
        const botonOpcion = document.createElement('button');
        botonOpcion.type = 'button';
        botonOpcion.className = 'boton-opcion-test';
        botonOpcion.innerHTML = `
            <span class="opcion-franja-lateral"></span>
            <span class="opcion-bloque-contenido">
                <span class="opcion-texto"></span>
            </span>
        `;

        botonOpcion.querySelector('.opcion-texto').textContent = opcion.texto_opcion;
        botonOpcion.addEventListener('click', () => seleccionarPerfil(opcion.perfil_asociado));
        contenedorOpcionesDom.appendChild(botonOpcion);
    });
}

function seleccionarPerfil(perfil) {
    localStorage.setItem('perfilSeleccionado', perfil);
    window.location.href = 'resultadostest.html';
}
