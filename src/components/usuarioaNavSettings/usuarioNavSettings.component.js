
export class UsuarioNavSettings extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#agregarOptionHandler(shadow)
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
                <div id="opcion-signout">
                    <img class="icono-signout" src="/src/assets/SignOut.svg">
                    <label>Cerrar sesión</label>
                </div>
            </section>
        
        `
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