import { Producto } from "../../objects/Producto.js"
import { CategoriaProducto } from "../../objects/CategoriaProducto.js"
import { LocalStorageService } from "../../services/LocalStorage.service.js"
import { CategoriaService } from "../../services/categorias.service.js"
import { JwtService } from "../../services/jwt.service.js"
import { ProductoService } from "../../services/productos.service.js"

export class FormularioProducto extends HTMLElement {

    constructor() {
        super()
        this.productoService = new ProductoService()
        this.categoriaService = new CategoriaService();

    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" })
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#addPublicarHandler(shadow)
    }

    async #render(shadow) {
        //cargar info producto para editar
        const idProducto = this.getAttribute('idProducto')
        let producto
        if (idProducto) {
            producto = await this.productoService.getById(idProducto)
        }


        shadow.innerHTML += `
        <section class="bordered-container">
        <h3>Nuevo producto</h3>
    
        <form>
            <label>Nombre</label>
            <input type="text" name="nombre"  id="nombre" placeholder="Nombra tu producto"  required value="${producto ? producto.nombre : ""}">

            <div class="divided">
            <div class="campo">
                <label for="cantidad">Cantidad</label>
                <input type="number" id="cantidad" name="cantidad" min="0" placeholder="0" required value="${producto ? producto.cantidadDisponible : 0}">
            </div>
            <div class="campo">
                <label for="precio">Precio</label>
                    <input id="precio" name="precio" type="number" min="0" required value="${producto ? producto.precio : 0}">
            </div>
                   
                    
            </div>
            <label for="categorias">Categorias</label>
            <input type="text"  id="categorias" name="categorias" placeholder="Categoria1, Categoria2...">
    
            <label for="descripcion">Descripción</label>
            <textarea type="text" id="descripcion" name="descripcion" placeholder="Incluye más detalles para tu producto" required>${producto ? producto.descripcion : ""}</textarea>


        </form>
    </section>
    <section class="bordered-container">
     <button class="add">+</button>
        <h3>Fotos</h3>
       
        <div class="fotos">
        </div>
    </section>
        `
        this.#addFotoHandler(shadow)
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
            const idProducto = this.getAttribute('idProducto')

            //obtener datos de producto
            const form = shadow.querySelector('form')
            const nombre = form.nombre.value
            const precio = form.precio.value
            const cantidad = form.cantidad.value
            const categorias = form.categorias.value.split(',')
            const descripcion = form.descripcion.value
            
            const usuarioId = JwtService.decode(LocalStorageService.getItem('jwt')).id

            //Crear categorias
            const categoriasObjetos=[]
            for(const categoria of categorias){
                const objCategoria = await this.categoriaService.addCategoria(new CategoriaProducto(categoria,categoria))
                categoriasObjetos.push(objCategoria)
            }

            console.log("categorias guardadas: ",categoriasObjetos);

            const producto = new Producto(usuarioId, nombre, ["ejemplo", "ejemplo2"], precio, cantidad, descripcion, categoriasObjetos)
            if (idProducto) {//Se esta editando
                const respuesta = await this.productoService.editById(idProducto,producto)
                console.log('respuesta: ', respuesta);
            }
            else {
                //Guardar producto
                const respuesta = await this.productoService.addProductos(producto)
                console.log('respuesta: ', respuesta);
            }

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