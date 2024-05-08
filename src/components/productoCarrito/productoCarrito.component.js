import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { CarritoService } from "../../services/carrito.service.js"
import { JwtService } from "../../services/jwt.service.js"

export class ProductoCarrito extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addElminarHandler(shadow)
        this.#agregarClickHandler(shadow)
    }

    #render(shadow) {
        const imagen=this.getAttribute('imagen')
        const nombre=this.getAttribute('nombre')
        const precio=this.getAttribute('precio')
        const cantidad=this.getAttribute('cantidad')
        const categorias=this.getAttribute('categorias')

        shadow.innerHTML += `
        <section>
                    <div class="flex">
                        <img id="eliminar" class="icon" src="/src/assets/x-circle.svg">
                        <img id="imagen" src="${imagen?imagen:"https://placehold.co/72x72?text=image-product"}">
                        <label id="nombre">${nombre}</label>
                    </div>  
                    <label id="precio">$${precio}</label>
                    <div class="input-container">
                    <button id="menos-cantidad" class="range">-</button>
                    <input type="number" name="cantidad" id="cantidad" min="1" value="1" readonly>
                    <button id="mas-cantidad" class="range">+</button>
                </div>
                    <label id="categorias">${categorias?categorias:"Ninguna"}</label>
               </section>
        
        `
    }

    #addElminarHandler(shadow) {
        let btnEliminar = shadow.querySelector('#eliminar')
        btnEliminar.addEventListener("click", () => {
            let idProducto = this.getAttribute("id");//Obtiene id del producto a eliminar
            let popUp = document.createElement('pop-up')
            shadow.appendChild(popUp)

            let btnAccept = popUp.shadowRoot.querySelector('#aceptar');
            btnAccept.addEventListener("click", async () => {
                //TODO conectarse a servicio para eliminar de bd
                const carritoService = new CarritoService()
                popUp.remove()//cierra el pop up
                const idUsuario = JwtService.decode(LocalStorageService.getItem('jwt')).id
                const respuesta = await carritoService.eliminarProductos(idUsuario,idProducto)
                console.log(respuesta);
                this.remove() //elimina producto de la gui
            })

        })
    }
    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "/src/components/productoCarrito/productoCarrito.component.css")
        shadow.appendChild(link)
    }

    #agregarClickHandler(shadow){
        const labelNombre = shadow.querySelector('#nombre')
        labelNombre.addEventListener('click',()=>{
            window.location.href = '/src/pages/producto/producto.html?id='+this.id; 
        })
    }
}