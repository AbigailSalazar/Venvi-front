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

    const menosBtn = document.getElementById('menos-cantidad')
    const masBtn = document.getElementById('mas-cantidad')

    if (productoId) {
        try {
            const producto = await productoService.getById(productoId)
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
            mostrarErrorPage("Producto no encontrado","El producto que busca no existe o ha sido eliminado")
        }
    }
    else
    {
        mostrarErrorPage("Direccion incorrecta","La dirección a la que desea ingresar es incorrecta")
    }

    
    function mostrarErrorPage(titulo,mensaje){
        const errorPage = document.createElement('error-page')
        const main = document.getElementsByTagName('main')[0]
        errorPage.setAttribute('titulo',titulo)
        errorPage.setAttribute('mensaje',mensaje)
        main.innerHTML=''
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

