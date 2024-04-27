
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
        var nombre=this.getAttribute("name")
        if(this.className=="precio"){
            nombre="Precio max: "+nombre
        }
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
            const tipo = this.className
            switch(tipo){
                case "categoria":{
                    const categoriaSelected = document.querySelectorAll('input[name="categoria"]:checked')
                    console.log('categoria selected: '+categoriaSelected);
                    categoriaSelected[0].checked=false
                }
                break
                case "precio":{
                    const precioSelected = document.querySelectorAll('input[name="precio"]:checked')
                    precioSelected[0].checked=false
                }
                break
                case "rango":{
                    const inputPrecioMin = document.querySelector('#min-precio')
                    const inputPrecioMax = document.querySelector('#max-precio')
                    inputPrecioMin.value = '' 
                    inputPrecioMax.value = ''
                }
                break
                
            }
            //activar el boton de aplicar filtros
            this.remove()
            const btnAplicarFiltros = document.querySelector('#aplicar-filtros');
            btnAplicarFiltros.click()
            
        })
    }
}