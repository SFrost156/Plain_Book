/* ============================================================
   CATEGORÍAS
============================================================ */
let categories = [
  "Artes",
  "Biografías y Estudios Literarios",
  "Ciencias de la Tierra y Medio Ambiente",
  "Computación y Tecnología",
  "Consulta e Investigación",
  "Deportes y Aire Libre",
  "Derecho",
  "Economía y Finanzas",
  "Estilos de Vida y Ocio",
  "Ficción",
  "Historia y Arqueología",
  "Infantiles y Juveniles"
];

/* ============================================================
   LIBROS — 1 POR CATEGORÍA
   AHORA TODAS LAS IMÁGENES SON LOCALES
============================================================ */
const books = [
  {
    title: "Historia del arte",
    author: "E. H. Gombrich",
    editorial: "Phaidon",
    year: 1995,
    format: "Tapa blanda",
    cover: "resources/portadas/lib1.png",
    price: 95000,
    discount: 10,
    stock: 100,
    category: "Artes"
  },
  {
    title: "Leonardo da Vinci",
    author: "Walter Isaacson",
    editorial: "Simon & Schuster",
    year: 2017,
    format: "Tapa dura",
    cover: "resources/portadas/lib2.png",
    price: 88000,
    discount: 5,
    stock: 100,
    category: "Biografías y Estudios Literarios"
  },
  {
    title: "Primavera silenciosa",
    author: "Rachel Carson",
    editorial: "Houghton Mifflin",
    year: 1962,
    format: "Tapa blanda",
    cover: "resources/portadas/lib3.png",
    price: 72000,
    discount: 15,
    stock: 100,
    category: "Ciencias de la Tierra y Medio Ambiente"
  },
  {
    title: "El mítico hombre-mes",
    author: "Fred P. Brooks Jr.",
    editorial: "Addison-Wesley",
    year: 1975,
    format: "Tapa blanda",
    cover: "resources/portadas/lib4.png",
    price: 110000,
    discount: 10,
    stock: 100,
    category: "Computación y Tecnología"
  },
  {
    title: "El arte de la investigación",
    author: "Wayne C. Booth",
    editorial: "University of Chicago Press",
    year: 2008,
    format: "Tapa blanda",
    cover: "resources/portadas/lib5.png",
    price: 65000,
    discount: 5,
    stock: 100,
    category: "Consulta e Investigación"
  },
  {
    title: "El nivel del juego",
    author: "John McPhee",
    editorial: "Farrar, Straus and Giroux",
    year: 1970,
    format: "Tapa blanda",
    cover: "resources/portadas/lib6.png",
    price: 56000,
    discount: 0,
    stock: 100,
    category: "Deportes y Aire Libre"
  },
  {
    title: "El espíritu de las leyes",
    author: "Montesquieu",
    editorial: "Penguin",
    year: 1748,
    format: "Tapa blanda",
    cover: "resources/portadas/lib7.png",
    price: 58000,
    discount: 10,
    stock: 100,
    category: "Derecho"
  },
  {
    title: "La riqueza de las naciones",
    author: "Adam Smith",
    editorial: "Penguin",
    year: 1776,
    format: "Tapa blanda",
    cover: "resources/portadas/lib8.png",
    price: 76000,
    discount: 0,
    stock: 100,
    category: "Economía y Finanzas"
  },
  {
    title: "Walden",
    author: "Henry David Thoreau",
    editorial: "Penguin",
    year: 1854,
    format: "Tapa blanda",
    cover: "resources/portadas/lib9.png",
    price: 48000,
    discount: 5,
    stock: 100,
    category: "Estilos de Vida y Ocio"
  },
  {
    title: "1984",
    author: "George Orwell",
    editorial: "Secker & Warburg",
    year: 1949,
    format: "Tapa blanda",
    cover: "resources/portadas/lib10.png",
    price: 69000,
    discount: 10,
    stock: 100,
    category: "Ficción"
  },
  {
    title: "Armas, gérmenes y acero",
    author: "Jared Diamond",
    editorial: "W. W. Norton & Company",
    year: 1997,
    format: "Tapa blanda",
    cover: "resources/portadas/lib11.png",
    price: 99000,
    discount: 15,
    stock: 100,
    category: "Historia y Arqueología"
  },
  {
    title: "El Principito",
    author: "Antoine de Saint-Exupéry",
    editorial: "Reynal & Hitchcock",
    year: 1943,
    format: "Tapa blanda",
    cover: "resources/portadas/lib12.png",
    price: 45000,
    discount: 0,
    stock: 100,
    category: "Infantiles y Juveniles"
  }
];

