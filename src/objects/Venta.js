export class Venta {
    constructor(id, idUsuario, fecha, subtotal, envio, total, iva, direccionEnvio,productos){
        this.id = id;
        this.idUsuario = idUsuario;
        this.fecha = fecha;
        this.subtotal = subtotal;
        this.envio = envio;
        this.total = total;
        this.iva = iva;
        this.direccionEnvio = direccionEnvio;
        this.productos=productos
    }
}