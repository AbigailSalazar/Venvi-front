
export class Navbar extends HTMLElement{

    constructor() {
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode:"open"})
        this.#agregarEstilo(shadow)
        this.#render(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <nav>
        <img src="/src/assets/logo.svg">
        <div id="search">
            <input type="text" placeholder="Busca lo que quieras">
            <button id="btn-search"></button>
        </div>
        <button id="car">
        <button id="user">
    </nav>
        
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel","stylesheet")
        link.setAttribute("href","../src/components/navbar/navbar.component.css")
        shadow.appendChild(link)
    }


}