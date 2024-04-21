export class JwtService {

    static decode(jwt) {
        // Decodificar el JWT
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));

        // Acceder a la información del usuario
        const id = payload.id; // ID del usuario
        const nombre = payload.nombre; // Nombre del usuario
        const correo = payload.correo; // Correo electrónico del usuario
       
        return {id,nombre,correo}
    }
}