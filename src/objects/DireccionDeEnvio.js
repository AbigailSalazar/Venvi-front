export class DireccionDeEnvio {
    constructor(id, idUsuario, calle, numero, estado, ciudad, codigoPostal, pais) {
        this.id = id;
        this.idUsuario = idUsuario;
        this.calle = calle;
        this.numero = numero;
        this.estado = estado;
        this.ciudad = ciudad;
        this.codigoPostal = codigoPostal;
        this.pais = pais;
    }
}