class Universidad {
    constructor(nombre, tipoGestion, ubicacion) {
        this.nombre = nombre;
        this.tipoGestion = tipoGestion;
        this.ubicacion = ubicacion;
    }
}

const listaUniversidades = [
    new Universidad("Universidad Nacional de Cuyo", "Pública", "Mendoza"),
    new Universidad("Universidad de Mendoza", "Privada", "Mendoza"),
    new Universidad("Universidad del Aconcagua", "Privada", "Mendoza"),
    new Universidad("Universidad Tecnológica Nacional", "Pública", "Mendoza"),
    new Universidad("Universidad de Buenos Aires", "Pública", "Buenos Aires"),
    new Universidad("Universidad Nacional de Córdoba", "Pública", "Córdoba"),
    new Universidad("Universidad Católica Argentina", "Privada", "Buenos Aires")
];

function renderizarTarjetasUniversidades(universidades) {
    const contenedor = document.getElementById("contenedorUniversidades");

    if (!contenedor) {
        return;
    }

    const universidadesFiltradas = universidades.slice(0, 4);

    universidadesFiltradas.forEach((universidad) => {
        const tarjetaEnlace = document.createElement("a");
        tarjetaEnlace.href = "pages/universidad.html";
        tarjetaEnlace.className = "tarjeta-universidad";

        const tituloElemento = document.createElement("h3");
        tituloElemento.className = "universidad-titulo";
        tituloElemento.textContent = universidad.nombre;

        const gestionElemento = document.createElement("p");
        gestionElemento.className = "universidad-gestion";
        gestionElemento.textContent = `Gestión: ${universidad.tipoGestion}`;

        const ubicacionElemento = document.createElement("p");
        ubicacionElemento.className = "universidad-ubicacion";
        ubicacionElemento.textContent = `Ubicación: ${universidad.ubicacion}`;

        tarjetaEnlace.appendChild(tituloElemento);
        tarjetaEnlace.appendChild(gestionElemento);
        tarjetaEnlace.appendChild(ubicacionElemento);

        contenedor.appendChild(tarjetaEnlace);
    });
}

// Clases de Modelo para la pantalla de comparación
class Facultad {
    constructor(nombre, universidad, duracionAnios, gestion, modalidad, ubicacion) {
        this.nombre = nombre;
        this.universidad = universidad;
        this.duracionAnios = duracionAnios;
        this.gestion = gestion;
        this.modalidad = modalidad;
        this.ubicacion = ubicacion;
    }
}

class Carrera {
    constructor(nombre, universidad, duracion, gestion, costoMensual, tituloEgreso, tituloIntermedio, modalidad, ubicacion) {
        this.nombre = nombre;
        this.universidad = universidad;
        this.duracion = duracion;
        this.gestion = gestion;
        this.costoMensual = costoMensual;
        this.tituloEgreso = tituloEgreso;
        this.tituloIntermedio = tituloIntermedio;
        this.modalidad = modalidad;
        this.ubicacion = ubicacion;
    }
}

// Datos Estáticos (Mock Data) para comparación
const datosComparacion = {
    facultades: {
        columnaIzquierda: new Facultad(
            "Facultad de Ingeniería",
            "UNCuyo",
            "5 años",
            "Pública",
            "Presencial",
            "Ciudad de Mendoza"
        ),
        columnaDerecha: new Facultad(
            "Facultad Regional Mendoza",
            "UTN",
            "5 años",
            "Pública",
            "Presencial",
            "Ciudad de Mendoza"
        )
    },
    carreras: {
        columnaIzquierda: new Carrera(
            "Lic. en Ciencias de la Computación",
            "UNCuyo",
            "5 años",
            "Pública",
            "Gratis",
            "Licenciado en Computación",
            "Analista en Computación",
            "Presencial",
            "Ciudad de Mendoza"
        ),
        columnaDerecha: new Carrera(
            "Ingeniería en Sistemas de Información",
            "UTN",
            "5 años",
            "Pública",
            "Gratis",
            "Ingeniero en Sistemas",
            "Analista Universitario en Sistemas",
            "Presencial",
            "Ciudad de Mendoza"
        )
    }
};

// Alias para cumplir con requerimientos explícitos
const comparisonData = datosComparacion;

// Clase del Gestor de Vista del Comparador
class GestorVistaComparador {
    constructor() {
        this.btnFacultades = null;
        this.btnCarreras = null;
        this.vistaFacultades = null;
        this.vistaCarreras = null;
    }

