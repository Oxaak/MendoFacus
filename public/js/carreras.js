document.addEventListener('DOMContentLoaded', () => {
    const gestor = new GestorCarreras();
    gestor.iniciar();
});

class GestorCarreras {
    constructor() {
        this.contenedor = document.getElementById('contenedor-carreras');
        this.categoria = document.querySelector('main').getAttribute('data-categoria');
    }

    iniciar() {
        if (this.categoria) {
            this.solicitarCarreras();
        }
    }

    async solicitarCarreras() {
        try {
            const respuesta = await fetch(`/api/carreras/${this.categoria}`);
            if (!respuesta.ok) throw new Error('Error en la conexion');

            const lista = await respuesta.json();
            this.renderizar(lista);
            this.asignarEventosComparacion();
        } catch (error) {
            console.error('Fallo al obtener datos:', error);
        }
    }

    renderizar(carreras) {
        this.contenedor.innerHTML = '';

        carreras.forEach(carrera => {
            const html = `
                <div class="tarjeta-carrera">
                    <h3 class="tarjeta-titulo">${carrera.nombre_carrera} (UNCUYO)</h3>
                    <div class="tarjeta-inferior">
                        <span class="etiqueta-gestion">Publica</span>
                        <span class="texto-ubicacion">Ciudad de Mendoza</span>
                        <button class="btn-comparar" data-id="${carrera.id_carrera}">+ Comparar</button>
                    </div>
                </div>
            `;
            this.contenedor.insertAdjacentHTML('beforeend', html);
        });
    }

    asignarEventosComparacion() {
        const botonesComparar = this.contenedor.querySelectorAll('.btn-comparar');

        botonesComparar.forEach(boton => {
            boton.addEventListener('click', () => this.agregarCarreraAComparar(boton));
        });
    }

    agregarCarreraAComparar(boton) {
        const idCarrera = boton.dataset.id;
        const carrerasGuardadas = JSON.parse(localStorage.getItem('carrerasAComparar')) || [];

        if (carrerasGuardadas.includes(idCarrera)) {
            return;
        }

        if (carrerasGuardadas.length === 2) {
            carrerasGuardadas.shift();
        }

        carrerasGuardadas.push(idCarrera);
        localStorage.setItem('carrerasAComparar', JSON.stringify(carrerasGuardadas));

        if (carrerasGuardadas.length === 2) {
            window.location.href = 'comparar.html';
            return;
        }

        boton.textContent = 'Agregada';
    }
}