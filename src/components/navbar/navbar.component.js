import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { JwtService } from "../../services/jwt.service.js"

export class Navbar extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#agregarEventListeners(shadow)
        this.#agregarFotoUser(shadow)
        this.#agregarSearchHandler(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <nav>
        <img id="logo" src="/src/assets/logo.svg">
        <div id="search-box">
            <input id="search" type="text" placeholder="Busca lo que quieras">
            <button id="btn-search"></button>
        </div>
        <button id="car"></button>
        <img src="/src/assets/user.svg" id="user">
    </nav>
        
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/navbar/navbar.component.css")
        shadow.appendChild(link)
    }

    #agregarEventListeners(shadow) {
        shadow.getElementById('logo').addEventListener("click", () => {
            window.location.href = '/index.html';
        });

        shadow.getElementById('car').addEventListener("click", () => {
            window.location.href = '/carrito.html';
        });

        shadow.getElementById('user').addEventListener("click", () => {
            const token = LocalStorageService.getItem('jwt')
            if (token) {
                window.location.href = '/usuario-productos.html';
            }
            else {
                window.location.href = '../src/pages/login/login.html';
            }
        });
    }

    #agregarSearchHandler(shadow) {
        const btnSearch = shadow.getElementById('btn-search')
        const inputSearch = shadow.getElementById('search')
        btnSearch.addEventListener('click', buscar => {
            const searchText = inputSearch.value
            LocalStorageService.setItem('search', searchText)
            const btnAplicarFiltros = document.querySelector('#aplicar-filtros');
            btnAplicarFiltros.click()
        })
        inputSearch.addEventListener('input', () => {
            if (inputSearch.value == "") {
                LocalStorageService.deleteItem('search')
            }
        })
        inputSearch.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                const searchText = inputSearch.value
                LocalStorageService.setItem('search', searchText)
                const btnAplicarFiltros = document.querySelector('#aplicar-filtros');
                btnAplicarFiltros.click()
            }
        });

    }

    #agregarFotoUser(shadow) {
        const imgUser = shadow.getElementById('user')
        const jwt = LocalStorageService.getItem('jwt')
        if (jwt) {
            const foto = JwtService.decode(jwt).foto
            imgUser.setAttribute('src', foto)
        }
    }
}