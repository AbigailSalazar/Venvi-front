
export class MensajeExito extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addButtonsHandler(shadow)
    }

    #render(shadow) {
        const titulo = this.getAttribute('titulo')
        const mensaje = this.getAttribute('mensaje')
        shadow.innerHTML += `
        <div>
        <img src="/src/assets/CheckCircle.svg">
        <h1>${titulo?titulo:"Éxito!"}</h1>
        <p>${mensaje?mensaje:"Tu acción se ha realizado con éxito"}</p>
        <div class="button-container">
        <div id="regresar"><img class="icon" src="/src/assets/ArrowLeft.svg"><p>Seguir comprando</p></div>
        <div id="compras"><img class="icon" src="/src/assets/home.svg"><p>Ver compras</p></div>
      </div>
      </div>
        
        `
    }

    #addButtonsHandler(shadow){
        let btnExit = shadow.querySelector('#compras')
        btnExit.addEventListener("click",()=>{
            window.location.href="/usuario-productos.html"
        })
        let btnCancel = shadow.querySelector('#regresar')
        btnCancel.addEventListener("click",()=>{
            window.location.href="/index.html"
        })
    }


    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "/src/components/mensajeExito/mensajeExito.component.css")
        shadow.appendChild(link)
    }


}