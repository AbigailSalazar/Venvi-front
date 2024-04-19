
const section = document.querySelector('#dinamic-content')
const btn = document.querySelector('#add-producto')

btn.addEventListener('click',()=>{
    btn.setAttribute('id',"save-producto")
    btn.textContent='Publicar producto'
    section.innerHTML='';
    const formulario = document.createElement('form-producto')
    section.appendChild(formulario)
})
