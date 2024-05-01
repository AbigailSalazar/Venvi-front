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
        const myHeaders = new Headers();

        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "idVendedor": producto.idVendedor,
            "nombre": producto.nombre,
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

        try {
            const response = await fetch(this.#urlServicio, requestOptions);
            if(response.status==403){
                this.cerrarSesiónExpirada()
                return
            }
            return await response.json();
            
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }

    }

    async addFotos(idProducto, fotos){
        
        const myHeaders = new Headers();
        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        const requestOptions = {
            method: "PATCH",
            headers:myHeaders,
            body: fotos,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio+"/"+idProducto+"/fotos", requestOptions);
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
            if(response.status==403){
                this.cerrarSesiónExpirada()
                return
            }
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
            return producto;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async buscarProducto(nombre,categoria,min,max){
        
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        const filtros={}
        if(nombre){
            filtros.nombre=nombre
        }
        if(categoria){
            filtros.categoria=categoria
        }
        if(min){
            filtros.min=min
        }
        if(max){
            filtros.max=max
        }
        var query= new URLSearchParams(filtros)
        try {
            const response = await fetch(this.#urlServicio+"/search?"+query, requestOptions)
            const producto = await response.json();
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
            "precio": producto.precio,
            "cantidadDisponible": producto.cantidadDisponible,
            "descripcion": producto.descripcion,
            "categorias":producto.categorias
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio+"/"+idProducto, requestOptions)
            if(response.status==403){
                this.cerrarSesiónExpirada()
                return
            }
            return response
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    
    async deleteFotosById(idProducto,fotos) {
        const token = LocalStorageService.getItem('jwt')
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
            "fotos":fotos
        });
        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body:raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "/" + idProducto+"/fotos", requestOptions)
            if(response.status==403){
                this.cerrarSesiónExpirada()
                return
            }
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
            if(response.status==403){
                this.cerrarSesiónExpirada()
                return
            }
            return response
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    cerrarSesiónExpirada() {
        alert('Tu sesión ha expirado')
        window.location.href = 'src/pages/login/login.html'
        LocalStorageService.deleteItem('jwt')
    }
}