/* ============================================================
   DOM
============================================================ */
const categoryListEl = document.getElementById("categoryList");
const booksGridEl = document.getElementById("booksGrid");
const headerCategoryEl = document.getElementById("currentCategoryHeader");

const SEARCH_INPUT = document.getElementById("searchInput");
const SEARCH_INPUT_M = document.getElementById("searchInputMobile");

/* ============================================================
   UTILIDADES
============================================================ */
function formatPrice(n) {
  return "$ " + n.toLocaleString("es-CO");
}

function getFinalPrice(book) {
  return Math.round(book.price * (1 - (book.discount || 0) / 100));
}

const PLACEHOLDER =
  "https://via.placeholder.com/400x600.png?text=Portada+no+disponible";

/* ============================================================
   RENDER CATEGORÍAS
============================================================ */
function renderCategories() {
  categoryListEl.innerHTML = "";
  categories.forEach(cat => {
    const li = document.createElement("li");
    li.textContent = cat;

    li.onclick = () => selectCategory(cat);

    categoryListEl.appendChild(li);
  });
}

/* ============================================================
   SELECCIONAR CATEGORÍA
============================================================ */
function selectCategory(cat) {
  renderCategories();

  const items = [...categoryListEl.querySelectorAll("li")];
  items.forEach(li => li.classList.remove("active"));

  items.find(li => li.textContent === cat).classList.add("active");

  const list = books.filter(b => b.category === cat);
  renderBooks(list, cat);
}

/* ============================================================
   RENDER LIBROS
============================================================ */
function renderBooks(list, title) {
  headerCategoryEl.innerHTML = `<div class="category-name">${title}</div>`;
  booksGridEl.innerHTML = "";

  list.forEach(book => {
    const finalPrice = getFinalPrice(book);

    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <article class="book-card">
        <img src="${book.cover}" class="book-cover"
             onerror="this.src='${PLACEHOLDER}'">

        <div class="book-meta">
          <div class="book-title">${book.title}</div>
          <div class="book-author">${book.author}</div>

          <div class="book-info-row">
            <span>${book.editorial}</span>
            <span>· ${book.year}</span>
            <span>· ${book.format}</span>
          </div>

          <div class="price-row">
            <div class="price-now">${formatPrice(finalPrice)}</div>
            ${book.discount > 0 ? `<div class="price-old">${formatPrice(book.price)}</div>` : ""}
          </div>
        </div>
      </article>
    `;

    booksGridEl.appendChild(col);
  });
}

/* ============================================================
   BUSCADOR
============================================================ */
function searchAndRender(q) {
  q = q.trim().toLowerCase();

  if (!q) return renderBooks(books, "Libros Destacados");

  const results = books.filter(b =>
    b.title.toLowerCase().includes(q) ||
    b.author.toLowerCase().includes(q) ||
    b.editorial.toLowerCase().includes(q) ||
    b.category.toLowerCase().includes(q)
  );

  renderBooks(results, `Resultados para "${q}"`);
}

/* EVENTOS */
document.getElementById("searchBtn").onclick = () =>
  searchAndRender(SEARCH_INPUT.value);

document.getElementById("searchBtnMobile").onclick = () =>
  searchAndRender(SEARCH_INPUT_M.value);

SEARCH_INPUT.onkeydown = e =>
  e.key === "Enter" && searchAndRender(SEARCH_INPUT.value);

SEARCH_INPUT_M.onkeydown = e =>
  e.key === "Enter" && searchAndRender(SEARCH_INPUT_M.value);

/* ============================================================
   INICIALIZACIÓN
============================================================ */
renderCategories();
renderBooks(books, "Libros Destacados");
