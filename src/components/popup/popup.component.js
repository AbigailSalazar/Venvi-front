
export class PopUp extends HTMLElement {

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

        shadow.innerHTML += `
        <Dialog class="popup" id="warning">
            <img id="exit" src="/src/assets/x-pop-up.svg">
            <div id="content">
                <img src="/src/assets/alert-octagon.svg">

                <div>
                <h2 id="tittle">¿Estas seguro de eliminar este producto?</h2>
                <p id="message">El producto se eliminará por completo</p>
                </div>
            </div>
            
            <div id="btn-container">
                <button id="cancelar">No, Cancel</button>
                <button id="aceptar">Yes, Confirmar</button>
            </div>

        </Dialog>
        
        `
    }

    #addExitHandler(shadow){
        let btnExit = shadow.querySelector('#exit')
        btnExit.addEventListener("click",()=>{
            this.remove()
        })
        let btnCancel = shadow.querySelector('#cancelar')
        btnCancel.addEventListener("click",()=>{
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