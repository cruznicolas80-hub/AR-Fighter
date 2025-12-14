console.log("SCRIPT.JS OK");
console.log("main.js conectado");

// ---------------- CARRO / LOCALSTORAGE ----------------

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

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
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  guardarCarrito();
  mostrarPopupCarrito(producto.title);
}

// Popup verde “Producto agregado”
function mostrarPopupCarrito(nombreProducto) {
  const existente = document.querySelector(".popup-carrito");
  if (existente) existente.remove();

  const popup = document.createElement("div");
  popup.className = "popup-carrito";
  popup.textContent = `${nombreProducto} agregado al carrito`;

  document.body.appendChild(popup);

  // Forzar reflujo para que la transición funcione
  void popup.offsetWidth;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => popup.remove(), 400);
  }, 1800);
}

// Al cargar cualquier página, actualizamos el numerito
actualizarCarritoUI();

// ---------------- TIENDA.HTML ----------------

if (window.location.pathname.includes("tienda.html")) {
  const contenedorProductos = document.getElementById("product-list");

  const productos = [
    {
      id: 1,
      title: "F-16 Fighting Falcon",
      description: "Caza ligero multipropósito, rápido y maniobrable.",
      price: 150000,
      thumbnail: "img/f16.png"
    },
    {
      id: 2,
      title: "F/A-18 Hornet",
      description: "Avión embarcado de gran rendimiento y precisión.",
      price: 185000,
      thumbnail: "img/f18.png"
    },
    {
      id: 3,
      title: "F-22 Raptor",
      description: "Caza de quinta generación con tecnología stealth.",
      price: 250000,
      thumbnail: "img/f22.png"
    },
    {
      id: 4,
      title: "F-35 Lightning II",
      description: "Avión furtivo de ataque y defensa de última generación.",
      price: 290000,
      thumbnail: "img/f35.png"
    },
    {
      id: 5,
      title: "A-10 Thunderbolt II",
      description: "Avión de ataque terrestre especializado en apoyo aéreo cercano.",
      price: 160000,
      thumbnail: "img/a10.png"
    },
    {
      id: 6,
      title: "F-15 Eagle",
      description: "Caza de superioridad diseñado para la interceptación de alta velocidad.",
      price: 160000,
      thumbnail: "img/f15.png"
    }
  ];

  function crearCardProducto(producto) {
    const col = document.createElement("div");
    col.className = "col-12  col-md-6 col-lg-4";

    col.innerHTML = `
      <div class="card h-100">
        <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${producto.title}</h5>
          <p class="card-text">${producto.description}</p>
          <p class="fw-bold mb-3">$ ${producto.price.toLocaleString("es-AR")}</p>

          <button 
            class="btn btn-primary mt-auto agregar-carrito"
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

  function mostrarProductos(lista) {
    contenedorProductos.innerHTML = "";
    lista.forEach(producto => {
      const card = crearCardProducto(producto);
      contenedorProductos.appendChild(card);
    });
  }

  mostrarProductos(productos);
}

// ---------------- EVENTO GLOBAL: AGREGAR AL CARRITO ----------------

document.addEventListener("click", e => {
  if (e.target.classList.contains("agregar-carrito")) {
    const btn = e.target;

    const producto = {
      id: parseInt(btn.dataset.id),
      title: btn.dataset.nombre,
      price: parseInt(btn.dataset.precio),
      thumbnail: btn.dataset.img
    };

    agregarAlCarrito(producto);
  }
});


const btnComprar = document.getElementById("btn-comprar");

if (btnComprar) {
  btnComprar.addEventListener("click", () => {
    if (carrito.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    alert("Gracias por tu compra 🚀\nPróximamente checkout real.");
  });
}
