import { Navbar } from "./src/components/navbar/navbar.component.js";
import { Producto } from "./src/components/producto/producto.component.js";
import { ProductoLista } from "./src/components/productoLista/productoLista.component.js";
import { UsuarioNavSettings } from "./src/components/usuarioaNavSettings/usuarioNavSettings.component.js";


window.customElements.define("nav-bar",Navbar)
window.customElements.define("producto-info",Producto)
window.customElements.define("settings-nav",UsuarioNavSettings)
window.customElements.define("producto-lista",ProductoLista)