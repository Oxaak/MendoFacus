/* --- Clase Principal --- */
class Comparador {
    constructor() {
        this.botonFacultades = document.getElementById('botonFacultades');
        this.botonCarreras = document.getElementById('botonCarreras');
        this.tituloCabecera = document.getElementById('tituloCabecera');
        this.vistaFacultades = document.getElementById('vistaFacultades');
        this.vistaCarreras = document.getElementById('vistaCarreras');
        this.claveLocalStorage = 'carrerasAComparar';

        this.asignarEventos();
        this.iniciarComparacionCarreras();
    }

    /* --- Eventos --- */
    asignarEventos() {
        this.botonFacultades.addEventListener('click', () => this.cambiarVista('facultades'));
        this.botonCarreras.addEventListener('click', () => this.cambiarVista('carreras'));
        window.addEventListener('beforeunload', () => this.limpiarCarrerasAComparar());
    }

    /* --- Acciones --- */
    cambiarVista(vista) {
        if (vista === 'facultades') {
            this.botonFacultades.classList.add('activo');
            this.botonCarreras.classList.remove('activo');
            this.tituloCabecera.textContent = 'Comparar Facultades';
            this.vistaFacultades.classList.remove('oculto');
            this.vistaCarreras.classList.add('oculto');
        } else if (vista === 'carreras') {
            this.botonCarreras.classList.add('activo');
            this.botonFacultades.classList.remove('activo');
            this.tituloCabecera.textContent = 'Comparar Carreras';
            this.vistaCarreras.classList.remove('oculto');
            this.vistaFacultades.classList.add('oculto');
        }
    }

    async iniciarComparacionCarreras() {
        const idsCarreras = this.obtenerIdsCarreras();

        if (idsCarreras.length < 2) {
            this.limpiarCarrerasAComparar();
            this.renderizarMensaje('Selecciona dos carreras para compararlas.');
            this.cambiarVista('carreras');
            return;
        }

        try {
            const respuesta = await fetch(`/api/carreras/comparar/${idsCarreras.join(',')}`);

            if (!respuesta.ok) {
                throw new Error('No se pudo obtener la comparacion');
            }

            const carreras = await respuesta.json();

            if (carreras.length < 2) {
                this.limpiarCarrerasAComparar();
                this.renderizarMensaje('No se encontraron datos suficientes para comparar.');
                this.cambiarVista('carreras');
                return;
            }

            this.renderizarComparacion(carreras);
            this.cambiarVista('carreras');
        } catch (error) {
            console.error('Fallo al comparar carreras:', error);
            this.renderizarMensaje('Ocurrio un error al cargar la comparacion.');
            this.cambiarVista('carreras');
        }
    }

    obtenerIdsCarreras() {
        try {
            const idsGuardados = JSON.parse(localStorage.getItem(this.claveLocalStorage)) || [];
            return idsGuardados
                .map(id => String(id).trim())
                .filter(id => id !== '');
        } catch (error) {
            this.limpiarCarrerasAComparar();
            return [];
        }
    }

    limpiarCarrerasAComparar() {
        localStorage.removeItem(this.claveLocalStorage);
    }

    renderizarMensaje(mensaje) {
        this.vistaCarreras.innerHTML = `
            <div class="bloque-criterio">
                <p class="celda-comparacion">${mensaje}</p>
            </div>
        `;
    }

    renderizarComparacion(carreras) {
        const criterios = [
            { etiqueta: 'Carrera', campo: 'nombre_carrera' },
            { etiqueta: 'Duracion', campo: 'duracion' },
            { etiqueta: 'Modalidad', campo: 'modalidad' },
            { etiqueta: 'Titulo universitario', campo: 'titulo_universitario' }
        ];

        this.vistaCarreras.innerHTML = criterios.map(criterio => `
            <section class="bloque-criterio">
                <h2 class="titulo-criterio">${criterio.etiqueta}</h2>
                <div class="fila-comparacion">
                    ${carreras.map(carrera => `
                        <div class="celda-comparacion">${carrera[criterio.campo] || 'Sin datos'}</div>
                    `).join('')}
                </div>
            </section>
        `).join('');
    }
}

/* --- Inicializacion --- */
document.addEventListener('DOMContentLoaded', () => {
    new Comparador();
});
