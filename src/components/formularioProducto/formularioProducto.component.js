import { Producto } from "../../objects/Producto.js"
import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { JwtService } from "../../services/jwt.service.js"
import { ProductoService } from "../../services/productos.service.js"

export class FormularioProducto extends HTMLElement {

    constructor() {
        super()
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addPublicarHandler(shadow)
        this.#addFotoHandler(shadow)
    }

    #render(shadow) {
        //cargar nombre
        const nombre = this.getAttribute("name")
        shadow.innerHTML += `
        <section class="bordered-container">
        <h3>Nuevo producto</h3>
    
        <form>
            <label>Nombre</label>
            <input type="text" name="nombre"  id="nombre" placeholder="Nombra tu producto">

            <div class="divided">
            <div class="campo">
                <label for="cantidad">Cantidad</label>
                <input type="number" id="cantidad" name="cantidad" min="0" placeholder="0">
            </div>
            <div class="campo">
                <label for="precio">Precio</label>
                    <input id="precio" name="precio" type="number" min="0">
            </div>
                   
                    
            </div>
            <label for="categorias">Categorias</label>
            <input type="text"  id="categorias" name="categorias" placeholder="Categoria1, Categoria2...">
    
            <label for="descripcion">Descripción</label>
            <textarea type="text" id="descripcion" name="descripcion" placeholder="Incluye más detalles para tu producto"></textarea>


        </form>
    </section>
    <section class="bordered-container">
     <button class="add">+</button>
        <h3>Fotos</h3>
       
        <div class="fotos">
        </div>
    </section>
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel", "stylesheet")
        link.setAttribute("href", "../src/components/formularioProducto/formularioProducto.component.css")
        shadow.appendChild(link)
    }

    #addPublicarHandler(shadow) {

        const section = document.querySelector('#dinamic-content')
        const btnSave = document.querySelector('#save-producto')

        btnSave.addEventListener('click', async () => {

            //obtener datos de producto
            const form = shadow.querySelector('form')
            const nombre = form.nombre.value
            const precio = form.precio.value
            const cantidad = form.cantidad.value
            const categorias = form.categorias.value.split(',') 
            const descripcion = form.descripcion.value

            //Guardar producto
            const productoService = new ProductoService()
            const usuarioId=JwtService.decode(LocalStorageService.getItem('jwt')).id

            const producto= new Producto(usuarioId,nombre,["ejemplo","ejemplo2"],precio,cantidad,descripcion,categorias)    
                 
            const respuesta = await productoService.addProductos(producto)
            console.log('respuesta: ',respuesta);

            //Para cambiar a la lista de productos
            btnSave.setAttribute('id', "add-producto")
            btnSave.textContent = 'añadir producto'
            section.innerHTML = '';
            const listaProductos = document.createElement('lista-productos')
            section.appendChild(listaProductos)
        })

    }

    #addFotoHandler(shadow) {
        const fotosDiv = shadow.querySelector('.fotos');
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*'; // Solo acepta archivos de imagen
        input.style.display = 'none'; // Oculta el input
        fotosDiv.appendChild(input); // Añade el input al div fotos

        const addButton = shadow.querySelector('.add');
        addButton.addEventListener('click', () => {
            input.click(); // Abre el explorador de archivos al hacer clic en el botón
        });

        input.addEventListener('change', () => {
            const file = input.files[0]; // Obtiene el archivo seleccionado
            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file); // Lee el archivo como una URL
                reader.onload = () => {
                    const imgUrl = reader.result;
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    fotosDiv.appendChild(img); // Añade la imagen al div fotos
                };
            }
        });
    }
}