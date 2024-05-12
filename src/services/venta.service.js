import { LocalStorageService } from "./LocalStorage.service.js";

export class VentaService{
    #urlServicio="http://localhost:3000/api/ventas"

    async crearVenta(venta){
        const myHeaders = new Headers();

        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "idUsuario": venta.idUsuario,
            "subtotal": venta.subtotal,
            "envio": venta.envio,
            "total": venta.total,
            "iva": venta.iva,
            "direccionEnvio": venta.direccionEnvio,
            "productos": venta.productos
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
            const venta = await response.json();
            return venta
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async getByUser(idUsuario){

        const myHeaders = new Headers();

        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
          };
          
          try {
            const response = await fetch(this.#urlServicio+"/usuario/"+idUsuario, requestOptions);
            if (response.status == 403) {
                this.cerrarSesiónExpirada()
                return
            }
            const ventas = await response.json();
            return ventas
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async getById(idVenta){
        const myHeaders = new Headers();

        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
          };
          
          try {
            const response = await fetch(this.#urlServicio+"/"+idVenta, requestOptions);
            if (response.status == 403) {
                this.cerrarSesiónExpirada()
                return
            }
            const ventas = await response.json();
            return ventas
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