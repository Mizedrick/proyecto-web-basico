// Catálogo de materias
const catalogo = [
    { id: 1, nombre: "Cálculo I", semestre: 1, creditos: 4, precio: 500000 },
    { id: 2, nombre: "Programación I", semestre: 1, creditos: 3, precio: 450000 },
    { id: 3, nombre: "Estructuras de Datos", semestre: 3, creditos: 4, precio: 600000 },
    { id: 4, nombre: "Bases de Datos", semestre: 4, creditos: 3, precio: 550000 },
    { id: 5, nombre: "Ingeniería de Software", semestre: 5, creditos: 3, precio: 650000 }
];

let carrito = [];

const grid = document.getElementById("gridMaterias");
const buscador = document.getElementById("buscador");
const total = document.getElementById("total");
const filtradas = document.getElementById("filtradas");

// Render dinámico
function renderMaterias(lista) {
    grid.innerHTML = "";

    lista.forEach(materia => {
        grid.innerHTML += `
            <div class="card">
                <h3>${materia.nombre}</h3>
                <p>Semestre: ${materia.semestre}</p>
                <p>Créditos: ${materia.creditos}</p>
                <p>Valor: $${materia.precio.toLocaleString()}</p>
                <button onclick="comprarMateria(${materia.id})">Agregar al carrito</button>
            </div>
        `;
    });

    filtradas.textContent = lista.length;
    console.log("Materias renderizadas:", lista);
}

// KPIs iniciales
total.textContent = catalogo.length;
filtradas.textContent = catalogo.length;

// Buscador en tiempo real
buscador.addEventListener("input", () => {
    const texto = buscador.value.toLowerCase();

    const resultado = catalogo.filter(materia =>
        materia.nombre.toLowerCase().includes(texto) ||
        materia.semestre.toString().includes(texto)
    );

    renderMaterias(resultado);
});

// Agregar al carrito
function comprarMateria(id) {
    const materia = catalogo.find(m => m.id === id);

    // Evitar duplicados
    if (!carrito.some(m => m.id === id)) {
        carrito.push(materia);
        console.log("Materia agregada al carrito:", materia);
        alert("Agregaste: " + materia.nombre);
    } else {
        alert("La materia ya está en el carrito.");
    }
}

// Ver carrito
function verCarrito() {

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = "Materias en el carrito:\n\n";
    let totalPagar = 0;

    carrito.forEach(materia => {
        mensaje += `${materia.nombre} - $${materia.precio.toLocaleString()}\n`;
        totalPagar += materia.precio;
    });

    mensaje += `\nTotal a pagar: $${totalPagar.toLocaleString()}`;

    console.log("Carrito actual:", carrito);
    alert(mensaje);
}

// Botones
function mostrarTodas() {
    renderMaterias(catalogo);
}

function limpiarBuscador() {
    buscador.value = "";
    renderMaterias(catalogo);
}

// Render inicial
renderMaterias(catalogo);

console.log("Sistema con carrito cargado correctamente");