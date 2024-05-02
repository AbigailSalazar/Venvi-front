
export class UsuarioConfig extends HTMLElement{

    constructor() {
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode:"open"})
        this.#agregarEstilo(shadow)
        this.#render(shadow)
        this.#agregarClickHandler()
    }

    #render(shadow) {
        const btn = document.querySelector('#add-producto')
        btn.remove()
        shadow.innerHTML += `
        <form>
        <div class="info">
        <h3>Configuración de la cuenta</h3>
        <div class="flex">
            <img id="foto" src="https://placehold.co/172x172?text=image-user">
            <div class="grid">
                <div class="inputContainer half">
                    <label>Nombre completo</label>
                    <input type="text" id="nombre">
                </div>
                <div class="inputContainer half">
                    <label>Email</label>
                    <input type="text" id="email" disabled>
                </div>
                <button id="save-name">Guardar cambios</button>
            </div>
        </div>
    
    </div>
<div class="direccion">
<h3>Dirección</h3>
<div class="inputContainer half">
    <label>Calle</label>
    <input type="text" id="calle">
</div>
<div class="inputContainer half">
    <label>Número</label>
    <input type="number" id="number">
</div>
<div class="inputContainer">
    <label>País</label>
    <select id="pais">
        <!-- opciones del país -->
    </select>
</div>
<div class="inputContainer">
    <label>Estado</label>
    <select id="estado">
        <!-- opciones del estado -->
    </select>
</div>
<div class="inputContainer half">
    <label>Ciudad</label>
    <select id="ciudad">
        <!-- opciones de la ciudad -->
    </select>
</div>
<div class="inputContainer half">
    <label>Código postal</label>
    <input type="number" id="postal">
</div>
<button id="save-direccion">Guardar cambios</button>
</div>
<div class="password">
    <h3>Cambiar contraseña</h3>
    <div class="inputContainer">
        <label>Contraseña actual</label>
        <input type="text" id="contraseña-actual">
    </div>
    <div class="inputContainer">
        <label>Nueva contraseña</label>
        <input type="text" id="contraseña-nueva">
    </div>
    <div class="inputContainer">
        <label>Confirmar contraseña</label>
        <input type="text" id="contraseña-repetir">
    </div>
    <button id="contraseña">Cambiar contraseña</button>
</div>
</form>
        `
    }

    #agregarEstilo(shadow) {
        let link = document.createElement('link')
        link.setAttribute("rel","stylesheet")
        link.setAttribute("href","../src/components/usuarioConfig/usuarioConfig.component.css")
        shadow.appendChild(link)
    }

    #agregarClickHandler(){
      
    }


}