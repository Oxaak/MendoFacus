/* --- Clase Principal --- */
class Comparador {
    constructor() {
        this.botonFacultades = document.getElementById('botonFacultades');
        this.botonCarreras = document.getElementById('botonCarreras');
        this.tituloCabecera = document.getElementById('tituloCabecera');
        this.vistaFacultades = document.getElementById('vistaFacultades');
        this.vistaCarreras = document.getElementById('vistaCarreras');

        this.asignarEventos();
    }

    /* --- Eventos --- */
    asignarEventos() {
        this.botonFacultades.addEventListener('click', () => this.cambiarVista('facultades'));
        this.botonCarreras.addEventListener('click', () => this.cambiarVista('carreras'));
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

    /* --- Sector de Inyeccion de Datos --- */
    /*
      TODO: Implementar metodos para la consulta a la base de datos
      y la posterior inyeccion de los datos de las facultades
      y carreras seleccionadas en los contenedores del DOM.
    */
}

/* --- Inicializacion --- */
document.addEventListener('DOMContentLoaded', () => {
    new Comparador();
});
