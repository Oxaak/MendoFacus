const form = document.getElementById('alumnoForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();  // Evita recarga de página

    // Crear objeto con los datos del formulario
    const alumno = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        edad: parseInt(document.getElementById('edad').value)
    };

    try {
        // Enviar datos al servidor con fetch
        const respuesta = await fetch('http://localhost:3000/api/users', {
            method: 'POST',  // Método HTTP
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(alumno)  // Convertir a JSON
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

async function cargarAlumnos() {
    try {
        const respuesta = await fetch('http://localhost:3000/api/users');
        if (respuesta.ok) {
            const alumnos = await respuesta.json();
            const contenedor = document.getElementById('alumnosContainer');
            if (contenedor) {
                contenedor.innerHTML = '';
                alumnos.forEach(alumno => {
                    const div = document.createElement('div');
                    div.style.padding = '10px';
                    div.style.borderBottom = '1px solid #ccc';
                    div.textContent = `${alumno.nombre} ${alumno.apellido} - ${alumno.email} (${alumno.edad} años)`;
                    contenedor.appendChild(div);
                });
            }
        }
    } catch (error) {
        console.error('Error al cargar alumnos:', error);
    }
}

document.addEventListener('DOMContentLoaded', cargarAlumnos);