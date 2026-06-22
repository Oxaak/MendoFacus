class GestorCuestionario {
    constructor() {
        this.preguntas = [];
        this.indiceActual = 0;
        this.textoProgreso = document.getElementById("texto-progreso");
        this.barraProgreso = document.getElementById("barra-progreso");
        this.tituloPreguntaDom = document.getElementById("titulo-pregunta-dom");
        this.descripcionPreguntaDom = document.getElementById("descripcion-pregunta-dom");
        this.contenedorOpcionesDom = document.getElementById("contenedor-opciones-dom");
    }

    async iniciarTest() {
        sessionStorage.clear();
        this.perfilesContadores = {
            tecnologia_exactas: 0,
            administracion_leyes: 0,
            salud_humanidades: 0,
            arte_diseno: 0
        };
        try {
            const respuesta = await fetch('/api/obtener-preguntas');
            this.preguntas = await respuesta.json();
            this.renderizarPregunta();
        } catch (error) {
            console.error("Error al obtener las preguntas:", error);
        }
    }

    renderizarPregunta() {
        if (!this.preguntas || this.preguntas.length === 0 || this.indiceActual >= this.preguntas.length) {
            return;
        }

        const preguntaObj = this.preguntas[this.indiceActual];

        this.tituloPreguntaDom.textContent = preguntaObj.titulo;
        this.descripcionPreguntaDom.textContent = preguntaObj.descripcion;

        this.textoProgreso.textContent = "Pregunta " + (this.indiceActual + 1) + "/10";
        this.barraProgreso.style.width = ((this.indiceActual + 1) * 10) + '%';

        this.contenedorOpcionesDom.innerHTML = "";

        preguntaObj.opciones.forEach(opcion => {
            const boton = document.createElement("a");
            boton.className = "boton-opcion-test";

            const franja = document.createElement("div");
            franja.className = "opcion-franja-lateral";

            const bloque = document.createElement("div");
            bloque.className = "opcion-bloque-contenido";

            const texto = document.createElement("span");
            texto.className = "opcion-texto";
            texto.textContent = opcion.texto_opcion;

            bloque.appendChild(texto);
            boton.appendChild(franja);
            boton.appendChild(bloque);

            boton.addEventListener("click", () => this.avanzarPregunta(opcion.perfil_asociado));

            this.contenedorOpcionesDom.appendChild(boton);
        });
    }

    avanzarPregunta(perfilSeleccionado) {
        if (perfilSeleccionado && this.perfilesContadores[perfilSeleccionado] !== undefined) {
            this.perfilesContadores[perfilSeleccionado]++;
        }

        if (this.indiceActual < this.preguntas.length - 1) {
            this.indiceActual += 1;
            this.renderizarPregunta();
        } else {
            this.calcularPerfilGanador();
            window.location.href = '../pages/resultadostest.html';
        }
    }

    calcularPerfilGanador() {
        sessionStorage.setItem('resultadosTest', JSON.stringify(this.perfilesContadores));
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const gestor = new GestorCuestionario();
    gestor.iniciarTest();
});
