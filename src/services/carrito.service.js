import { LocalStorageService } from "./LocalStorage.service.js";

export class CarritoService {

    #urlServicio = "http://localhost:3000/api/carritos"
    async crearCarrito(carrito) {

        const myHeaders = new Headers();

        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "idUsuario": carrito.idUsuario,
            "total": carrito.total,
            "productos": carrito.productos
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio, requestOptions);
            if (response.status == 403) {
                this.cerrarSesiónExpirada()
                return
            }
            const carrito = await response.json();
            return carrito
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async getByUserId(idUsuario){
        
        const myHeaders = new Headers();
        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        const requestOptions = {
            method: "GET",
            headers:myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio+"/"+idUsuario, requestOptions)
            const carrito = await response.json();
            return carrito;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async actualizarCarrito(carrito) {
        const token = LocalStorageService.getItem('jwt')
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "idUsuario": carrito.idUsuario,
            "total": carrito.total,
            "productos": carrito.productos
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "/" + carrito.idUsuario, requestOptions)
            if (response.status == 403) {
                this.cerrarSesiónExpirada()
                return
            }
            return response
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async añadirProductos(idUsuario, productos) {
        const token = LocalStorageService.getItem('jwt')
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "productos": productos
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "/" + idUsuario + "/productos", requestOptions)
            if (response.status == 403) {
                this.cerrarSesiónExpirada()
                return
            }
            return response
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async eliminarProductos(idUsuario, productos) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "productos": productos
        });

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "/" + idUsuario + "/productos", requestOptions)
            if (response.status == 403) {
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


