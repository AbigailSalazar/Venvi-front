import { LocalStorageService } from "./LocalStorage.service.js";

export class ProductoService {
    #urlServicio = 'http://localhost:3000/api/productos'
    constructor() {

    }

    async getProductos() {
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


    async addProductos(producto) {

        //TODO: registrar categorias y obtener los objetos para agregarlas al producto
        const myHeaders = new Headers();
        
        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "idVendedor": producto.idVendedor,
            "nombre": producto.nombre,
            "fotos": producto.fotos,
            "precio": producto.precio,
            "cantidadDisponible": producto.cantidadDisponible,
            "descripcion":producto.descripcion
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            console.log('producto a agregar:',raw);
            const response = await fetch(this.#urlServicio, requestOptions);
            return response;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }
}