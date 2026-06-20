class Facultad {
    constructor(nombre, gestion, ubicacion) {
        this.nombre = nombre;
        this.gestion = gestion;
        this.ubicacion = ubicacion;
    }
}

async function obtenerFacultades() {
    try {
        const respuesta = await fetch('/api/faculties');
        const datos = await respuesta.json();

        const facultades = datos.map(dato => new Facultad(dato.nombre, dato.gestion, dato.ubicacion));
        renderizarTarjetasFacultades(facultades);
    } catch (error) {
        console.error("Error en la conexion con el servidor:", error);
    }
}

function renderizarTarjetasFacultades(facultades) {
    const contenedor = document.getElementById("contenedorUniversidades");

    if (!contenedor) {
        return;
    }

    contenedor.innerHTML = "";
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
        gestionElemento.textContent = `Gestión: ${facultad.gestion}`;

        const ubicacionElemento = document.createElement("p");
        ubicacionElemento.className = "universidad-ubicacion";
        ubicacionElemento.textContent = `Ubicación: ${facultad.ubicacion}`;

        tarjetaEnlace.appendChild(tituloElemento);
        tarjetaEnlace.appendChild(gestionElemento);
        tarjetaEnlace.appendChild(ubicacionElemento);

        contenedor.appendChild(tarjetaEnlace);
    });
}