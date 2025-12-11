// --- Referencias a elementos ---
const lista = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("carrito-total");
const vacioDiv = document.getElementById("carrito-vacio");
const contenidoDiv = document.getElementById("carrito-contenido");
const btnVaciar = document.getElementById("btn-vaciar");

// --- Render del carrito ---
function renderCarrito() {
  lista.innerHTML = "";

  if (carrito.length === 0) {
    vacioDiv.classList.remove("d-none");
    contenidoDiv.classList.add("d-none");
    totalSpan.textContent = "$0";
    actualizarCarritoUI();
    return;
  }

  vacioDiv.classList.add("d-none");
  contenidoDiv.classList.remove("d-none");

  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";

    const subtotal = item.price * item.cantidad;
    total += subtotal;

    li.innerHTML = `
      <div class="d-flex align-items-center gap-3">
        <img src="${item.thumbnail}" class="img-carrito" alt="${item.title}">
        <div>
          <strong>${item.title}</strong><br>
          <small>$${item.price} c/u</small>
        </div>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-sm btn-outline-secondary btn-restar" data-id="${item.id}">−</button>
        <span class="fw-bold">${item.cantidad}</span>
        <button class="btn btn-sm btn-outline-secondary btn-sumar" data-id="${item.id}">+</button>

        <button class="btn btn-sm btn-outline-danger btn-eliminar ms-2" data-id="${item.id}">🗑️</button>

        <span class="fw-semibold ms-3">$${subtotal}</span>
      </div>
    `;

    lista.appendChild(li);
  });

  // --- Eventos de sumar/restar/eliminar ---
  document.querySelectorAll(".btn-sumar").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const item = carrito.find(p => p.id === id);
      item.cantidad++;
      guardarCarrito();
      renderCarrito();
    });
  });

  document.querySelectorAll(".btn-restar").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const item = carrito.find(p => p.id === id);

      if (item.cantidad > 1) {
        item.cantidad--;
      } else {
        carrito = carrito.filter(p => p.id !== id);
      }
      guardarCarrito();
      renderCarrito();
    });
  });

  document.querySelectorAll(".btn-eliminar").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      carrito = carrito.filter(p => p.id !== id);
      guardarCarrito();
      renderCarrito();
    });
  });

  totalSpan.textContent = "$" + total;
  actualizarCarritoUI();
}

// --- Vaciar carrito ---
btnVaciar.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  renderCarrito();
});

// Primera llamada al cargar carrito.html
renderCarrito();
