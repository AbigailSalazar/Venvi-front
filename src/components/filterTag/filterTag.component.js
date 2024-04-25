
export class FilterTag extends HTMLElement{

    constructor() {
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode:"open"})
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addExitHandler(shadow)
    }

    #render(shadow) {
        //cargar nombre
        const nombre=this.getAttribute("name")
        shadow.innerHTML += `
        <div id="filter-tag">
        <label>${nombre?nombre:"Ejemplo"}</label>
        <button class="icon" id="cancel"></button>
    </div>
        
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel","stylesheet")
        link.setAttribute("href","../src/components/filterTag/filterTag.component.css")
        shadow.appendChild(link)
    }

    #addExitHandler(shadow){
        let btnCancel = shadow.querySelector('#cancel')
        btnCancel.addEventListener("click",()=>{
            //deseleccionar el filtro
            const radioButton = document.getElementById(this.getAttribute('name'));
            if(radioButton){
                radioButton.checked=false
            }
            else{
                const inputPrecioMin = document.querySelector('#min-precio')
                const inputPrecioMax = document.querySelector('#max-precio')
                inputPrecioMin.value !== '' 
                inputPrecioMax.value !== ''
            }
            //activar el boton de aplicar filtros
            const btnAplicarFiltros = document.querySelector('#aplicar-filtros');
            btnAplicarFiltros.click()
            this.remove()
        })
    }
}