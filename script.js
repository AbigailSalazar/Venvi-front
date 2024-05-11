import { ErrorPage } from "./src/components/error/error.component.js";
import { FilterTag } from "./src/components/filterTag/filterTag.component.js";
import { FormularioProducto } from "./src/components/formularioProducto/formularioProducto.component.js";
import { ListaProductos } from "./src/components/listaProductos/listaProductos.component.js";
import { MensajeExito } from "./src/components/mensajeExito/mensajeExito.component.js";
import { Navbar } from "./src/components/navbar/navbar.component.js";
import { ErrorDialog } from "./src/components/popup/errordlg.component.js";
import { LoadingDlg } from "./src/components/popup/loading.component.js";
import { PopUp } from "./src/components/popup/popup.component.js";
import { Producto } from "./src/components/producto/producto.component.js";
import { ProductoCarrito } from "./src/components/productoCarrito/productoCarrito.component.js";
import { ProductoLista } from "./src/components/productoLista/productoLista.component.js";
import { UsuarioConfig } from "./src/components/usuarioConfig/usuarioConfig.component.js";
import { UsuarioNavSettings } from "./src/components/usuarioaNavSettings/usuarioNavSettings.component.js";


window.customElements.define("nav-bar",Navbar)
window.customElements.define("producto-info",Producto)
window.customElements.define("settings-nav",UsuarioNavSettings)
window.customElements.define("pop-up",PopUp)
window.customElements.define("producto-lista",ProductoLista)
window.customElements.define("lista-productos",ListaProductos)
window.customElements.define("filter-tag",FilterTag)
window.customElements.define("form-producto",FormularioProducto)
window.customElements.define("loading-dlg",LoadingDlg)
window.customElements.define("error-dlg",ErrorDialog)
window.customElements.define("user-settings",UsuarioConfig)
window.customElements.define("error-page",ErrorPage)
window.customElements.define("producto-carrito",ProductoCarrito)
window.customElements.define("exito-page",MensajeExito)