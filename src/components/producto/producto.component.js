
export class Producto extends HTMLElement{

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
        const nombre = this.getAttribute('nombre')
        const precio=this.getAttribute('precio')
        const foto = this.getAttribute('foto')
        shadow.innerHTML += `
        <div>
            <img id="foto" width="200" height="172" src="${foto?foto:"https://placehold.co/72x72?text=image-product"}">
            <h4 id="nombre">${nombre}</h4>
            <p id="precio">$${precio}</p>
        </div>
        
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel","stylesheet")
        link.setAttribute("href","../src/components/producto/producto.component.css")
        shadow.appendChild(link)
    }

    #agregarClickHandler(){
        this.addEventListener('click',()=>{
            window.location.href = 'src/pages/producto/producto.html?producto='+this.id; 
        })
    }


}