    inicializar() {
        this.btnFacultades = document.getElementById("btnFacultades");
        this.btnCarreras = document.getElementById("btnCarreras");
        this.vistaFacultades = document.getElementById("vistaFacultades");
        this.vistaCarreras = document.getElementById("vistaCarreras");

        // Si no estamos en la página de comparación, cancelar inicialización
        if (!this.btnFacultades || !this.btnCarreras || !this.vistaFacultades || !this.vistaCarreras) {
            return;
        }

        // Registrar eventos del toggle
        this.btnFacultades.addEventListener("click", () => this.mostrarFacultades());
        this.btnCarreras.addEventListener("click", () => this.mostrarCarreras());

        // Cargar y mostrar datos iniciales
        this.cargarDatos();
    }

    // Alias requerido del método init
    init() {
        this.inicializar();
    }

    mostrarFacultades() {
        this.btnFacultades.classList.add("activo");
        this.btnCarreras.classList.remove("activo");
        this.vistaFacultades.style.display = "block";
        this.vistaCarreras.style.display = "none";
    }

    mostrarCarreras() {
        this.btnCarreras.classList.add("activo");
        this.btnFacultades.classList.remove("activo");
        this.vistaCarreras.style.display = "block";
        this.vistaFacultades.style.display = "none";
    }

    cargarDatos() {
        this.renderizarFacultades();
        this.renderizarCarreras();
    }

    renderizarFacultades() {
        const datos = datosComparacion.facultades;
        const izq = datos.columnaIzquierda;
        const der = datos.columnaDerecha;

        // Actualizar tarjetas superiores
        document.getElementById("facultadNombreA").textContent = izq.nombre;
        document.getElementById("facultadInstA").textContent = izq.universidad;
        document.getElementById("facultadNombreB").textContent = der.nombre;
        document.getElementById("facultadInstB").textContent = der.universidad;

        // Actualizar filas de propiedades
        document.getElementById("facultadDuracionA").textContent = izq.duracionAnios;
        document.getElementById("facultadDuracionB").textContent = der.duracionAnios;
        document.getElementById("facultadGestionA").textContent = izq.gestion;
        document.getElementById("facultadGestionB").textContent = der.gestion;
        document.getElementById("facultadModalidadA").textContent = izq.modalidad;
        document.getElementById("facultadModalidadB").textContent = der.modalidad;
        document.getElementById("facultadUbicacionA").textContent = izq.ubicacion;
        document.getElementById("facultadUbicacionB").textContent = der.ubicacion;
    }

    renderizarCarreras() {
        const datos = datosComparacion.carreras;
        const izq = datos.columnaIzquierda;
        const der = datos.columnaDerecha;

        // Actualizar tarjetas superiores
        document.getElementById("carreraNombreA").textContent = izq.nombre;
        document.getElementById("carreraInstA").textContent = izq.universidad;
        document.getElementById("carreraNombreB").textContent = der.nombre;
        document.getElementById("carreraInstB").textContent = der.universidad;

        // Actualizar filas de propiedades
        document.getElementById("carreraDuracionA").textContent = izq.duracion;
        document.getElementById("carreraDuracionB").textContent = der.duracion;
        document.getElementById("carreraGestionA").textContent = izq.gestion;
        document.getElementById("carreraGestionB").textContent = der.gestion;
        document.getElementById("carreraCostoA").textContent = izq.costoMensual;
        document.getElementById("carreraCostoB").textContent = der.costoMensual;
        document.getElementById("carreraEgresoA").textContent = izq.tituloEgreso;
        document.getElementById("carreraEgresoB").textContent = der.tituloEgreso;
        document.getElementById("carreraIntermedioA").textContent = izq.tituloIntermedio;
        document.getElementById("carreraIntermedioB").textContent = der.tituloIntermedio;
        document.getElementById("carreraModalidadA").textContent = izq.modalidad;
        document.getElementById("carreraModalidadB").textContent = der.modalidad;
        document.getElementById("carreraUbicacionA").textContent = izq.ubicacion;
        document.getElementById("carreraUbicacionB").textContent = der.ubicacion;
    }
}

// Alias para cumplir con requerimientos explícitos
const ComparatorViewManager = GestorVistaComparador;

document.addEventListener("DOMContentLoaded", () => {
    // Inicializar tarjetas en la página de inicio
    renderizarTarjetasUniversidades(listaUniversidades);

    // Inicializar pantalla de comparación
    const gestorComparador = new GestorVistaComparador();
    gestorComparador.inicializar();
});

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();  // Evita recarga de página

    // Crear objeto con los datos del formulario
    const usuario = {
        nombre: document.getElementById('nombre').value,
        contraseña: document.getElementById('contraseña').value,
    };

    try {
        // Enviar datos al servidor con fetch
        const respuesta = await fetch('http://localhost:3307/api/usuarios', {
            method: 'POST',  // Método HTTP
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)  // Convertir a JSON
        });

        if (respuesta.ok) {
            alert('✅ Alumno guardado exitosamente!');
            form.reset();  // Limpiar formulario
            cargarAlumnos();  // Refrescar lista
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Error al guardar el alumno');
    }
});