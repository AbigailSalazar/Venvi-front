import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { ProductoService } from "../../services/productos.service.js"

export class ListaProductos extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#cargarProductos(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div class="tabla">
        <h3>ADMINISTRACIÓN DE PRODUCTOS EN VENTA</h3>
        <div id="columnnames">
            <label></label>
            <label></label>
         <label>PRODUCTO</label>
         <label>PRECIO</label>
         <label>CANTIDAD</label>
         <label>CATEGORIAS</label>
         <label></label>  
         <label></label>
         </div>
        <div id="content">
        </div>
    </div>
        
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/listaProductos/listaProductos.component.css")
        shadow.appendChild(link)
    }

    async #cargarProductos(shadow) {
        //obtener productos de servicio y agregarlos
        const listaProductos = shadow.querySelector('#content')

        const productoService = new ProductoService()
        const productos = await productoService.getByUser()

        productos.map((producto) => {
            const productoElement = document.createElement('producto-lista')
            productoElement.setAttribute('id', producto._id)
            productoElement.setAttribute('imagen',"") //TODO
            productoElement.setAttribute('nombre', producto.nombre)
            productoElement.setAttribute('precio', producto.precio)
            productoElement.setAttribute('cantidad',producto.cantidadDisponible)

            listaProductos.appendChild(productoElement)
        })
    }

}