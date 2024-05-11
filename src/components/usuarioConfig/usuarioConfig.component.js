import { DireccionDeEnvio } from "../../objects/DireccionDeEnvio.js"
import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { DireccionesService } from "../../services/direcciones.service.js"
import { JwtService } from "../../services/jwt.service.js"
import { LocacionesService } from "../../services/locaciones.service.js"
import { UsuarioService } from "../../services/usuarios.service.js"

export class UsuarioConfig extends HTMLElement {

    constructor() {
        super()
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.usuarioService = new UsuarioService()
        this.direccionService = new DireccionesService()
        this.locacionesService = new LocacionesService()
        this.direccionInfo=null
        await this.#cargarInfo(shadow)
        this.#cargarLocaciones(shadow)
        this.#actualizarDireccion(shadow)
        this.#addActualizarPerfilHandler(shadow)
        this.#addActualizarPassword(shadow)
        
    }

    #render(shadow) {
        const btn = document.querySelector('#add-producto')
        if (btn) { btn.remove() }

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
    <input type="number" id="numero">
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

    async #cargarInfo(shadow) {
        //obtenre info de usuario
        const token = LocalStorageService.getItem('jwt')
        this.id = JwtService.decode(token).id
        this.usuario = await this.usuarioService.getById(this.id)
        const imgPerfil = shadow.querySelector('#foto')
        const fileInput = shadow.querySelector('#fileInput')
        const inputNombre = shadow.querySelector('#nombre')
        const inputEmail = shadow.querySelector('#email')

        imgPerfil.src = this.usuario.foto
        inputNombre.value = this.usuario.nombre
        inputEmail.value = this.usuario.correo

        //cargar info de direccion
        const calleInput = shadow.querySelector('#calle')
        const numeroInput = shadow.querySelector('#numero')
        const postalInput = shadow.querySelector('#postal')
        try {
            const direccion= await this.direccionService.getByIdUser(this.id)
            if (direccion) {
                calleInput.value = direccion.calle
                numeroInput.value = direccion.numero
                postalInput.value = direccion.codigoPostal
                this.direccionInfo=direccion
            }
        } catch (error) {
            console.log(error);
            this.direccionInfo=null
        }

    }

    async #cargarLocaciones(shadow) {//Cargar paises, estados y ciudades a los combobox
        const paisesSelect = shadow.querySelector('#pais')
        const estadosSelect = shadow.querySelector('#estado')
        const ciudadSelect = shadow.querySelector('#ciudad')

        const paises = await this.locacionesService.obtenerPaises()
        for (const pais of paises) {
            const opcion = document.createElement('option')
            opcion.value = pais.name
            opcion.text = pais.name
            paisesSelect.appendChild(opcion)
        }

        
        if(this.direccionInfo){
            paisesSelect.value=this.direccionInfo.pais
            await this.llenarEstados(this.direccionInfo.pais,estadosSelect)
            estadosSelect.value=this.direccionInfo.estado
            await this.llenarCiudades(this.direccionInfo.pais,this.direccionInfo.estado,ciudadSelect)
            ciudadSelect.value=this.direccionInfo.ciudad
        }

        paisesSelect.addEventListener('change', async () => {
            ciudadSelect.innerHTML = ''
            estadosSelect.innerHTML = ''
            const pais = paisesSelect.options[paisesSelect.selectedIndex].text
            this.llenarEstados(pais,estadosSelect)

        })

        estadosSelect.addEventListener('change', async () => {
            ciudadSelect.innerHTML = ''
            const pais = paisesSelect.options[paisesSelect.selectedIndex].text
            const estado = estadosSelect.options[estadosSelect.selectedIndex].text
            this.llenarCiudades(pais,estado,ciudadSelect)

        })
    }

    async llenarEstados(pais,select){
        const estados = await this.locacionesService.obtenerEstados(pais)
            for (const estado of estados) {
                const opcion = document.createElement('option')
                opcion.value = estado.name
                opcion.text = estado.name
                select.appendChild(opcion)
            }
    }
    async llenarCiudades(pais,estado,select){
        
        const ciudades = await this.locacionesService.obtenerCiudades(pais, estado)
        for (const ciudad of ciudades) {
            const opcion = document.createElement('option')
            opcion.value = ciudad
            opcion.text = ciudad
            select.appendChild(opcion)
        }
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
                    imgPerfil.src = reader.result;
                }
            }
        });

        btnGuardar.addEventListener('click', async (event) => {
            event.preventDefault();
            const dialog = this.mostrarLoadingdlg("Guardando cambios...", shadow)
            if (fileInput.files[0]) {
                const formData = new FormData()
                formData.append('foto', fileInput.files[0])
                console.log('Guardando foto..');
                await this.usuarioService.actualizarFoto(this.id, formData)
            }
            if (inputNombre.value !== this.usuario.nombre) {

                await this.usuarioService.ActualizarById(this.id, { nombre: inputNombre.value })
            }
            dialog.remove()
        })
    }

    async #actualizarDireccion(shadow) {
        const paisesSelect = shadow.querySelector('#pais')
        const estadosSelect = shadow.querySelector('#estado')
        const ciudadSelect = shadow.querySelector('#ciudad')
        const calleInput = shadow.querySelector('#calle')
        const numeroInput = shadow.querySelector('#numero')
        const postalInput = shadow.querySelector('#postal')

        const btnGuardar = shadow.querySelector('#save-direccion')
        btnGuardar.addEventListener('click', async (event) => {
            event.preventDefault()
            
            const pais = paisesSelect.options[paisesSelect.selectedIndex].text
            const estado = estadosSelect.options[estadosSelect.selectedIndex].text
            const ciudad = ciudadSelect.options[ciudadSelect.selectedIndex].text
            const direccionNueva = new DireccionDeEnvio(null, this.id, calleInput.value, numeroInput.value, estado, ciudad, postalInput.value, pais)
            if (this.direccionInfo===null) {//si ya existe una dirección actualizar
                console.log('guardando direccion');
               await this.direccionService.registrarDireccion(direccionNueva)
            }
            else {//si no crear una nueva
                console.log('actualizando direccion');
                await this.direccionService.ActualizarDireccion(this.id, direccionNueva)
            }
            this.mostrarLoadingdlg("Dirección guardada", shadow)
        })


    }

    #addActualizarPassword(shadow) {
        const passwActual = shadow.querySelector('#passw-actual')
        const passwNueva = shadow.querySelector('#passw-nueva')
        const passwRepetir = shadow.querySelector('#passw-repetir')
        const btnGuardar = shadow.querySelector('#save-password')

        btnGuardar.addEventListener('click', async (event) => {
            event.preventDefault()

            if (this.usuario.password === passwActual.value) {
                if (passwNueva.value && passwRepetir.value && passwNueva.value === passwRepetir.value) {
                    await this.usuarioService.ActualizarById(this.id, { password: passwNueva.value })
                    passwActual.value = ""
                    passwNueva.value = ""
                    passwRepetir.value = ""
                    this.mostrarLoadingdlg("Cambios guardados correctamente", shadow)
                }
                else {
                    this.mostrarErrordlg('Las contraseñas no coinciden', shadow)
                }
            }
            else {
                this.mostrarErrordlg('Contraseña incorrecta', shadow)
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