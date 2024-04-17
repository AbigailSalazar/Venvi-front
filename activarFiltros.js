
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


    // Agregar filter-tag al contenedor de filtros activos


});
