
export class ProductoCompra extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addReseñaHandler(shadow)
    }

    #render(shadow) {
        const imagen = this.getAttribute('imagen')
        const nombre = this.getAttribute('nombre')
        const precio = this.getAttribute('precio')
        const cantidad = this.getAttribute('cantidad')

        shadow.innerHTML += `
        <section>
                    <div class="flex">
                        <img id="rating" class="icon" src="/src/assets/outline_star.svg">
                        <img id="imagen" src="${imagen ? imagen : "https://placehold.co/72x72?text=image-product"}">
                        <label id="nombre">${nombre}</label>
                    </div>  
                    <label id="precio">$${precio}</label>
                    <label id="cantidad">${cantidad}</label>
                </div>
                    <label id="subtotal">${precio * cantidad}</label>
               </section>
        
        `
    }

    #addReseñaHandler(shadow) {
        let btnRaiting = shadow.querySelector('#rating')
        btnRaiting.addEventListener("click", () => {
            //TODO
        })
    }
    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "/src/components/productoCompra/productoCompra.component.css")
        shadow.appendChild(link)
    }

}