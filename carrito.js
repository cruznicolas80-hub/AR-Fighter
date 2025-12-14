// --- CARRITO.HTML ---

const lista = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("carrito-total");
const vacioDiv = document.getElementById("carrito-vacio");
const contenidoDiv = document.getElementById("carrito-contenido");
const btnVaciar = document.getElementById("btn-vaciar");

function formatoARS(num) {
  return "$" + Number(num).toLocaleString("es-AR");
}

function mostrarEstadoCarritoVacio() {
  vacioDiv.classList.remove("d-none");
  contenidoDiv.classList.add("d-none");
  totalSpan.textContent = formatoARS(0);
  actualizarCarritoUI();
}

function mostrarEstadoCarritoConItems() {
  vacioDiv.classList.add("d-none");
  contenidoDiv.classList.remove("d-none");
}

function renderCarrito() {
  if (!lista || !totalSpan || !vacioDiv || !contenidoDiv) return;

  lista.innerHTML = "";

  if (!carrito || carrito.length === 0) {
    mostrarEstadoCarritoVacio();
    return;
  }

  mostrarEstadoCarritoConItems();

  let total = 0;

  carrito.forEach((item) => {
    const subtotal = Number(item.price) * Number(item.cantidad);
    total += subtotal;

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img src="${item.thumbnail}" class="img-carrito" alt="${item.title}">
        <div>
          <strong>${item.title}</strong><br>
          <small>${formatoARS(item.price)} c/u</small>
        </div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary btn-restar" data-id="${item.id}" type="button">−</button>
        <span class="fw-bold">${item.cantidad}</span>
        <button class="btn btn-sm btn-outline-secondary btn-sumar" data-id="${item.id}" type="button">+</button>

        <button class="btn btn-sm btn-outline-danger btn-eliminar ms-2" data-id="${item.id}" type="button">🗑️</button>

        <span class="fw-semibold ms-3">${formatoARS(subtotal)}</span>
      </div>
    `;

    lista.appendChild(li);
  });

  totalSpan.textContent = formatoARS(total);
  actualizarCarritoUI();
}

// --- EVENTOS ---

lista?.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = Number(btn.dataset.id);
  if (!id) return;

  const item = carrito.find((p) => p.id === id);
  if (!item) return;

  if (btn.classList.contains("btn-sumar")) {
    item.cantidad++;
  }

  if (btn.classList.contains("btn-restar")) {
    if (item.cantidad > 1) item.cantidad--;
    else carrito = carrito.filter((p) => p.id !== id);
  }

  if (btn.classList.contains("btn-eliminar")) {
    carrito = carrito.filter((p) => p.id !== id);
  }

  guardarCarrito();
  renderCarrito();
});

// --- Vaciar carrito ---
btnVaciar?.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  renderCarrito();
});


renderCarrito();
