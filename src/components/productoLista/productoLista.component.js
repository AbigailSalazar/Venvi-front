
export class ProductoLista extends HTMLElement{

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
        <section>
                    <img class="icon" src="/src/assets/x-circle.svg">
                    <img src="https://placehold.co/72x72?text=image-product">
                    <label>Nombre del producto vendido</label>
                    <label>$$$</label>
                    <label>0</label>
                    <label>Categoria</label>
                    <img class="icon"  src="/src/assets/edit.svg">
               </section>
        
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel","stylesheet")
        link.setAttribute("href","../src/components/productoLista/productoLista.component.css")
        shadow.appendChild(link)
    }


}