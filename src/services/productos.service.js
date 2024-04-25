import { LocalStorageService } from "./LocalStorage.service.js";
import { JwtService } from "./jwt.service.js"

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

    async getProductosByCategoria(categoria) {
        categoria = categoria.replace(" ","%20")
        const requestOptions = {
            method: "GET",
            redirect: "follow"
          };
          

        try {
            const response = await fetch(this.#urlServicio+"/categorias/"+categoria, requestOptions)
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
            "descripcion": producto.descripcion,
            "categorias":producto.categorias
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        console.log('Producto guardado: ',raw);
        try {
            const response = await fetch(this.#urlServicio, requestOptions);
            return response;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async getByUser() {
        const token = LocalStorageService.getItem('jwt')
        const idUsuario = JwtService.decode(token).id
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "/vendedores/" + idUsuario, requestOptions)
            const productos = await response.json();
            return productos
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }

    }

    async getById(idProducto){

        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio+"/"+idProducto, requestOptions)
            const producto = await response.json();
            console.log('producto obtenido: ', producto);
            return producto;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async editById(idProducto, producto) {
        const token = LocalStorageService.getItem('jwt')
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "nombre": producto.nombre,
            "fotos": producto.fotos,
            "precio": producto.precio,
            "cantidadDisponible": producto.cantidadDisponible,
            "descripcion": producto.descripcion //TODO: categorias
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio+"/"+idProducto, requestOptions)
            return response
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async deleteById(idProducto) {
        const token = LocalStorageService.getItem('jwt')
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "/" + idProducto, requestOptions)
            return response
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }
}