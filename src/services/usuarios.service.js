import { LocalStorageService } from "./LocalStorage.service.js";

export class UsuarioService {
    #urlServicio = 'http://localhost:3000/api/usuarios'
    constructor() {

    }

    async registrarUsuario(usuario) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
            "nombre": usuario.nombre,
            "foto": usuario.foto,
            "password": usuario.password,
            "correo": usuario.correo,
            "rating": usuario.rating
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        await fetch(this.#urlServicio, requestOptions)
            .then((result) => {
                console.log(result);
            })
            .then(() => { window.location.href = './login/login.html'; })//regresar al login
            .catch((error) => console.error(error));
    }

    async autenticarUsuario(password, correo) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "password": password,
            "correo": correo
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        await fetch(this.#urlServicio + "/autenticar", requestOptions)
        .then((response) => response.json())
            .then((data) => {
                console.log(data);
                LocalStorageService.setItem("jwt", data.token); // Guardar el JWT en el localStorage
                window.location.href = '/index.html';
            })
            .catch((error) => console.error(error));
    }
}