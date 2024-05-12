import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { JwtService } from "../../services/jwt.service.js"
import { ProductoService } from "../../services/productos.service.js"
import { VentaService } from "../../services/venta.service.js"

export class ListaCompras extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#verificarJwt()
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#cargarCompras(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div class="tabla">
        <h3>COMPRAS REALIZADAS</h3>
        <div id="columnnames">
         <label>COMPRA</label>
         <label>TOTAL</label>
         <label>CANTIDAD PRODUCTOS</label>
         <label>ESTADO</label>
         </div>
        <div id="content">
        </div>
    </div>
        
        `
    }

    #verificarJwt(){
        const jwt = LocalStorageService.getItem('jwt')
        if(!jwt){
            window.location.href='/src/pages/login/login.html'
        }
    }
    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/listaCompras/listaCompras.component.css")
        shadow.appendChild(link)
    }

  

    async #cargarCompras(shadow) {
        console.log('cargando compras');
        //obtener productos de servicio y agregarlos
        const listaProductos = shadow.querySelector('#content')

        const token = LocalStorageService.getItem('jwt')
        const idUsuario = JwtService.decode(token).id
        const ventaService= new VentaService()
        const compras = await ventaService.getByUser(idUsuario)

        compras.map((compra) => {
            console.log(compra);
            const compraElement = document.createElement('compra-lista')
            compraElement.setAttribute('id', compra._id)
            compraElement.setAttribute('fecha', compra.fecha)
            compraElement.setAttribute('total', compra.total)
            compraElement.setAttribute('estado',compra.estado)

            var contProductos=0
            for (const producto of compra.productos) {
                contProductos+=producto.cantidadDisponible
            }
            compraElement.setAttribute('cantidad',contProductos)
            listaProductos.appendChild(compraElement)
        })
    }

}