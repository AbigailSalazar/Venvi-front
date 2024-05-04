import { ErrorDialog } from "../../components/popup/errordlg.component.js";
import { Usuario } from "../../objects/Usuario.js";
import { UsuarioService } from "../../services/usuarios.service.js";

window.customElements.define('error-dlg',ErrorDialog)

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
        const autenticacion= await usuarioService.autenticarUsuario(password,correo)
        if(!autenticacion){
            mostrarErrordlg("Constraseña o correo incorrectos")
        }

    } catch (error) {
        console.error('Error al iniciar sesión:', error.message);
    }

   function mostrarErrordlg(titulo){
        const errorDlg = document.createElement('error-dlg')
        errorDlg.setAttribute('titulo', titulo)
        document.body.appendChild(errorDlg)
        return errorDlg
    }
});

