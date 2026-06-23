const DICCIONARIO_PERFILES = {
    tecnologia_exactas: {
        nombre: "Tecnologia y Ciencias Exactas",
        descripcion: "Basado en tu pensamiento logico y habilidad para resolver problemas complejos mediante la tecnologia, el analisis de datos y la precision matematica."
    },
    administracion_leyes: {
        nombre: "Administracion, Leyes y Negocios",
        descripcion: "Refleja tu capacidad de liderazgo, organizacion estrategica y resolucion de conflictos dentro de marcos normativos e institucionales."
    },
    salud_humanidades: {
        nombre: "Salud y Humanidades",
        descripcion: "Destaca tu vocacion de servicio, empatia y profundo interes por el bienestar humano, el desarrollo social y el cuidado integral de las personas."
    },
    arte_diseno: {
        nombre: "Arte, Diseno y Comunicacion",
        descripcion: "Resalta tu perfil creativo, tu sensibilidad estetica y tu habilidad para comunicar ideas de forma innovadora a traves de distintos medios visuales y narrativos."
    }
};

class GestorResultados {
    constructor() {
        const datosRaw = sessionStorage.getItem("resultadosTest");
        this.resultadosTest = null;
        if (datosRaw) {
            try {
                this.resultadosTest = JSON.parse(datosRaw);
            } catch (error) {
                console.error("Error al parsear resultadosTest:", error);
            }
        }
        this.tarjetaGanadorDom = document.getElementById("tarjeta-ganador-dom");
        this.listaOtrasOpcionesDom = document.getElementById("lista-otras-opciones-dom");
    }

    inicializar() {
        if (!this.resultadosTest) {
            window.location.href = "test.html";
            return;
        }

        const perfilesCalculados = this.procesarResultados();
        this.renderizarResultados(perfilesCalculados);
    }

    procesarResultados() {
        const listadoPerfiles = Object.entries(this.resultadosTest).map(([clave, puntos]) => {
            const porcentaje = (puntos / 10) * 100;
            return {
                clave: clave,
                puntos: puntos,
                porcentaje: porcentaje
            };
        });

        listadoPerfiles.sort((a, b) => b.porcentaje - a.porcentaje);

        return listadoPerfiles;
    }

    renderizarResultados(perfiles) {
        if (perfiles.length === 0) {
            return;
        }

        const ganador = perfiles[0];
        const datosGanador = DICCIONARIO_PERFILES[ganador.clave];

        if (this.tarjetaGanadorDom && datosGanador) {
            this.tarjetaGanadorDom.innerHTML = "";

            const titulo = document.createElement("h2");
            titulo.className = "ganador-titulo";
            titulo.textContent = datosGanador.nombre;

            const contenedorPorcentaje = document.createElement("div");
            contenedorPorcentaje.className = "ganador-porcentaje-contenedor";

            const barraPorcentaje = document.createElement("div");
            barraPorcentaje.className = "ganador-barra-porcentaje";

            const barraAvance = document.createElement("div");
            barraAvance.className = "ganador-barra-avance";
            barraAvance.style.width = `${ganador.porcentaje}%`;

            const textoPorcentaje = document.createElement("span");
            textoPorcentaje.className = "ganador-porcentaje-texto";
            textoPorcentaje.textContent = `${ganador.porcentaje}% de afinidad`;

            barraPorcentaje.appendChild(barraAvance);
            contenedorPorcentaje.appendChild(barraPorcentaje);
            contenedorPorcentaje.appendChild(textoPorcentaje);

            const descripcion = document.createElement("p");
            descripcion.className = "ganador-descripcion";
            descripcion.textContent = datosGanador.descripcion;

            const botonCarreras = document.createElement("a");
            botonCarreras.className = "boton-principal boton-carreras";
            botonCarreras.href = `${ganador.clave}.html`;
            botonCarreras.textContent = "Ver carreras";

            this.tarjetaGanadorDom.appendChild(titulo);
            this.tarjetaGanadorDom.appendChild(contenedorPorcentaje);
            this.tarjetaGanadorDom.appendChild(descripcion);
            this.tarjetaGanadorDom.appendChild(botonCarreras);
        }

        if (this.listaOtrasOpcionesDom) {
            this.listaOtrasOpcionesDom.innerHTML = "";

            const otrasOpciones = perfiles.slice(1, 4);
            otrasOpciones.forEach(perfil => {
                const datosPerfil = DICCIONARIO_PERFILES[perfil.clave];
                if (!datosPerfil) return;

                const elementoLista = document.createElement("div");
                elementoLista.className = "tarjeta-secundaria";

                const informacion = document.createElement("div");
                informacion.className = "tarjeta-secundaria-informacion";

                const titulo = document.createElement("h3");
                titulo.className = "tarjeta-secundaria-titulo";
                titulo.textContent = datosPerfil.nombre;

                const textoPorcentaje = document.createElement("span");
                textoPorcentaje.className = "tarjeta-secundaria-porcentaje";
                textoPorcentaje.textContent = `${perfil.porcentaje}%`;

                const barraPorcentaje = document.createElement("div");
                barraPorcentaje.className = "tarjeta-secundaria-barra";

                const barraAvance = document.createElement("div");
                barraAvance.className = "tarjeta-secundaria-avance";
                barraAvance.style.width = `${perfil.porcentaje}%`;

                barraPorcentaje.appendChild(barraAvance);
                informacion.appendChild(titulo);
                informacion.appendChild(textoPorcentaje);

                elementoLista.appendChild(informacion);
                elementoLista.appendChild(barraPorcentaje);

                this.listaOtrasOpcionesDom.appendChild(elementoLista);
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const gestor = new GestorResultados();
    gestor.inicializar();
});
