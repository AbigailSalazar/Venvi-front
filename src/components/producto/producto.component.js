
export class Producto extends HTMLElement{

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
        <div>
            <img id="producto" src="https://placehold.co/202x172?text=image-product">
            <h4>Nombre del producto</h4>
            <p>$$$</p>
        </div>
        
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel","stylesheet")
        link.setAttribute("href","../src/components/producto/producto.component.css")
        shadow.appendChild(link)
    }


}