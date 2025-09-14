// Precios de productos
const productos = {
    fruit1: { nombre: "Manzanas Fuji", precio: 1200 },
    fruit2: { nombre: "Naranjas Valencianas", precio: 1000 },
    fruit3: { nombre: "Plátanos Cavendish", precio: 800 },
    verdura1: { nombre: "Zanahorias orgánicas", precio: 900 },
    verdura2: { nombre: "Espinacas frescas", precio: 700 },
    verdura3: { nombre: "Pimientos tricolores", precio: 1500 },
    organicproduct1: { nombre: "Miel organica", precio: 5000 }
};

// Obtener carrito desde localStorage
function getCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar carrito
function saveCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Añadir producto al carrito
function addToCarrito(id, cantidad) {
    let carrito = getCarrito();
    const producto = productos[id];

    if (!producto) return;

    const index = carrito.findIndex(item => item.id === id);

    if (index >= 0) {
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push({ id, nombre: producto.nombre, cantidad, precio: producto.precio });
    }

    saveCarrito(carrito);
    renderCarrito(); // Actualiza modal
}

// Cambiar cantidad (+ o -)
function cambiarCantidad(id, delta) {
    let carrito = getCarrito();
    const index = carrito.findIndex(item => item.id === id);

    if (index >= 0) {
        carrito[index].cantidad += delta;

        if (carrito[index].cantidad <= 0) {
            carrito.splice(index, 1); // elimina si llega a 0
        }
    }

    saveCarrito(carrito);
    renderCarrito();
}

// Eliminar un producto por completo
function eliminarDelCarrito(id) {
    let carrito = getCarrito().filter(item => item.id !== id);
    saveCarrito(carrito);
    renderCarrito();
}

// Vaciar todo el carrito (opcional, por si quieres un botón global)
function vaciarCarrito() {
    saveCarrito([]);
    renderCarrito();
}

// Renderizar carrito en el modal
function renderCarrito() {
    const carrito = getCarrito();
    const lista = document.getElementById("carrito-lista");
    const totalEl = document.getElementById("carrito-total");

    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = `<li class="list-group-item text-center">Tu carrito está vacío</li>`;
        totalEl.textContent = "$0";
        return;
    }

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>${item.nombre}</strong><br>
                    <small>$${item.precio} c/u</small>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary me-1" onclick="cambiarCantidad('${item.id}', -1)">-</button>
                    <span class="mx-1">${item.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary ms-1" onclick="cambiarCantidad('${item.id}', 1)">+</button>
                    <button class="btn btn-sm btn-danger ms-2" onclick="eliminarDelCarrito('${item.id}')">x</button>
                </div>
            </li>
        `;
    });

    totalEl.textContent = `$${total}`;
}

// Inicializa el render al cargar la página
document.addEventListener("DOMContentLoaded", renderCarrito);
