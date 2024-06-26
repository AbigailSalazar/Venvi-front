import { ProductoService } from "../../services/productos.service.js";
import { UsuarioService } from "../../services/usuarios.service.js";
import { CarritoService } from "../../services/carrito.service.js";
import { JwtService } from "../../services/jwt.service.js";
import { LocalStorageService } from "../../services/LocalStorage.service.js";
import { Carrito } from "../../objects/Carrito.js";
import { VentaService } from "../../services/venta.service.js";
import { DireccionesService } from "../../services/direcciones.service.js";
import { Venta } from "../../objects/Venta.js";

document.addEventListener('DOMContentLoaded', async () => {

    const productoService = new ProductoService()
    const usuarioService = new UsuarioService()
    const carritoService = new CarritoService()

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productoId = urlParams.get('id')

    const imagenP = document.querySelector('img#principal')
    const titulo = document.querySelector('.titulo')
    const descripcion = document.querySelector('#descripcion')
    const inputCantidad = document.querySelector('#cantidad')
    const categorias = document.querySelector('#categorias')
    const precio = document.querySelector('.precio')

    const vendedorNombre = document.querySelector('#vendedor-nombre')
    const vendedorFoto = document.querySelector('#vendedor-foto')
    const vendedorRating = document.querySelector('#vendedor-rating')

    const menosBtn = document.getElementById('menos-cantidad')
    const masBtn = document.getElementById('mas-cantidad')
    var producto = null
    if (productoId) {
        try {
            producto = await productoService.getById(productoId)
            const usuario = await usuarioService.getPerfilById(producto.idVendedor)
            if (productoId) {
                cargarProductoInfo(producto)
                cargarUsuarioInfo(usuario)
            }
            //Funcionamiento para cantidad el input de cantidad
            menosBtn.addEventListener('click', () => {
                const cantidad = Number.parseInt(inputCantidad.value)
                if (cantidad >= 2) {
                    inputCantidad.value = cantidad - 1
                }
            })
        } catch (error) {
            mostrarErrorPage("Producto no encontrado", "El producto que busca no existe o ha sido eliminado")
            console.log(error);
        }

        const btnAddToCart = document.getElementById('add-to-cart')

        const jwt = LocalStorageService.getItem('jwt')
        const idUsuario = JwtService.decode(jwt).id
        if (producto && jwt) {
            
            const parrafo = btnAddToCart.querySelector('p');
            //si el producto no es del usuario
            if (producto.idVendedor !== idUsuario) {
                const carrito = await carritoService.getByUserId(idUsuario)
               
                const btnComprar = document.getElementById('buy')
                btnComprar.addEventListener('click', async function () {
                        producto.cantidadDisponible=inputCantidad.value
                        const ventaService = new VentaService()
                        const direccionService = new DireccionesService()
                        const direccion = await direccionService.getByIdUser(idUsuario)
                        if (direccion) {
                            const precio = producto.precio
                            const iva = precio*.16
                            const venta = new Venta(null,
                                idUsuario,
                                null,
                                Number(precio), 0,
                                Number(precio+iva),
                                Number(iva),
                                direccion._id, [producto])
                            const ventaNueva = await ventaService.crearVenta(venta)
                            if (ventaNueva.error) {
                                mostrarErrorPage("Ha ocurrido un error!", ventaNueva.error)
                                return
                            }
                            mostrarMensajeExito("Tu pedido se ha hecho correctamente", "Puedes consultar los detalles en el apartado mis compras de tu perfil.")
        
                        }
                        else{
                            mostrarErrorPage("No ha registrado una dirección", "Registre una dirección en la configuración de su perfil")
                        }
                    
            
                })
                if (!carrito.message) {
                    if (carrito.productos.some(e => e._id === productoId)) {//si el producto ya esta en el carrito
                        btnAddToCart.id = "add-to-cart-disabled"
                        parrafo.textContent = "Agregado a tu carrito"
                    }
                    else {
                        const handleClick = async () => {
                            producto.cantidadDisponible = inputCantidad.value
                            await carritoService.añadirProductos(idUsuario, [producto]);
                            btnAddToCart.id = "add-to-cart-disabled";
                            parrafo.textContent = "Agregado a tu carrito";
                            btnAddToCart.removeEventListener('click', handleClick);
                        };
                        btnAddToCart.addEventListener('click', handleClick)
                    }

                }
                else {//evento para agregar el producto al carrito

                    const handleClick = async () => {
                        producto.cantidadDisponible = inputCantidad.value
                        const carrito = new Carrito(null, idUsuario, producto.precio, producto)
                        await carritoService.crearCarrito(carrito)
                        btnAddToCart.id = "add-to-cart-disabled"
                        parrafo.textContent = "Agregado a tu carrito"
                        btnAddToCart.removeEventListener('click', handleClick)
                    }
                    btnAddToCart.addEventListener('click', handleClick)

                }
            }
            else{
                btnAddToCart.id = "add-to-cart-disabled"
                parrafo.textContent = "Vista de ejemplo"
            }

        }
        else {
            btnAddToCart.addEventListener('click', () => {
                window.location.href = "/src/pages/login/login.html"
            })
        }
    }
    else {
        mostrarErrorPage("Direccion incorrecta", "La dirección a la que desea ingresar es incorrecta")
    }

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


    function cargarProductoInfo(producto) {

        if (producto.categorias) {
            var categoriasStr = ""
            for (const categoria of producto.categorias) {
                categoriasStr += " " + categoria.nombre
            }
            categorias.innerHTML = `Categorias: <strong>${categoriasStr}</strong>`
        }

        imagenP.setAttribute('src', producto.fotos[0])
        titulo.textContent = producto.nombre
        descripcion.textContent = producto.descripcion
        inputCantidad.setAttribute('max', producto.cantidadDisponible)

        masBtn.addEventListener('click', () => {
            const cantidad = Number.parseInt(inputCantidad.value)
            if (cantidad < producto.cantidadDisponible)
                inputCantidad.value = cantidad + 1
        })
        precio.textContent = "$" + producto.precio

        cargarCarrusel(producto.fotos, imagenP)
    }

    function cargarCarrusel(fotos, imagenP) {
        const carrusel = document.getElementById('carrusel')
        for (const foto of fotos) {
            const img = document.createElement('img')
            img.src = foto
            img.addEventListener('click', () => {
                imagenP.src = foto
                const imgSelected = document.querySelector('.selected')
                if (imgSelected) { imgSelected.classList.remove('selected') }
                img.classList.add('selected')
            })
            carrusel.appendChild(img)

        }
    }

    function cargarUsuarioInfo(usuario) {
        console.log('usuario', usuario);
        vendedorNombre.innerHTML = `Nombre: <strong>${usuario.nombre}</strong>`
        vendedorFoto.setAttribute('src', usuario.foto)
        vendedorFoto.addEventListener('click', () => {
            window.location.href = '/src/pages/perfil/perfil.html?id=' + usuario._id;//todo: cargar info usuario
        })
        vendedorRating.innerHTML = `Rating: <strong>${usuario.rating}</strong>`
    }
})

