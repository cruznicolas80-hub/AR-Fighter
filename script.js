console.log("SCRIPT.JS OK");
console.log("main.js conectado");

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
            description: "Caza de superioridad aérea de alta velocidad.",
            price: 170000,
            thumbnail: "img/f15.png"
        }
    ];

    function crearCardProducto(producto) {
        const col = document.createElement("div");
        
        // MODIFICACIÓN CLAVE: Usamos las clases de Bootstrap para 3 cards por fila (col-lg-4)
        // col-12: 1 por fila en móviles
        // col-md-6: 2 por fila en tabletas
        // col-lg-4: 3 por fila en escritorio
        col.className = "col-12 col-md-6 col-lg-4"; 

        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                
                <div class="card-body d-flex flex-column text-center">
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
            contenedorProductos.appendChild(crearCardProducto(producto));
        });
    }

    mostrarProductos(productos);
}