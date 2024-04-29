import { ProductoService } from "../../services/productos.service.js";
import { UsuarioService } from "../../services/usuarios.service.js";

document.addEventListener('DOMContentLoaded', async () => {

    const productoService = new ProductoService()
    const usuarioService = new UsuarioService()

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productoId = urlParams.get('id')

    const imagenP = document.querySelector('img.principal')
    const titulo = document.querySelector('.titulo')
    const descripcion = document.querySelector('#descripcion')
    const inputCantidad = document.querySelector('#cantidad')
    const categorias = document.querySelector('#categorias')
    const precio = document.querySelector('.precio')

    const vendedorNombre = document.querySelector('#vendedor-nombre')
    const vendedorFoto = document.querySelector('#vendedor-foto')
    const vendedorRating = document.querySelector('#vendedor-rating')

    const producto = await productoService.getById(productoId)
    const usuario = await usuarioService.getPerfilById(producto.idVendedor)
    if (productoId) {
        cargarProductoInfo(producto)
        cargarUsuarioInfo(usuario)
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
        precio.textContent = "$"+producto.precio
    }

    function cargarUsuarioInfo(usuario) {
        console.log('usuario',usuario);
        vendedorNombre.innerHTML=`Nombre: <strong>${usuario.nombre}</strong>`
        vendedorFoto.setAttribute('src',usuario.foto)
        vendedorRating.innerHTML=`Rating: <strong>${usuario.rating}</strong>`
    }
})

