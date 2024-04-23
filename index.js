import { CategoriaService } from "./src/services/categorias.service.js";
import { ProductoService } from "./src/services/productos.service.js"

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
btnAplicarFiltros.addEventListener('click', () => {
    // Obtener valores de los filtros de precio

    const activeFilters = document.querySelector('#filters');
    activeFilters.innerHTML = '';

    const precioMin = document.querySelector('#min-precio').value;
    const precioMax = document.querySelector('#max-precio').value;

    
    const categoriaSelected = document.querySelectorAll('input[name="categoria"]:checked')
    console.log('Categoría selected: ',categoriaSelected);
    if(categoriaSelected.length>0){
        const categoriaFilter = document.createElement('filter-tag');
        categoriaFilter.setAttribute("name",categoriaSelected[0].value)
        activeFilters.appendChild(categoriaFilter);
        console.log('Añadiendo categoria filtro');
    }

    const precioSelected = document.querySelectorAll('input[name="precio"]:checked')
    if(precioSelected.length>0){
        const precioFilter = document.createElement('filter-tag');
        precioFilter.setAttribute("name",precioSelected[0].value)
        activeFilters.appendChild(precioFilter);
        console.log('Añadiendo precio filtro');
    }

    if (precioMin > 0 || precioMax > 0) {
        const rangoFilter = document.createElement('filter-tag');
        rangoFilter.setAttribute("name",`${precioMin}$ - ${precioMax}$`)
        activeFilters.appendChild(rangoFilter)
        console.log('Añadiendo rango filtro');
    }

});


//obtener productos de servicio y agregarlos
const sectionProductos = document.getElementById('productos')
const lblnResultados = document.getElementById('n-resultados')

const productoService = new ProductoService()
const productos = await productoService.getProductos()

//mostrar num de resultados
lblnResultados.innerHTML=`<strong>${productos.length}</strong> &nbsp;Resultados`

productos.map((producto)=>{
    const productoElement = document.createElement('producto-info')
    productoElement.setAttribute('id',producto._id)
    productoElement.setAttribute('nombre',producto.nombre)
    productoElement.setAttribute('precio',producto.precio)
    productoElement.setAttribute('foto',"") //TODO: obtener foto

    sectionProductos.appendChild(productoElement)
})

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