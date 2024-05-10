import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { JwtService } from "../../services/jwt.service.js"
import { UsuarioService } from "../../services/usuarios.service.js"

export class UsuarioNavSettings extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#agregarOptionHandler(shadow)
        this.#addNuevoProductoHandler(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
            <section>
                <div class="selected" id="opcion-productos">
                    <img class="icono-productos" src="/src/assets/Stack.svg">
                    <label>Mis Productos</label>
                </div>
                <div  id="opcion-compras">
                    <img class="icono-compras" src="/src/assets/shopping-cart.svg">
                    <label>Mis Compras</label>
                </div>
                <div  id="opcion-ventas">
                    <img class="icono-ventas" src="/src/assets/Storefront.svg">
                    <label>Mis Ventas</label>
                </div>
                <div id="opcion-config">
                    <img class="icono-config" src="/src/assets/Gear.svg">
                    <label>Configuración</label>
                </div>
                <div id="opcion-logout">
                    <img class="icono-logout" src="/src/assets/SignOut.svg">
                    <label>Cerrar sesión</label>
                </div>
            </section>
        
        `
    }

    #addNuevoProductoHandler() {



    }


    #agregarOptionHandler(shadow) {
        const opcionProductos = shadow.querySelector('#opcion-productos');
        opcionProductos.addEventListener('click', () => {
            const btnSave = document.querySelector('button')
            if(btnSave){
                btnSave.remove()
            }
            
            const section = document.querySelector('#dinamic-content')
            section.innerHTML = '';
            const formulario = document.createElement('lista-productos')
            this.cambiarColorSeleccionado(shadow,opcionProductos)
            section.appendChild(formulario)
        })

        const opcionlogout = shadow.querySelector('#opcion-logout');
        opcionlogout.addEventListener('click',()=>{
            LocalStorageService.deleteItem('jwt')
            window.location.href = '/index.html';
        })  

        const opcionConfig = shadow.querySelector('#opcion-config');
        opcionConfig.addEventListener('click',async ()=>{
        
            const section = document.querySelector('#dinamic-content')
            section.innerHTML = '';
            const settings = document.createElement('user-settings')

            this.cambiarColorSeleccionado(shadow,opcionConfig)
            section.appendChild(settings)
        })  



    }

    cambiarColorSeleccionado(shadow,div){
        const opcionSelected = shadow.querySelector('.selected')
        if (opcionSelected) { opcionSelected.classList.remove('selected')}
        div.classList.add('selected')
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/usuarioaNavSettings/usuarioNavSettings.component.css")
        shadow.appendChild(link)
    }


}