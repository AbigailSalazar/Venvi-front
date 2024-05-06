import { LocalStorageService } from "./LocalStorage.service.js";

export class DireccionesService {

    #urlServicio = "http://localhost:3000/api/direcciones"
    async registrarDireccion(direccionData) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        myHeaders.append("Content-Type", "application/json");


        const raw = JSON.stringify({
            "idUsuario": direccionData.idUsuario,
            "calle": direccionData.calle,
            "numero": direccionData.numero,
            "estado": direccionData.estado,
            "ciudad": direccionData.ciudad,
            "codigoPostal": direccionData.codigoPostal,
            "pais": direccionData.pais
        });

        const requestOptions = {
            method: "POST",
            body: raw,
            headers: myHeaders,
            redirect: "follow"
        };

        const response = await fetch(this.#urlServicio, requestOptions)
        const direccion = await response.json();
        return direccion
    }

    async ActualizarDireccion(IdUsuario, direccionData) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        myHeaders.append("Content-Type", "application/json");
   
        const raw = JSON.stringify({
            "calle": direccionData.calle,
            "numero": direccionData.numero,
            "estado": direccionData.estado,
            "ciudad": direccionData.ciudad,
            "codigoPostal": direccionData.codigoPostal,
            "pais": direccionData.pais
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(this.#urlServicio + "/" + IdUsuario, requestOptions)
        const direccion = await response.json();
        return direccion
    }
    async getByIdUser(IdUsuario) {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "/" + IdUsuario, requestOptions);
            if (!response.ok) {
                return false
            }
            const direccionUser = await response.json();
            return direccionUser;
        } catch (error) {
            console.error("Error en la solicitud: ", error);
            return null; // Otra forma de manejar el error, según tu lógica
        }
    }
}