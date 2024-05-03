export class ErrorDialog extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addExitHandler(shadow)

    }

    #render(shadow) {

        //const dialog = document.querySelector('confirmation-dialog')
        const titulo=this.getAttribute('titulo')
        const message=this.textContent

        shadow.innerHTML += `
        <div class="popup" id="error">
            <img id="exit" src="/src/assets/x.svg">
            <div class="content">
            <img src="/src/assets/exclamation.svg">
                <div>
                <h2>${titulo}</h2>
                <p>${message?message:""}</p>
                </div>
            </div>

        </div>
        
        `
    }

    #addExitHandler(shadow){
        let btnExit = shadow.querySelector('#exit')
        btnExit.addEventListener("click",()=>{
            this.remove()
        })
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/popup/popup.component.css")
        shadow.appendChild(link)
    }


}