import { LocalStorageService } from "../../services/LocalStorage.service.js"

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

        //Para cambiar a la lista de productos

        const section = document.querySelector('#dinamic-content')
        const btnSave = document.querySelector('#add-producto')

        
        btnSave.addEventListener('click', () => {
            btnSave.setAttribute('id', "save-producto")
            btnSave.textContent = 'publicar producto'
            section.innerHTML = '';
            const formulario = document.createElement('form-producto')
            section.appendChild(formulario)
        })

    }


    #agregarOptionHandler(shadow) {
        const opcionProductos = shadow.querySelector('#opcion-productos');
        const btn = document.querySelector('#add-producto')
        opcionProductos.addEventListener('click', () => {
            const section = document.querySelector('#dinamic-content')
            btn.setAttribute('id', "add-producto")
            btn.textContent = 'Agregar producto'
            section.innerHTML = '';
            const formulario = document.createElement('lista-productos')
            section.appendChild(formulario)
        })

        const opcionlogout = shadow.querySelector('#opcion-logout');
        opcionlogout.addEventListener('click',()=>{
            LocalStorageService.deleteItem('jwt')
            window.location.href = '/index.html';
        })  

        // opciones.forEach(opcion => {
        //     opcion.addEventListener('click', () => {
        //         opciones.forEach(o => o.classList.remove('selected'));
        //         opcion.classList.add('selected');
        //     });
        // });
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/usuarioaNavSettings/usuarioNavSettings.component.css")
        shadow.appendChild(link)
    }


}