export class LoadingDlg extends HTMLElement{
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
        const titulo=this.getAttribute('titulo')
        shadow.innerHTML += `
        <Dialog class="popup" >
            <img id="exit" src="/src/assets/x-pop-up.svg">
            <div id="loading"><div>
            <h2 id="tittle">${titulo?titulo:"Cargando..."}</h2>
            </div>
        </Dialog>    
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