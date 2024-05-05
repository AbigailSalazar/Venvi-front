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

        try {
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
                
            }
        } catch (error) {
            mostrarErrorPage("Perfil no encontrado","El perfil que busca no existe o ha sido eliminado")
        }
        
    }
    else{
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
})