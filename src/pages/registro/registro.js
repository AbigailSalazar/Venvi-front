import { Usuario } from "../../objects/Usuario.js";
import { UsuarioService } from "../../services/usuarios.service.js";

const registerForm = document.getElementById('form-registro');

// Escuchar el evento submit del formulario
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = registerForm.nombre.value;
    const correo = registerForm.correo.value;
    const password = registerForm.password.value;
    const foto = registerForm.foto.files[0]; // Archivo de imagen

    try {
        // Registrar el usuario en el servicio externo
        const usuarioService = new UsuarioService()
        const usuario = new Usuario(nombre, foto,password,correo,0)
        await usuarioService.registrarUsuario(usuario);
        console.log('Usuario registrado:', usuario);
    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
    }
});


