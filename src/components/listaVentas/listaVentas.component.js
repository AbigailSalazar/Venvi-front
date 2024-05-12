import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { JwtService } from "../../services/jwt.service.js"
import { ProductoService } from "../../services/productos.service.js"
import { VentaService } from "../../services/venta.service.js"

export class ListaVentas extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#verificarJwt()
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#cargarVentas(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div class="tabla">
        <h3>VENTAS REALIZADAS</h3>
        <div id="columnnames">
         <label>PRODUCTO</label>
         <label>PRECIO</label>
         <label>CANTIDAD</label>
         <label>COMPRADO POR</label>
         </div>
        <div id="content">
        </div>
    </div>
        
        `
    }

    #verificarJwt() {
        const jwt = LocalStorageService.getItem('jwt')
        if (!jwt) {
            window.location.href = '/src/pages/login/login.html'
        }
    }
    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/listaVentas/listaVentas.component.css")
        shadow.appendChild(link)
    }



    async #cargarVentas(shadow) {
        console.log('cargando ventas');
        //obtener productos de servicio y agregarlos
        const listaProductos = shadow.querySelector('#content')

        const token = LocalStorageService.getItem('jwt')
        const idUsuario = JwtService.decode(token).id
        const ventaService = new VentaService()
        const compras = await ventaService.getByIdVendedor(idUsuario)

        compras.map((compra) => {
            console.log(compra);
           
            const productos = compra.productos
            for (const producto of productos) {
                if (producto.idVendedor == idUsuario) {
                    const productoElement = document.createElement('producto-venta')
                    productoElement.setAttribute('id', producto._id)
                    productoElement.setAttribute('nombre', producto.nombre)
                    productoElement.setAttribute('precio', producto.precio)
                    productoElement.setAttribute('cantidad', producto.cantidadDisponible)
                    productoElement.setAttribute('idComprador',compra.idUsuario)

                    if (producto.fotos) {
                        productoElement.setAttribute('imagen', producto.fotos[0]) //TODO  
                    }
                    listaProductos.appendChild(productoElement)
                }

            }

        })
    }

}