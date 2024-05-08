import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { CarritoService } from "../../services/carrito.service.js"
import { JwtService } from "../../services/jwt.service.js"

document.addEventListener('DOMContentLoaded', function () {


    cargarProductos()
    const btnRegresar=document.getElementById('regresar')
    btnRegresar.addEventListener('click',()=>{
        window.location.href="/index.html"
    })

    async function cargarProductos() {
        //obtener productos de servicio y agregarlos
        const listaProductos = document.querySelector('#content')

        const token = LocalStorageService.getItem('jwt')
        const idUsuario = JwtService.decode(token).id
        const carritoService = new CarritoService()
        const carrito = await carritoService.getByUserId(idUsuario)

        if (carrito) {
            const subtotalLabel = document.getElementById('subtotal')  
            const totalLabel = document.getElementById('total')  
            const ivaLabel = document.getElementById('iva')  
            var subtotal=0
            if (carrito.productos) {
                for (const producto of carrito.productos) {
                    const productoElement = document.createElement('producto-carrito')
                    productoElement.setAttribute('id', producto._id)
                    productoElement.setAttribute('nombre', producto.nombre)
                    productoElement.setAttribute('precio', producto.precio)
                    productoElement.setAttribute('cantidad', producto.cantidadDisponible)

                    if (producto.fotos) {
                        productoElement.setAttribute('imagen', producto.fotos[0]) //TODO  
                    }
                    listaProductos.appendChild(productoElement)
                    subtotal+=producto.precio*producto.cantidadDisponible
                }
            }
            subtotalLabel.textContent = subtotal
            ivaLabel.textContent=subtotal*.16
            totalLabel.textContent=subtotal+(subtotal*.16)

        }


    }
})

