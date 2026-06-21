const form = document.getElementById('formularioRegistro');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("andando");

    const usuario = {
        nombre: document.getElementById('nombre').value,
        contraseña: document.getElementById('contraseña').value,
        email: document.getElementById('email').value,
    };

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
