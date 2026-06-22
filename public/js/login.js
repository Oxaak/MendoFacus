const form = document.getElementById('formularioRegistro');

async function comprobar(nombre, email) {
    const respuesta = await fetch('http://localhost:3000/api/usuarios');
    const datos = await respuesta.json();

    datos.forEach(element => {
        if (element.nombre == nombre) {
            alert("El usuario ya existe")
            return false;
        } else if (element.email == email) {
            alert("El email ya esta en uso")
            return false;
        }
    });
    return true;
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("andando");

    const usuario = {
        nombre: document.getElementById('nombre').value,
        contraseña: document.getElementById('contraseña').value,
        email: document.getElementById('email').value,
    };

    const terminos = document.getElementById('terminosCondiciones').checked;

    if (!terminos) {
        alert('Debes aceptar los terminos y condiciones');
        return;
    }
    comprobar(usuario.nombre, usuario.email);

    try {
        const respuesta = await fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',  // Método HTTP
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)  // Convertir a JSON
        });

        if (respuesta.ok) {
            alert('✅ Usuario guardado exitosamente!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Error al guardar el usuario');
    }


});
