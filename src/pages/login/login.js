import { Usuario } from "../../objects/Usuario.js";
import { UsuarioService } from "../../services/usuarios.service.js";

const loginForm = document.getElementById('form-login');
const btnRegistrar = document.getElementById('registrar')

btnRegistrar.addEventListener('click',()=>{
    window.location.href = '../registro/registro.html';
})

// Escuchar el evento submit del formulario
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = loginForm.password.value;
    const correo = loginForm.correo.value;

    try {
        // Registrar el usuario en el servicio externo
        const usuarioService = new UsuarioService()
        await usuarioService.autenticarUsuario(password,correo)

    } catch (error) {
        console.error('Error al registrar usuario:', error.message);
    }
});

