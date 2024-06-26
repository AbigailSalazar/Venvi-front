import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { JwtService } from "../../services/jwt.service.js"
import { ProductoService } from "../../services/productos.service.js"

export class ListaProductos extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#verificarJwt()
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#cargarProductos(shadow)
        this.#agregarBotonAdd(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div id="contenedor" class="flex">
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
        link.setAttribute("href", "../src/components/listaProductos/listaProductos.component.css")
        shadow.appendChild(link)
    }

    #agregarBotonAdd(shadow) {
        const btn=document.querySelector('button')
        if(!btn){
            const btnAdd = document.createElement('button')
        btnAdd.id="add-producto"
        const contenedor = shadow.querySelector('#contenedor')

        btnAdd.textContent = 'Agregar producto'
        contenedor.appendChild(btnAdd)

        //Para cambiar a la lista de productos

        const section = document.querySelector('#dinamic-content')

        btnAdd.addEventListener('click', () => {

            section.innerHTML = '';
            const formulario = document.createElement('form-producto')
            section.appendChild(formulario)
            btnAdd.remove()
        })
        }
        
    }

    async #cargarProductos(shadow) {
        //obtener productos de servicio y agregarlos
        const listaProductos = shadow.querySelector('#content')

        const token = LocalStorageService.getItem('jwt')
        const idUsuario = JwtService.decode(token).id
        const productoService = new ProductoService()
        const productos = await productoService.getByUser(idUsuario)

        productos.map((producto) => {
            console.log(producto);
            const productoElement = document.createElement('producto-lista')
            productoElement.setAttribute('id', producto._id)
            productoElement.setAttribute('nombre', producto.nombre)
            productoElement.setAttribute('precio', producto.precio)
            productoElement.setAttribute('cantidad', producto.cantidadDisponible)

            if (producto.fotos) {
                productoElement.setAttribute('imagen', producto.fotos[0]) //TODO  
            }
            if (producto.categorias) {
                var categoriasStr = ""
                for (const categoria of producto.categorias) {
                    categoriasStr += categoria.nombre + " "
                }
                productoElement.setAttribute('categorias', categoriasStr)
            }
            listaProductos.appendChild(productoElement)
        })
    }

}