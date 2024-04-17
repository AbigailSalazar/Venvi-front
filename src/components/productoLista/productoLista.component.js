
export class ProductoLista extends HTMLElement{

    constructor() {
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode:"open"})
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addElminarHandler(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <section>
                    <img id="eliminar" class="icon" src="/src/assets/x-circle.svg">
                    <img src="https://placehold.co/72x72?text=image-product">
                    <label>Nombre del producto vendido</label>
                    <label>$$$</label>
                    <label>0</label>
                    <label>Categoria</label>
                    <img id="editar" class="icon"  src="/src/assets/edit.svg">
               </section>
        
        `
    }

    #addElminarHandler(shadow){
        let btnEliminar = shadow.querySelector('#eliminar')
        btnEliminar.addEventListener("click",()=>{
            let idProducto = btnEliminar.parentElement.getAttribute("id");//Obtiene id del producto a eliminar
            let popUp = document.createElement('pop-up')
            shadow.appendChild(popUp)


            let btnAccept = popUp.shadowRoot.querySelector('#aceptar');
            btnAccept.addEventListener("click",()=>{
                //TODO conectarse a servicio para eliminar de bd
                popUp.remove()//cierra el pop up
                btnEliminar.parentElement.remove() //elimina producto de la gui
            })

        })
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel","stylesheet")
        link.setAttribute("href","../src/components/productoLista/productoLista.component.css")
        shadow.appendChild(link)
    }


}