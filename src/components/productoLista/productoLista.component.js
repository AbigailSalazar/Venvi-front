
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
        this.#addNuevoProductoHandler(shadow)
        this.#cargarProducto(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <section>
                    <img id="eliminar" class="icon" src="/src/assets/x-circle.svg">
                    <img id="imagen" src="https://placehold.co/72x72?text=image-product">
                    <label id="nombre">Nombre del producto vendido</label>
                    <label id="precio">$$$</label>
                    <label id="cantidad">0</label>
                    <label id="categorias">Categoria</label>
                    <img id="editar" class="icon"  src="/src/assets/edit.svg">
               </section>
        
        `
    }

    #addElminarHandler(shadow) {
        let btnEliminar = shadow.querySelector('#eliminar')
        btnEliminar.addEventListener("click", () => {
            let idProducto = btnEliminar.parentElement.getAttribute("id");//Obtiene id del producto a eliminar
            let popUp = document.createElement('pop-up')
            shadow.appendChild(popUp)


            let btnAccept = popUp.shadowRoot.querySelector('#aceptar');
            btnAccept.addEventListener("click", () => {
                //TODO conectarse a servicio para eliminar de bd
                popUp.remove()//cierra el pop up
                btnEliminar.parentElement.remove() //elimina producto de la gui
            })

        })
    }

    #addNuevoProductoHandler() {

        //Para cambiar a la lista de productos

        const section = document.querySelector('#dinamic-content')
        const btnSave = document.querySelector('#add-producto')

        btnSave.addEventListener('click', () => {
            btnSave.setAttribute('id', "save-producto")
            btnSave.textContent = 'publicar producto'
            section.innerHTML = '';
            const formulario = document.createElement('form-producto')
            section.appendChild(formulario)
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