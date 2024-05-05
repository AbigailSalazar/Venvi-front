
export class ErrorPage extends HTMLElement {

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
        <img src="/src/assets/error.svg">
        <h1>${titulo?titulo:"Ha ocurrido un error"}</h1>
        <p>${mensaje?mensaje:"Intenta más tarde"}</p>
        <div class="button-container">
          <div id="regresar"><img class="icon" src="/src/assets/ArrowLeft.svg"><p>Regresar</p></div>
          <div id="inicio"><img class="icon" src="/src/assets/home.svg"><p>Volver al inicio</p></div>
        </div>
      </div>
        
        `
    }

    #addButtonsHandler(shadow){
        let btnExit = shadow.querySelector('#regresar')
        btnExit.addEventListener("click",()=>{
            window.history.back()
        })
        let btnCancel = shadow.querySelector('#inicio')
        btnCancel.addEventListener("click",()=>{
            window.location.href="/index.html"
        })
    }


    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "/src/components/error/error.component.css")
        shadow.appendChild(link)
    }


}