document.addEventListener('DOMContentLoaded', iniciarResultado);

const tarjetaGanadorDom = document.getElementById('tarjeta-ganador-dom');
const listaOtrasOpcionesDom = document.getElementById('lista-otras-opciones-dom');

const resultadosPorPerfil = {
    tecnologia_exactas: {
        titulo: 'Tecnologia y Ciencias Exactas',
        descripcion: 'Tu perfil se orienta a resolver problemas con logica, datos, sistemas y pensamiento analitico. Podrias disfrutar carreras vinculadas a tecnologia, ingenieria, matematica, programacion o ciencias aplicadas.',
        enlace: 'tecnologia_exactas.html'
    },
    salud_humanidades: {
        titulo: 'Salud y Humanidades',
        descripcion: 'Tu perfil muestra interes por comprender, acompanar y mejorar la vida de las personas. Podrias explorar carreras relacionadas con salud, educacion, psicologia, trabajo social o ciencias humanas.',
        enlace: 'salud_humanidades.html'
    },
    arte_diseno: {
        titulo: 'Arte y Diseño',
        descripcion: 'Tu perfil se vincula con la creatividad, la expresion visual y la construccion de experiencias. Podrias sentir afinidad por diseno, comunicacion, artes, produccion audiovisual o proyectos creativos.',
        enlace: 'arte_diseno.html'
    },
    administracion_leyes: {
        titulo: 'Administracion y Leyes',
        descripcion: 'Tu perfil apunta a organizar, decidir, negociar y entender normas o procesos sociales. Podrias considerar administracion, economia, derecho, gestion, recursos humanos o carreras afines.',
        enlace: 'administracion_leyes.html'
    }
};

function iniciarResultado() {
    const perfilSeleccionado = localStorage.getItem('perfilSeleccionado');

    if (!perfilSeleccionado || !resultadosPorPerfil[perfilSeleccionado]) {
        window.location.href = '../index.html';
        return;
    }

    renderizarResultado(perfilSeleccionado);
}

function renderizarResultado(perfilSeleccionado) {
    const resultado = resultadosPorPerfil[perfilSeleccionado];

    tarjetaGanadorDom.innerHTML = `
        <h2 class="ganador-titulo">${resultado.titulo}</h2>
        <div class="ganador-porcentaje-contenedor">
            <div class="ganador-barra-porcentaje">
                <div class="ganador-barra-avance" style="width: 100%;"></div>
            </div>
            <span class="ganador-porcentaje-texto">Perfil principal seleccionado</span>
        </div>
        <p class="ganador-descripcion">${resultado.descripcion}</p>
        <a href="${resultado.enlace}" class="boton-principal boton-carreras">Ver carreras recomendadas</a>
    `;

    if (listaOtrasOpcionesDom) {
        listaOtrasOpcionesDom.innerHTML = '';
    }
}
