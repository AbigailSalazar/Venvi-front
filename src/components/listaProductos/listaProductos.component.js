
export class ListaProductos extends HTMLElement{

    constructor() {
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode:"open"})
        this.#agregarEstilo(shadow)
        this.#render(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div class="tabla">
        <h3>ADMINISTRACIÓN DE PRODUCTOS EN VENTA</h3>
        <div id="columnnames">
            <label></label>
            <label></label>
         <label>PRODUCTO</label>
         <label>PRECIO</label>
         <label>CANTIDAD</label>
         <label>CATEGORIAS</label>
         <label></label>  
         <label></label>
         </div>
        <div id="content">
           <producto-lista id="1"></producto-lista>
           <producto-lista  id="2"></producto-lista>
           <producto-lista  id="3"></producto-lista>
        </div>
    </div>
        
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel","stylesheet")
        link.setAttribute("href","../src/components/listaProductos/listaProductos.component.css")
        shadow.appendChild(link)
    }

}