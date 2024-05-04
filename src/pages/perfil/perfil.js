import { ProductoService } from "../../services/productos.service.js";
import { UsuarioService } from "../../services/usuarios.service.js";

document.addEventListener('DOMContentLoaded',async ()=>{

    const labelNombre = document.getElementById('nombre')
    const labelRating = document.getElementById('rating')
    const fotosContenedor = document.querySelector('.fotos')
    const fotoUusario = document.querySelector('img.usuario')

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const productoId = urlParams.get('id')
    if(productoId){
        const usuarioService = new UsuarioService()
        const perfil= await usuarioService.getPerfilById(productoId)

        if(perfil){
            const productosService = new ProductoService()
            labelNombre.textContent=perfil.nombre
            labelRating.textContent=perfil.rating
            fotoUusario.src=perfil.foto
            const productos = await productosService.getByUser(perfil._id)
            if(productos){
                for(const producto of productos){
                    const div= document.createElement('div')
                    div.className="foto"
                    div.addEventListener('click',()=>{//mostrar los detalles del producto al hacer clic
                        window.location.href = '/src/pages/producto/producto.html?id='+producto._id; 
                    })
                    const img = document.createElement('img')
                    img.src=producto.fotos[0]
                    div.appendChild(img)
                    fotosContenedor.appendChild(div)
                }
            }
        }
        else{
            //TODO: Mostrar página de error/no encontrado
        }
    }
})