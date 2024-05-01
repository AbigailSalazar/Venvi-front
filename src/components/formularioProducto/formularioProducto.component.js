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
        var categorias=""
        let producto
        if (idProducto) {
            producto = await this.productoService.getById(idProducto)
            if(producto.categorias){
                for(const categoria of producto.categorias){
                    categorias+=categoria.nombre+","
                }
            }
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
                <input type="number" id="cantidad" name="cantidadDisponible" min="0" placeholder="0" required value="${producto ? producto.cantidadDisponible : 0}">
            </div>
            <div class="campo">
                <label for="precio">Precio</label>
                    <input id="precio" name="precio" type="number" min="0" required value="${producto ? producto.precio : 0}">
            </div>
                   
                    
            </div>
            <label for="categorias">Categorias</label>
            <input type="text"  id="categorias" name="categorias" placeholder="Categoria1, Categoria2..." value="${categorias}">
    
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
        const idProducto = this.getAttribute('idProducto')
        const btnSaveChanges= document.createElement('button')
        const main = document.getElementsByTagName('main')
        btnSaveChanges.textContent = idProducto?'Guardar cambios':'publicar producto'
        main[0].appendChild(btnSaveChanges)

        const section = document.querySelector('#dinamic-content')

        btnSaveChanges.addEventListener('click', async () => {
          

            //obtener datos de producto
            const form = shadow.querySelector('form')
            const nombre = form.nombre.value
            const precio = form.precio.value
            const cantidad = form.cantidad.value
            const categorias = form.categorias.value.split(',')
            const descripcion = form.descripcion.value

            const usuarioId = JwtService.decode(LocalStorageService.getItem('jwt')).id

            //Crear categorias
            const categoriasObjetos = []
            for (const categoria of categorias) {
                const objCategoria = await this.categoriaService.addCategoria(new CategoriaProducto(categoria.toLowerCase(), categoria))
                categoriasObjetos.push(objCategoria)
            }

            const producto = new Producto(usuarioId, nombre, [], precio, cantidad, descripcion, categoriasObjetos)
            if (idProducto) {//Se esta editando
                console.log('Editando producto');
                this.mostrarLoadingdlg("Guardando cambios",shadow)
                const respuesta = await this.productoService.editById(idProducto, producto)
                console.log('respuesta: ', respuesta);
                //TODO: editar fotos
            }
            else {
                //Guardar producto
                this.mostrarLoadingdlg("Publicando producto",shadow)
                const respuesta = await this.productoService.addProductos(producto)

                console.log('respuesta: ', respuesta);
                const input = shadow.getElementById('fotos');
                //subir imagenes
                if (input.files&&respuesta) {   
                    const filesData = new FormData()
                    for (const file of input.files) {
                        filesData.append('fotos', file)
                      }
                    
                    const respuestaFotos = await this.productoService.addFotos(respuesta._id, filesData)
                }
            }
            //Para cambiar a la lista de productos
            section.innerHTML = '';
            const listaProductos = document.createElement('lista-productos')
            section.appendChild(listaProductos)
            btnSaveChanges.remove()
        })

    }

    mostrarLoadingdlg(titulo,shadow){
        const loadingdlg=document.createElement('loading-dlg')
        loadingdlg.setAttribute('titulo',titulo)
        shadow.appendChild(loadingdlg)
    }

    #addFotoHandler(shadow) {
        const fotosDiv = shadow.querySelector('.fotos');
        const input = document.createElement('input');
        input.id='fotos'
        input.name = 'fotos'
        input.type = 'file';
        input.accept = 'image/*'; // Solo acepta archivos de imagen
        input.style.display = 'none'; // Oculta el input

        const form = shadow.querySelector('form')
        form.append(input)
        //fotosDiv.appendChild(input); // Añade el input al div fotos

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