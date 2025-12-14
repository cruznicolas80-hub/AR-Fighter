console.log("SCRIPT.JS OK");

// ---------------- CARRO / LOCALSTORAGE ----------------

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const URL_BASE = window.location.origin + window.location.pathname.replace("tienda.html", "");

// Guarda carrito y actualiza numerito del navbar
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarritoUI();
}

// Actualiza "carrito-count" en todas las páginas
function actualizarCarritoUI() {
    const span = document.getElementById("carrito-count");
    if (!span) return;

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    span.textContent = totalItems;
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {
    const existente = carrito.find(p => p.id === producto.id);

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    mostrarPopupCarrito(producto.title);
}

// Popup verde “Producto agregado”
function mostrarPopupCarrito(nombreProducto) {
    const popup = document.getElementById("popup-carrito");
    if (!popup) return;

    popup.textContent = `${nombreProducto} agregado al carrito`;

    popup.classList.remove("show");
    void popup.offsetWidth;
    popup.classList.add("show");

    setTimeout(() => popup.classList.remove("show"), 1800);
}

// Al cargar cualquier página, actualizamos el numerito
actualizarCarritoUI();


// ---------------- DATA + HELPERS (DISPONIBLE PARA TODAS LAS PÁGINAS) ----------------

const productosBase = [
    { id: 1, title: "F-16 Fighting Falcon", description: "Caza ligero multipropósito, rápido y maniobrable.", price: 150000, thumbnail: "img/f16.png", tipo: "Caza", escala: "1:72" },
    { id: 2, title: "F/A-18 Hornet", description: "Avión embarcado de gran rendimiento y precisión.", price: 185000, thumbnail: "img/f18.png", tipo: "Caza", escala: "1:48" },
    { id: 3, title: "F-22 Raptor", description: "Caza de quinta generación con tecnología stealth.", price: 250000, thumbnail: "img/f22.png", tipo: "Caza", escala: "1:72" },
    { id: 4, title: "F-35 Lightning II", description: "Avión furtivo de ataque y defensa de última generación.", price: 290000, thumbnail: "img/f35.png", tipo: "Ataque", escala: "1:48" },
    { id: 5, title: "A-10 Thunderbolt II", description: "Avión de ataque terrestre especializado en apoyo aéreo cercano.", price: 160000, thumbnail: "img/a10.png", tipo: "Ataque", escala: "1:32" },
    { id: 6, title: "F-15 Eagle", description: "Caza de superioridad aérea de alta velocidad.", price: 170000, thumbnail: "img/f15.png", tipo: "Caza", escala: "1:72" }
];

function crearCardProducto(producto) {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
    <div class="card card-producto h-100">
      <img
        src="${producto.thumbnail}"
        class="card-img-top img-fluid img-producto"
        alt="${producto.title}"
      >
      <div class="card-body d-flex flex-column text-center">
        <h5 class="card-title">${producto.title}</h5>
        <p class="card-text text-muted">${producto.description}</p>
        <p class="precio fw-bold">$ ${producto.price.toLocaleString("es-AR")}</p>

        <button
          class="btn btn-primary agregar-carrito mt-auto"
          data-id="${producto.id}"
          data-nombre="${producto.title}"
          data-precio="${producto.price}"
          data-img="${producto.thumbnail}">
          Agregar al carrito
        </button>
      </div>
    </div>
  `;
    return col;
}


function renderListaProductos(contenedor, lista) {
    if (!contenedor) return;
    contenedor.innerHTML = "";
    lista.forEach(p => contenedor.appendChild(crearCardProducto(p)));
}


// ---------------- TIENDA.HTML ----------------

if (window.location.pathname.includes("tienda.html")) {
    const contenedorProductos = document.getElementById("product-list");
    const contadorProductosSpan = document.getElementById("contador-productos");
    const selectOrdenar = document.getElementById("ordenar");
    const btnAplicarFiltros = document.getElementById("btn-aplicar-filtros");

    let productosActuales = [...productosBase];

    function mostrarProductos(lista) {
        renderListaProductos(contenedorProductos, lista);
        if (contadorProductosSpan) {
            contadorProductosSpan.textContent = `Mostrando ${lista.length} de ${productosBase.length} modelos`;
        }
    }

    function aplicarFiltrosYOrdenamiento() {
        let listaFiltrada = [...productosBase];

        const tiposSeleccionados = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
            .map(input => input.id);

        const escalaSeleccionada = document.getElementById("filtro-escala")?.value || "";

        if (tiposSeleccionados.length > 0) {
            listaFiltrada = listaFiltrada.filter(p => tiposSeleccionados.includes(p.tipo.toLowerCase()));
        }

        if (escalaSeleccionada) {
            listaFiltrada = listaFiltrada.filter(p => p.escala === escalaSeleccionada);
        }

        const orden = selectOrdenar?.value || "relevancia";
        if (orden === "precio_asc") listaFiltrada.sort((a, b) => a.price - b.price);
        if (orden === "precio_desc") listaFiltrada.sort((a, b) => b.price - a.price);

        productosActuales = listaFiltrada;
        mostrarProductos(productosActuales);
    }

    btnAplicarFiltros?.addEventListener("click", aplicarFiltrosYOrdenamiento);
    selectOrdenar?.addEventListener("change", aplicarFiltrosYOrdenamiento);

    mostrarProductos(productosActuales);
}


// ---------------- HOME: PRODUCTOS DESTACADOS ----------------

if (
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/" ||
    window.location.pathname === ""
) {
    const contenedorDestacados = document.getElementById("destacados-list");
    if (contenedorDestacados) {
        const destacadosIds = [1, 2, 3, 5];
        const productosDestacados = productosBase.filter(p => destacadosIds.includes(p.id));

        // Render
        renderListaProductos(contenedorDestacados, productosDestacados);
    }
}


// ---------------- EVENTO GLOBAL: AGREGAR AL CARRITO ----------------

document.addEventListener("click", e => {
    const btn = e.target.closest(".agregar-carrito");
    if (!btn) return;

    const producto = {
        id: parseInt(btn.dataset.id),
        title: btn.dataset.nombre,
        price: parseInt(btn.dataset.precio),
        thumbnail: btn.dataset.img
    };

    agregarAlCarrito(producto);
});

// ---------------- CARRITO.HTML: POPUP COMPRA CENTRADO ----------------
if (window.location.pathname.includes("carrito.html")) {
    const btnComprar = document.getElementById("btn-comprar");
    const popup = document.getElementById("popup-compra");
    const btnCerrar = document.getElementById("cerrar-popup");

    if (btnComprar && popup && btnCerrar) {
        btnComprar.addEventListener("click", () => {
            popup.classList.add("show");
        });

        btnCerrar.addEventListener("click", () => {
            popup.classList.remove("show");
        });

        // Cerrar haciendo click fuera del cuadro
        popup.addEventListener("click", e => {
            if (e.target === popup) {
                popup.classList.remove("show");
            }
        });
    }
}
