import { LocalStorageService } from "./LocalStorage.service.js";
import { JwtService } from "./jwt.service.js"

export class CategoriaService {
    #urlServicio = 'http://localhost:3000/api/categorias'
    constructor() {

    }

    async getCategorias() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio, requestOptions);
            const productos = await response.json();
            console.log('productos ', productos);
            return productos;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }


    async addCategoria(categoria) {

        const myHeaders = new Headers();

        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "nombre": categoria.nombre,
            "descripcion": categoria.descripcion
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio, requestOptions);
            const categoria = await response.json();
            console.log('categoria guardada: ',categoria);
            return categoria
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async getByNombre(nombre) {
        const token = LocalStorageService.getItem('jwt')
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        try {
            const response = await fetch("localhost:3000/api/categorias/search?nombre=" + nombre, requestOptions)
            const categorias = await response.json();
            return categorias
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }

    }

    async getById(idCategoria) {

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "/" + idCategoria, requestOptions)
            const categoria = await response.json();

            return categoria;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async editById(idCategoria,categoria) {
        const token = LocalStorageService.getItem('jwt')
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");


        const raw = JSON.stringify({
            "nombre": categoria.nombre,
            "descripcion": categoria.descripcion
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "/" + idCategoria, requestOptions)
            return response
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async deleteById(idCategoria) {
        const token = LocalStorageService.getItem('jwt')
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "/" + idCategoria, requestOptions)
            return response
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }
}