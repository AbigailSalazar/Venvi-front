
export class PopUp extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addElminarHandler(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div class="popup" id="warning">
            <img id="exit" src="/src/assets/x-pop-up.svg">
            <div id="content">
                <img src="/src/assets/alert-octagon.svg">

                <h2>¿Estas seguro de...?</h2>
            </div>
            <p>El ... se eliminará por completo</p>
            <div id="btn-container">
                <button id="cancel">No, Cancel</button>
                <button id="accept">Yes, Confirmar</button>
            </div>

        </div>
        
        `
    }

    #addElminarHandler(shadow){
        let btnExit = shadow.querySelector('#exit')
        btnExit.addEventListener("click",()=>{
            btnExit.parentElement.remove()
        })
    }


    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/popup/popup.component.css")
        shadow.appendChild(link)
    }


}