// Simple static MovieHub app (no backend)
const movies = [
  { id: 1, title: 'Aurora Rising', year: 2025, category: 'Sci-Fi', poster: 'https://via.placeholder.com/300x450?text=Aurora', isNew: true },
  { id: 2, title: 'Midnight Harbor', year: 2024, category: 'Drama', poster: 'https://via.placeholder.com/300x450?text=Midnight', isNew: false },
  { id: 3, title: 'Neon Highway', year: 2025, category: 'Action', poster: 'https://via.placeholder.com/300x450?text=Neon', isNew: true },
  { id: 4, title: 'Quiet Meadow', year: 2023, category: 'Romance', poster: 'https://via.placeholder.com/300x450?text=Meadow', isNew: false },
  { id: 5, title: 'Starfall', year: 2025, category: 'Sci-Fi', poster: 'https://via.placeholder.com/300x450?text=Starfall', isNew: true },
  { id: 6, title: 'Broken Compass', year: 2022, category: 'Adventure', poster: 'https://via.placeholder.com/300x450?text=Compass', isNew: false },
  { id: 7, title: 'Echoes', year: 2025, category: 'Thriller', poster: 'https://via.placeholder.com/300x450?text=Echoes', isNew: true },
  { id: 8, title: 'Summer Loop', year: 2021, category: 'Comedy', poster: 'https://via.placeholder.com/300x450?text=Summer', isNew: false }
];

// Utility: get unique categories
function getCategories() {
  const set = new Set(movies.map(m => m.category));
  return ['All', ...Array.from(set)];
}

// DOM refs
const newScroller = document.getElementById('new-movies-scroller');
const featuredGrid = document.getElementById('featured-grid');
const moviesGrid = document.getElementById('movies-grid');
const categoryFilter = document.getElementById('category-filter');
const sortSelect = document.getElementById('sort-select');
const searchInput = document.getElementById('global-search');
const contactForm = document.getElementById('contact-form');
const contactResult = document.getElementById('contact-result');

// Navigation
document.querySelectorAll('.nav-link').forEach(a => a.addEventListener('click', (e) => {
  e.preventDefault();
  const route = a.dataset.route;
  showSection(route);
}));

function showSection(route) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const el = document.getElementById(route);
  if (el) el.classList.remove('hidden');
  document.querySelectorAll('.nav-link').forEach(n => n.classList.toggle('active', n.dataset.route === route));
  renderCurrent();
}

// Render new movies scroller
function renderNewMovies() {
  const newMovies = movies.filter(m => m.isNew);
  newScroller.innerHTML = '';
  newMovies.forEach(m => {
    const div = document.createElement('div');
    div.className = 'thumb';
    div.title = m.title + ' (' + m.year + ')';
    const img = document.createElement('img');
    img.src = m.poster;
    img.alt = m.title;
    div.appendChild(img);
    newScroller.appendChild(div);
  });
}

// Render featured (first 6)
function renderFeatured(filterFn) {
  const list = (filterFn ? movies.filter(filterFn) : movies).slice(0, 6);
  featuredGrid.innerHTML = '';
  list.forEach(renderCardInto.bind(null, featuredGrid));
}

function renderCardInto(container, m) {
  const c = document.createElement('div');
  c.className = 'card';
  c.innerHTML = `
    <img src="${m.poster}" alt="${m.title}" />
    <div class="meta">
      <div class="title">${m.title}</div>
      <div class="small">${m.category} • ${m.year}</div>
    </div>
  `;
  container.appendChild(c);
}

// Render movies grid with filters
function renderMoviesGrid() {
  const sel = categoryFilter.value;
  const q = searchInput.value.trim().toLowerCase();
  let list = movies.slice();
  if (sel && sel !== 'all' && sel !== 'All') list = list.filter(m => m.category === sel);
  if (q) list = list.filter(m => m.title.toLowerCase().includes(q) || String(m.year).includes(q));
  if (sortSelect.value === 'newest') list.sort((a,b)=>b.year-a.year);
  else if (sortSelect.value === 'title') list.sort((a,b)=>a.title.localeCompare(b.title));

  moviesGrid.innerHTML = '';
  if (list.length === 0) {
    moviesGrid.innerHTML = '<div class="notice">No movies found.</div>';
    return;
  }
  list.forEach(renderCardInto.bind(null, moviesGrid));
}

function populateCategoryFilter() {
  const cats = getCategories();
  categoryFilter.innerHTML = '';
  cats.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c === 'All' ? 'all' : c;
    opt.textContent = c;
    categoryFilter.appendChild(opt);
  });
}

// Render depending on current visible page
function renderCurrent() {
  const visible = Array.from(document.querySelectorAll('.page')).find(p=>!p.classList.contains('hidden'));
  if (!visible) return;
  if (visible.id === 'home') {
    renderFeatured();
  } else if (visible.id === 'movies') {
    renderMoviesGrid();
  }
}

// Events
categoryFilter.addEventListener('change', () => renderMoviesGrid());
sortSelect.addEventListener('change', () => renderMoviesGrid());
searchInput.addEventListener('input', () => {
  // if on movies page, filter results live; else update featured
  const moviesPage = document.getElementById('movies');
  if (!moviesPage.classList.contains('hidden')) renderMoviesGrid();
  else renderFeatured(m => m.title.toLowerCase().includes(searchInput.value.trim().toLowerCase()));
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('contact-name').value.trim();
  contactResult.textContent = `Thanks ${name || 'friend'} — this is a static demo, no message was sent.`;
});

// Init
function init() {
  populateCategoryFilter();
  renderNewMovies();
  showSection('home');
}

document.addEventListener('DOMContentLoaded', init);
