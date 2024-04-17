
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
            btnCancel.parentElement.remove()
        })
    }
}