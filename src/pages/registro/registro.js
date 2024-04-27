import { Usuario } from "../../objects/Usuario.js";
import { UsuarioService } from "../../services/usuarios.service.js";
import { ConvertirImagen } from "../../utils/convertirImagen.js";

const registerForm = document.getElementById('form-registro');

// Escuchar el evento submit del formulario
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm)
    formData.append('rating',0)
    const usuarioService = new UsuarioService()
    await usuarioService.registrarUsuario(formData);
});


