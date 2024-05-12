import { ProductoService } from "../../services/productos.service.js"
import { UsuarioService } from "../../services/usuarios.service.js"

export class ProductoVenta extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        //this.#addElminarHandler(shadow)
    }

    async #render(shadow) {
        const imagen=this.getAttribute('imagen')
        const nombre=this.getAttribute('nombre')
        const precio=this.getAttribute('precio')
        const cantidad=this.getAttribute('cantidad')
        const idComprador=this.getAttribute('idComprador')
        const usuarioServicio = new UsuarioService()
        const perfilUsuario = await usuarioServicio.getPerfilById(idComprador) 

        shadow.innerHTML += `
        <section>
        <div id="producto" class="flex">
                    <img id="imagen" src="${imagen?imagen:"https://placehold.co/72x72?text=image-product"}">
                    <label id="nombre">${nombre}</label>
        </div>
                    <label id="precio">$${precio}</label>
                    <label id="cantidad">${cantidad}</label>
                    <a href="/src/pages/perfil/perfil.html?id=${idComprador}"><label id="comprador">${perfilUsuario.nombre}</label></a>
               </section>
        
        `
    }

    #addElminarHandler(shadow) {
        let btnEliminar = shadow.querySelector('#eliminar')
        btnEliminar.addEventListener("click", () => {
            let idProducto = this.getAttribute("id");//Obtiene id del producto a eliminar
            let popUp = document.createElement('pop-up')
            shadow.appendChild(popUp)

            let btnAccept = popUp.shadowRoot.querySelector('#aceptar');
            btnAccept.addEventListener("click", async () => {
                //TODO conectarse a servicio para eliminar de bd
                const productoService = new ProductoService()
                popUp.remove()//cierra el pop up
                const respuesta = await productoService.deleteById(idProducto)
                console.log(respuesta);
                this.remove() //elimina producto de la gui
            })

        })
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/venta/venta.component.css")
        shadow.appendChild(link)
    }


}