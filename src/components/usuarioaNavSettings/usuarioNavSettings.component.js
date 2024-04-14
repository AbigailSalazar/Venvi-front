
export class UsuarioNavSettings extends HTMLElement{

    constructor() {
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode:"open"})
        this.#agregarEstilo(shadow)
        this.#render(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
            <section>
                <div class="opcion-productos">
                    <img class="icono-productos" src="/src/assets/Stack.svg">
                    <label>Mis Productos</label>
                </div>
                <div  class="opcion-compras">
                    <img class="icono-compras" src="/src/assets/shopping-cart.svg">
                    <label>Mis Compras</label>
                </div>
                <div  class="opcion-ventas">
                    <img class="icono-ventas" src="/src/assets/Storefront.svg">
                    <label>Mis Ventas</label>
                </div>
                <div class="opcion-config">
                    <img class="icono-config" src="/src/assets/Gear.svg">
                    <label>Configuración</label>
                </div>
                <div class="opcion-signout">
                    <img class="icono-signout" src="/src/assets/SignOut.svg">
                    <label>Cerrar sesión</label>
                </div>
            </section>
        
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel","stylesheet")
        link.setAttribute("href","../src/components/usuarioaNavSettings/usuarioNavSettings.component.css")
        shadow.appendChild(link)
    }


}