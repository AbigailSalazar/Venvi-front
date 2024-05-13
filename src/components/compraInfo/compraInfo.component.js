import { VentaService } from "../../services/venta.service.js"

export class CompraInfo extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#cargarInfo(shadow)
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div class="flex">
          <div class="tabla">
          <h3>Lista de artículos</h3>
          <div id="columnnames">
              <label>PRODUCTOS</label>
              <label>PRECIO</label>
              <label>CANTIDAD</label>
              <label>SUBTOTAL</label>
          </div>
          <div id="content">
          </div>
      </div>
      <section class="bordered-container">
          <h3>Total de la orden</h3>
          <div class="flex">
              <p>Subtotal</p>
              <p class="black" id="subtotal">$</p>
          </div>
          <div class="flex">
              <p>Envio</p>
              <p class="black" id="envio">$0</p>
          </div>
          <div class="flex">
              <p>IVA</p>
              <p class="black" id="iva">$</p>
          </div>
          <hr>
          <div class="flex">
              <p class="black">Total</p>
              <p class="black" id="total">$</p>
          </div>
      </section>
        </div>
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/compraInfo/compraInfo.component.css")
        shadow.appendChild(link)
    }

    async #cargarInfo(shadow) {
        //obtener productos de servicio y agregarlos

        const ventaService=new VentaService()
        const compra = await ventaService.getById(this.id)
        const listaProductos = shadow.querySelector('#content')
        const subtotalLabel = shadow.getElementById('subtotal')
        const totalLabel = shadow.getElementById('total')
        const ivaLabel = shadow.getElementById('iva')
        for (const producto of compra.productos) {
            const productoElement = document.createElement('producto-compra')
            productoElement.setAttribute('id', producto._id)
            productoElement.setAttribute('nombre', producto.nombre)
            productoElement.setAttribute('precio', producto.precio)
            productoElement.setAttribute('cantidad', producto.cantidadDisponible)

            if (producto.fotos) {
                productoElement.setAttribute('imagen', producto.fotos[0])
            }
            listaProductos.appendChild(productoElement)
        }

        subtotalLabel.textContent += compra.subtotal
        ivaLabel.textContent += compra.iva
        totalLabel.textContent += compra.total




    }


}