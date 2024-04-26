import { ProductoService } from "../../services/productos.service.js"

export class ProductoLista extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addElminarHandler(shadow)
        this.#addEditarHandler(shadow)
        this.#cargarProducto(shadow)
    }

    #render(shadow) {
        const imagen=this.getAttribute('imagen')
        const nombre=this.getAttribute('nombre')
        const precio=this.getAttribute('precio')
        const cantidad=this.getAttribute('cantidad')
        const categorias=this.getAttribute('categorias')

        shadow.innerHTML += `
        <section>
                    <img id="eliminar" class="icon" src="/src/assets/x-circle.svg">
                    <img id="imagen" src="${imagen?imagen:"https://placehold.co/72x72?text=image-product"}">
                    <label id="nombre">${nombre}</label>
                    <label id="precio">$${precio}</label>
                    <label id="cantidad">${cantidad}</label>
                    <label id="categorias">${categorias?categorias:"Ninguna"}</label>
                    <img id="editar" class="icon"  src="/src/assets/edit.svg">
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


    #cargarProducto(shadow){
        //TODO: cargar datos del producto desde el servicio
    }

    #addEditarHandler(shadow) {
        const btnEdit = shadow.querySelector('#editar')

        btnEdit.addEventListener('click', () => {
            const btnAdd = document.querySelector('#add-producto')
            const section = document.querySelector('#dinamic-content')

            btnAdd.setAttribute('id', "save-producto")
            btnAdd.textContent = 'Guardar cambios'
            section.innerHTML = '';

            //pasar id del producto
            const productoId = this.getAttribute('id')
            const formulario = document.createElement('form-producto')

            formulario.setAttribute("idProducto",productoId)
            section.appendChild(formulario)
        })
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/productoLista/productoLista.component.css")
        shadow.appendChild(link)
    }


}