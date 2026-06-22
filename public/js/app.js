class Facultad {
    constructor(nombre, gestion, ubicacion) {
        this.nombre = nombre;
        this.gestion = gestion;
        this.ubicacion = ubicacion;
    }
}

class GestorUniversidades {
    constructor() {
        this.contenedor = document.getElementById("contenedorUniversidades");
    }

    async inicializar() {
        try {
            const respuesta = await fetch('/api/facultades');
            const datos = await respuesta.json();

            const facultades = datos.map(dato => new Facultad(dato.nombre, dato.gestion, dato.ubicacion));
            this.renderizarTarjetas(facultades);
        } catch (error) {
            console.error("Error en la conexion con el servidor:", error);
        }
    }

    renderizarTarjetas(facultades) {
        if (!this.contenedor) {
            return;
        }

        this.contenedor.innerHTML = "";
        const facultadesFiltradas = facultades.slice(0, 4);

        facultadesFiltradas.forEach((facultad) => {
            const tarjetaEnlace = document.createElement("a");
            tarjetaEnlace.href = "pages/universidad.html";
            tarjetaEnlace.className = "tarjeta-universidad";

            const tituloElemento = document.createElement("h3");
            tituloElemento.className = "universidad-titulo";
            tituloElemento.textContent = facultad.nombre;

            const gestionElemento = document.createElement("p");
            gestionElemento.className = "universidad-gestion";
            gestionElemento.textContent = `Gestion: ${facultad.gestion}`;

            const ubicacionElemento = document.createElement("p");
            ubicacionElemento.className = "universidad-ubicacion";
            ubicacionElemento.textContent = `Ubicacion: ${facultad.ubicacion}`;

            tarjetaEnlace.appendChild(tituloElemento);
            tarjetaEnlace.appendChild(gestionElemento);
            tarjetaEnlace.appendChild(ubicacionElemento);

            this.contenedor.appendChild(tarjetaEnlace);
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const gestor = new GestorUniversidades();
    gestor.inicializar();
});