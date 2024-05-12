
export class Compra extends HTMLElement{

    constructor() {
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode:"open"})
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#agregarClickHandler()
    }

    #render(shadow) {
        const fecha = this.getAttribute('fecha')
        const fechaFormat = new Date(fecha).toLocaleDateString("es")
        const total=this.getAttribute('total')
        const cantidad = this.getAttribute('cantidad')
        const estado = this.getAttribute('estado')

          shadow.innerHTML += `
        <section>
                    <label id="fecha">${fechaFormat}</label>
                    <label id="total">${total}</label>
                    <label id="cantidad">${cantidad}</label>
                    <label id="estado">${estado}</label>
               </section>
        
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel","stylesheet")
        link.setAttribute("href","../src/components/compra/compra.component.css")
        shadow.appendChild(link)
    }

    #agregarClickHandler(){
        this.addEventListener('click',()=>{
            //ver detalles de la compra
            const section = document.querySelector('#dinamic-content')
            section.innerHTML = '';
            const compra = document.createElement('compra-info')
            compra.setAttribute('id',this.id)
            section.appendChild(compra)
        })
    }


}