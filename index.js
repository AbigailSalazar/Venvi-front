import { LocalStorageService } from "./src/services/LocalStorage.service.js";
import { CategoriaService } from "./src/services/categorias.service.js";
import { ProductoService } from "./src/services/productos.service.js"

document.addEventListener('DOMContentLoaded', async () => {
    
    const sectionProductos = document.getElementById('productos')
    const lblnResultados = document.getElementById('n-resultados')
    const inputPrecioMin = document.querySelector('#min-precio');
    const inputPrecioMax = document.querySelector('#max-precio');

    const productoService = new ProductoService()

    cargarTodosProductos()



    inputPrecioMin.addEventListener('input', desactivarRadioButtons);
    inputPrecioMax.addEventListener('input', desactivarRadioButtons);

    function desactivarRadioButtons() {
        const radioButtonsPrecio = document.querySelectorAll('input[name="precio"]');
        const desactivar = inputPrecioMin.value !== '' || inputPrecioMax.value !== '';

        radioButtonsPrecio.forEach(radioButton => {
            radioButton.disabled=desactivar
            radioButton.checked=!desactivar
        });
    }


    const btnAplicarFiltros = document.querySelector('#aplicar-filtros');

    // Agregar evento al hacer clic en el botón de aplicar filtros
    btnAplicarFiltros.addEventListener('click', aplicarFiltros);   
    //obtener categorias

    const categoriaService = new CategoriaService();

    // Obtener la lista de categorías
    categoriaService.getCategorias().then(categorias => {
        const categoriaList = document.querySelector('.categoria-list');
        categoriaList.innerHTML = '';

        categorias.forEach(categoria => {
            const li = document.createElement('li');
            const input = document.createElement('input');
            input.type = 'radio';
            input.id = categoria.nombre;
            input.name = 'categoria';
            input.value = categoria.nombre;
            const label = document.createElement('label');
            label.htmlFor = categoria.nombre;
            label.textContent = categoria.nombre;

            li.appendChild(input);
            li.appendChild(label);
            categoriaList.appendChild(li);
        });
    });

    async function aplicarFiltros(){
        
        const activeFilters = document.querySelector('#filters');
        activeFilters.innerHTML = '';

        var precioMin =inputPrecioMin.value;
        var precioMax = inputPrecioMax.value;
        let filtrosSelec=0

        const categoriaSelected = document.querySelectorAll('input[name="categoria"]:checked')
        console.log('Categoría selected: ', categoriaSelected);
        if (categoriaSelected.length > 0) {
            const categoriaFilter = document.createElement('filter-tag');
            categoriaFilter.setAttribute("name", categoriaSelected[0].value)
            categoriaFilter.classList.add('categoria')
            activeFilters.appendChild(categoriaFilter);

            filtrosSelec++
        }
   
        if (precioMin > 0 || precioMax > 0) {
            const rangoFilter = document.createElement('filter-tag');
            rangoFilter.setAttribute("name", `${precioMin}$ - ${precioMax}$`)
            activeFilters.appendChild(rangoFilter)
            rangoFilter.classList.add('rango')
            filtrosSelec++
        }
    
        const precioSelected = document.querySelectorAll('input[name="precio"]:checked')
        if (precioSelected.length > 0) {
            const precioFilter = document.createElement('filter-tag');
            precioFilter.setAttribute("name", precioSelected[0].value)
            precioFilter.classList.add('precio')
            activeFilters.appendChild(precioFilter);
            precioMax=precioSelected[0].value
            filtrosSelec++
        }
        
        const nombreBuscado = LocalStorageService.getItem('search')
        if(filtrosSelec>0||nombreBuscado){
            
            console.log('nombre buscado:'+nombreBuscado);
            const productos= await productoService.buscarProducto(
                nombreBuscado,
                categoriaSelected[0]?categoriaSelected[0].value:null,
                precioMin,
                precioMax)
            renderProductos(productos)
        }
        else{
            cargarTodosProductos()
        }
    }

    async function cargarTodosProductos(){
        const productosAnteriores= document.querySelectorAll('producto-info')
            productosAnteriores.forEach(productoElement=>(productoElement.remove()))
        const productos = await productoService.getProductos()

        //mostrar num de resultados
        lblnResultados.innerHTML = `<strong>${productos.length}</strong> &nbsp;Resultados`
    
       renderProductos(productos)
    }

    function renderProductos(productos) {
        //mostrar num de resultados
        if(productos){
            lblnResultados.innerHTML = `<strong>${productos.length}</strong> &nbsp;Resultados`
        const productosAnteriores= document.querySelectorAll('producto-info')
            productosAnteriores.forEach(productoElement=>(productoElement.remove()))
            
            for(const producto of productos){
                const productoElement = document.createElement('producto-info')
                productoElement.setAttribute('id', producto._id)
                productoElement.setAttribute('nombre', producto.nombre)
                productoElement.setAttribute('precio', producto.precio)
                productoElement.setAttribute('foto', producto.fotos[0]) //TODO: obtener foto
    
                sectionProductos.appendChild(productoElement)
            }
        }
        else{
            lblnResultados.innerHTML = `<strong>0</strong> &nbsp;Resultados`
        }

    }
})
