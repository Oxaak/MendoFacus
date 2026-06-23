document.addEventListener('DOMContentLoaded', () => {
    console.log("cargo");
    const guardado = localStorage.getItem('usuario');
    if (guardado != null) {
        console.log("no anda");
        const usuario = JSON.parse(guardado);
        document.getElementById('texto').textContent = ("bienvenido de vuelta, " + usuario.nombre);
        const btnIniciarSesion = document.getElementById('btnIniciarSesion');
        btnIniciarSesion.remove()
        const btnRegistrarse = document.getElementById('btnRegistrarse');
        btnRegistrarse.textContent = "cerrar sesion";
        btnRegistrarse.removeAttribute("onclick");
        btnRegistrarse.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = '../index.html';
        });
    }
});

