import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { JwtService } from "../../services/jwt.service.js"
import { UsuarioService } from "../../services/usuarios.service.js"

export class UsuarioConfig extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.usuarioService = new UsuarioService()
        this.#cargarInfo(shadow)
        this.#addActualizarPerfilHandler(shadow)
        this.#addActualizarPassword(shadow)
    }

    #render(shadow) {
        const btn = document.querySelector('#add-producto')
        if(btn){btn.remove()}
        
        shadow.innerHTML += `
        <form>
        <div class="info">
        <h3>Configuración de la cuenta</h3>
        <div class="flex">
            <input type="file" accept="image/*" hidden id="fileInput">
            <img id="foto" src="https://placehold.co/172x172?text=image-user">
            <div class="grid">
                <div class="inputContainer half">
                    <label>Nombre completo</label>
                    <input type="text" id="nombre">
                </div>
                <div class="inputContainer half">
                    <label>Email</label>
                    <input type="text" id="email" disabled>
                </div>
                <button id="save-perfil">Guardar cambios</button>
            </div>
        </div>
    
    </div>
<div class="direccion">
<h3>Dirección</h3>
<div class="inputContainer half">
    <label>Calle</label>
    <input type="text" id="calle">
</div>
<div class="inputContainer half">
    <label>Número</label>
    <input type="number" id="number">
</div>
<div class="inputContainer">
    <label>País</label>
    <select id="pais">
        <!-- opciones del país -->
    </select>
</div>
<div class="inputContainer">
    <label>Estado</label>
    <select id="estado">
        <!-- opciones del estado -->
    </select>
</div>
<div class="inputContainer half">
    <label>Ciudad</label>
    <select id="ciudad">
        <!-- opciones de la ciudad -->
    </select>
</div>
<div class="inputContainer half">
    <label>Código postal</label>
    <input type="number" id="postal">
</div>
<button id="save-direccion">Guardar cambios</button>
</div>
<div class="password">
    <h3>Cambiar contraseña</h3>
    <div class="inputContainer">
        <label>Contraseña actual</label>
        <input type="password" id="passw-actual">
    </div>
    <div class="inputContainer">
        <label>Nueva contraseña</label>
        <input type="password" id="passw-nueva">
    </div>
    <div class="inputContainer">
        <label>Confirmar contraseña</label>
        <input type="password" id="passw-repetir">
    </div>
    <button id="save-password">Cambiar contraseña</button>
</div>
</form>
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/usuarioConfig/usuarioConfig.component.css")
        shadow.appendChild(link)
    }

    async #cargarInfo(shadow){
            //obtenre info de usuario
            const token = LocalStorageService.getItem('jwt')
            this.id= JwtService.decode(token).id
            this.usuario = await this.usuarioService.getById(this.id)
            const imgPerfil = shadow.querySelector('#foto')
            const fileInput = shadow.querySelector('#fileInput')
            const inputNombre = shadow.querySelector('#nombre')
            const inputEmail = shadow.querySelector('#email')

            imgPerfil.src=this.usuario.foto
            inputNombre.value = this.usuario.nombre
            inputEmail.value=this.usuario.correo

            
    }

    #addActualizarPerfilHandler(shadow) {
        const imgPerfil = shadow.querySelector('#foto')
        const fileInput = shadow.querySelector('#fileInput')
        const inputNombre = shadow.querySelector('#nombre')
        const btnGuardar = shadow.querySelector('#save-perfil')

        //handler para cambiar foto de perfil
        imgPerfil.addEventListener('click', () => {
            fileInput.click()
        })

        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0]; // Obtiene el archivo seleccionado
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file); // Lee el archivo como una URL
                reader.onload = () => {
                    imgPerfil.src=reader.result;
                }
            }
        });

        btnGuardar.addEventListener('click',async (event)=>{
            event.preventDefault();
            const dialog = this.mostrarLoadingdlg("Guardando cambios...",shadow)
            if(fileInput.files[0]){
                const formData = new FormData()
                formData.append('foto',fileInput.files[0])
                console.log('Guardando foto..');
                await this.usuarioService.actualizarFoto(this.id,formData)
            }
            if(inputNombre.value!==this.usuario.nombre){
                
                await this.usuarioService.ActualizarById(this.id,{nombre:inputNombre.value})
            }
            dialog.remove()
        })
    }

    #addActualizarPassword(shadow){
        const passwActual = shadow.querySelector('#passw-actual')
        const passwNueva = shadow.querySelector('#passw-nueva')
        const passwRepetir = shadow.querySelector('#passw-repetir')
        const btnGuardar = shadow.querySelector('#save-password')

        btnGuardar.addEventListener('click',async (event)=>{
            event.preventDefault()
           
            if(this.usuario.password===passwActual.value){
                if(passwNueva.value&&passwRepetir.value&&passwNueva.value===passwRepetir.value){
                    await this.usuarioService.ActualizarById(this.id,{password:passwNueva.value})
                    passwActual.value=""
                    passwNueva.value=""
                    passwRepetir.value=""
                    this.mostrarLoadingdlg("Cambios guardados correctamente",shadow)
                }
                else{
                    this.mostrarErrordlg('Las contraseñas no coinciden',shadow)
                }
            }
            else{
                this.mostrarErrordlg('Contraseña incorrecta',shadow)
            }
        })

    }
  
    mostrarErrordlg(titulo, shadow) {
        const errorDlg = document.createElement('error-dlg')
        errorDlg.setAttribute('titulo', titulo)
        shadow.appendChild(errorDlg)
        return errorDlg
    }

    mostrarLoadingdlg(titulo, shadow) {
        const loadingdlg = document.createElement('loading-dlg')
        loadingdlg.setAttribute('titulo', titulo)
        shadow.appendChild(loadingdlg)
        return loadingdlg
    }

}