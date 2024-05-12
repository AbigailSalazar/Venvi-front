import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { CarritoService } from "../../services/carrito.service.js"
import { JwtService } from "../../services/jwt.service.js"
import { VentaService } from "../../services/venta.service.js"
import { DireccionesService } from "../../services/direcciones.service.js"

import { Venta } from "../../objects/Venta.js"

document.addEventListener('DOMContentLoaded', function () {
    const listaProductos = document.querySelector('#content')
    const subtotalLabel = document.getElementById('subtotal')
    const totalLabel = document.getElementById('total')
    const ivaLabel = document.getElementById('iva')
    const token = LocalStorageService.getItem('jwt')
    const idUsuario = JwtService.decode(token).id
    const carritoService = new CarritoService()

    cargarProductos()
    const btnRegresar = document.getElementById('regresar')
    btnRegresar.addEventListener('click', () => {
        window.location.href = "/index.html"
    })

    const btnComprar = document.getElementById('comprar')
    btnComprar.addEventListener('click', async function () {
        if (listaProductos.childElementCount >= 1) {
            const ventaService = new VentaService()
            const direccionService = new DireccionesService()
            const direccion = await direccionService.getByIdUser(idUsuario)
            if (direccion) {
                const carrito = await carritoService.getByUserId(idUsuario)
                const venta = new Venta(null,
                    idUsuario,
                    null,
                    Number(subtotalLabel.textContent), 0,
                    Number(totalLabel.textContent),
                    Number(ivaLabel.textContent),
                    direccion._id, carrito.productos)
                const ventaNueva = await ventaService.crearVenta(venta)
                if (ventaNueva.error) {
                    mostrarErrorPage("Ha ocurrido un error!", ventaNueva.error)
                    return
                }

                await carritoService.eliminarProductos(idUsuario, carrito.productos)
                mostrarMensajeExito("Tu pedido se ha hecho correctamente", "Puedes consultar los detalles en el apartado mis compras de tu perfil.")
            } else {
                mostrarErrordlg("Dirección no encontrada!", "Agregue una dirección en su perfil")
            }
        }
        else{
            mostrarErrordlg('El carrito esta vacio')
        }

    })

    function mostrarErrordlg(titulo, mensaje) {
        const errorDlg = document.createElement('error-dlg')
        errorDlg.setAttribute('titulo', titulo)
        errorDlg.textContent = mensaje
        document.body.appendChild(errorDlg)
        return errorDlg
    }

    function mostrarMensajeExito(titulo, mensaje) {
        const exitoPage = document.createElement('exito-page')
        const main = document.getElementsByTagName('main')[0]
        exitoPage.setAttribute('titulo', titulo)
        exitoPage.setAttribute('mensaje', mensaje)
        main.innerHTML = ''
        main.appendChild(exitoPage)
    }


    function mostrarErrorPage(titulo, mensaje) {
        const errorPage = document.createElement('error-page')
        const main = document.getElementsByTagName('main')[0]
        errorPage.setAttribute('titulo', titulo)
        errorPage.setAttribute('mensaje', mensaje)
        main.innerHTML = ''
        main.appendChild(errorPage)
    }

    async function cargarProductos() {
        //obtener productos de servicio y agregarlos
        const carrito = await carritoService.getByUserId(idUsuario)
        if (carrito) {

            var subtotal = 0
            if (carrito.productos) {
                for (const producto of carrito.productos) {
                    const productoElement = document.createElement('producto-carrito')
                    productoElement.setAttribute('id', producto._id)
                    productoElement.setAttribute('nombre', producto.nombre)
                    productoElement.setAttribute('precio', producto.precio)
                    productoElement.setAttribute('cantidad', producto.cantidadDisponible)

                    if (producto.fotos) {
                        productoElement.setAttribute('imagen', producto.fotos[0])
                    }
                    listaProductos.appendChild(productoElement)
                    subtotal += producto.precio * producto.cantidadDisponible
                }
            }
            subtotalLabel.textContent = subtotal
            ivaLabel.textContent = subtotal * .16
            totalLabel.textContent = subtotal + (subtotal * .16)

        }


    }
})

