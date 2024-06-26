import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { CarritoService } from "../../services/carrito.service.js"
import { JwtService } from "../../services/jwt.service.js"
import { Producto } from "../../objects/Producto.js"
import { ProductoService } from "../../services/productos.service.js"

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
        //this.#addCantidadHandler(shadow)
    }

    #render(shadow) {
        const imagen = this.getAttribute('imagen')
        const nombre = this.getAttribute('nombre')
        const precio = this.getAttribute('precio')
        const cantidad = this.getAttribute('cantidad')

        shadow.innerHTML += `
        <section>
                    <div class="flex">
                        <img id="eliminar" class="icon" src="/src/assets/x-circle.svg">
                        <img id="imagen" src="${imagen ? imagen : "https://placehold.co/72x72?text=image-product"}">
                        <label id="nombre">${nombre}</label>
                    </div>  
                    <label id="precio">$${precio}</label>
                    <input type="number" name="cantidad" id="cantidad" min="1" value=${cantidad} readonly>
                    <label id="subtotal">${precio * cantidad}</label>
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
                const producto = new Producto(idProducto, null, null, null, this.getAttribute('precio'), this.getAttribute('cantidad'), null, null)
                popUp.remove()//cierra el pop up
                const idUsuario = JwtService.decode(LocalStorageService.getItem('jwt')).id
                const respuesta = await carritoService.eliminarProductos(idUsuario, [producto])

                //actualizar total
                const subtotalLabel = document.getElementById('subtotal')
                const totalLabel = document.getElementById('total')
                const ivaLabel = document.getElementById('iva')
 
                const subtotal=Number(subtotalLabel.textContent)-(producto.precio*producto.cantidadDisponible)
                subtotalLabel.textContent = subtotal
                ivaLabel.textContent = subtotal * .16
                totalLabel.textContent = subtotal + (subtotal * .16)
                console.log(respuesta);
                this.remove() //elimina producto de la gui
            })

        })
    }

    async #addCantidadHandler(shadow){
        const menosBtn = shadow.querySelector('#menos-cantidad')
        const masBtn = shadow.querySelector('#mas-cantidad')
        const inputCantidad = shadow.querySelector('#cantidad')
        const productoService = new ProductoService()

        const producto = await productoService.getById(this.id)
        const eventDisminuir = new CustomEvent("menos-cantidad",{detail:this.id});

        //Funcionamiento para cantidad el input de cantidad
        menosBtn.addEventListener('click', () => {
            const cantidad = Number.parseInt(inputCantidad.value)
            if (cantidad >= 2) {
                inputCantidad.value = cantidad - 1
                window.dis
            }
        })

        inputCantidad.setAttribute('max', producto.cantidadDisponible)

        masBtn.addEventListener('click', () => {
            const cantidad = Number.parseInt(inputCantidad.value)
            if (cantidad < producto.cantidadDisponible)
                inputCantidad.value = cantidad + 1
        })
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "/src/components/productoCarrito/productoCarrito.component.css")
        shadow.appendChild(link)
    }

    #agregarClickHandler(shadow) {
        const labelNombre = shadow.querySelector('#nombre')
        labelNombre.addEventListener('click', () => {
            window.location.href = '/src/pages/producto/producto.html?id=' + this.id;
        })
    }
}