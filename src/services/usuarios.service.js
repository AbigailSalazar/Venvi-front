import { LocalStorageService } from "./LocalStorage.service.js";
import { JwtService } from "./jwt.service.js";

export class UsuarioService {
    #urlServicio = 'http://localhost:3000/api/usuarios'
    constructor() {

    }

    async registrarUsuario(usuario) {

        const requestOptions = {
            method: "POST",
            body: usuario,
            redirect: "follow"
        };

        await fetch(this.#urlServicio, requestOptions)
            .then((result) => {
                console.log(result);
            })
            .then(() => { window.location.href = '../login/login.html'; })//regresar al login
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

    async actualizarFoto(idUsuario,fotos){
        
        const myHeaders = new Headers();
        myHeaders.append("Authorization", LocalStorageService.getItem('jwt'));
        const requestOptions = {
            method: "PATCH",
            headers:myHeaders,
            body: fotos,
            redirect: "follow"
        };

        try {
            console.log('Guardando foto..');
            const response = await fetch(this.#urlServicio+"/"+idUsuario+"/foto", requestOptions);
            return response;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }
    
    async getById(idUsuario){
        const token = LocalStorageService.getItem('jwt')
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio+"/"+idUsuario, requestOptions)
            if(response.status==403){
                this.cerrarSesiónExpirada()
                return
            }
            const usuario = await response.json();
            return usuario;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async getPerfilById(idUsuario){

        const requestOptions = {
          method: "GET",
          redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio+"/perfil/"+idUsuario, requestOptions)
            const usuario = await response.json();
            return usuario;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }


    
    async ActualizarById(idUsuario, usuario) {
        const token = LocalStorageService.getItem('jwt')
        const myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "nombre": usuario.nombre,
            "password": usuario.password,
          });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio+"/"+idUsuario, requestOptions)
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