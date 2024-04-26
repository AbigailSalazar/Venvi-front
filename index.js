import { CategoriaService } from "./src/services/categorias.service.js";
import { ProductoService } from "./src/services/productos.service.js"

document.addEventListener('DOMContentLoaded', async () => {
    
    const sectionProductos = document.getElementById('productos')
    const lblnResultados = document.getElementById('n-resultados')

    const productoService = new ProductoService()

    cargarTodosProductos()

    const inputPrecioMin = document.querySelector('#min-precio');
    const inputPrecioMax = document.querySelector('#max-precio');

    inputPrecioMin.addEventListener('input', desactivarRadioButtons);
    inputPrecioMax.addEventListener('input', desactivarRadioButtons);

    function desactivarRadioButtons() {
        const radioButtonsPrecio = document.querySelectorAll('input[name="precio"]');
        const desactivar = inputPrecioMin.value !== '' || inputPrecioMax.value !== '';

        radioButtonsPrecio.forEach(radioButton => {
            radioButton.disabled = desactivar;
        });
    }


    const btnAplicarFiltros = document.querySelector('#aplicar-filtros');

    // Agregar evento al hacer clic en el botón de aplicar filtros
    btnAplicarFiltros.addEventListener('click', async () => {
        // Obtener valores de los filtros de precio

        const activeFilters = document.querySelector('#filters');
        activeFilters.innerHTML = '';

        const precioMin = document.querySelector('#min-precio').value;
        const precioMax = document.querySelector('#max-precio').value;
        const productos=[]
        let filtrosSelec=0

        const categoriaSelected = document.querySelectorAll('input[name="categoria"]:checked')
        console.log('Categoría selected: ', categoriaSelected);
        if (categoriaSelected.length > 0) {
            const categoriaFilter = document.createElement('filter-tag');
            categoriaFilter.setAttribute("name", categoriaSelected[0].value)
            activeFilters.appendChild(categoriaFilter);

            console.log('Añadiendo categoria filtro');

            const productosByCategoria = await productoService.getProductosByCategoria(categoriaSelected[0].value)
            productos.push(...productosByCategoria)
            filtrosSelec++
        }

        const precioSelected = document.querySelectorAll('input[name="precio"]:checked')
        if (precioSelected.length > 0) {
            const precioFilter = document.createElement('filter-tag');
            precioFilter.setAttribute("name", precioSelected[0].value)
            activeFilters.appendChild(precioFilter);
            console.log('Añadiendo precio filtro');
            filtrosSelec++
            //TODO: buscar y añadir productos al arreglo
        }

        if (precioMin > 0 || precioMax > 0) {
            const rangoFilter = document.createElement('filter-tag');
            rangoFilter.setAttribute("name", `${precioMin}$ - ${precioMax}$`)
            activeFilters.appendChild(rangoFilter)
            console.log('Añadiendo rango filtro');
            filtrosSelec++
            //TODO: buscar y añadir productos al arreglos
        }

        if(filtrosSelec>0){
            renderProductos(productos)
        }
        else{
            cargarTodosProductos()
        }
        
    });

   

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
