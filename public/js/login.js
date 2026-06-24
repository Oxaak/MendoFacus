const form = document.getElementById('formularioLogin');

async function comprobar(nombre, contraseña) {
    const respuesta = await fetch('http://localhost:3000/api/usuarios');
    const datos = await respuesta.json();
    const usuario = {
        nombre: null,
        contraseña: null
    }
    datos.forEach(element => {
        if (element.nombre == nombre && element.contraseña == contraseña) {
            usuario.nombre = element.nombre;
            usuario.contraseña = element.contraseña;
            localStorage.setItem('usuario', JSON.stringify(usuario));
            window.location.href = '../pages/perfil.html';
            return;
        } else {
            console.log('Usuario no encontrado');
        }
    });
    return false;
}


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("andando");

    const usuario = {
        nombre: document.getElementById('nombre').value,
        contraseña: document.getElementById('contraseña').value,
    };

    comprobar(usuario.nombre, usuario.contraseña);

});
