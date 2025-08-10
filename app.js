
// Demo product data (fictional)
const PRODUCTS = [
  {
    id: "rkt-pro-1",
    name: "Apex Pro Squash Racket",
    category: "Rackets",
    price: 249.00,
    desc: "Lightweight graphite racket with power-oriented head and mid-balance for aggressive players.",
    color: "#dbeafe",
    svg: "racket"
  },
  {
    id: "rkt-lite-2",
    name: "Swift Lite Racket",
    category: "Rackets",
    price: 129.50,
    desc: "Budget-friendly control racket with forgiving sweet spot and comfortable grip.",
    color: "#fef3c7",
    svg: "racket"
  },
  {
    id: "balls-hex-3",
    name: "Pro Bounce Squash Balls (Pair)",
    category: "Balls",
    price: 14.99,
    desc: "High-durability double yellow dot balls for tournament play.",
    color: "#fff7ed",
    svg: "ball"
  },
  {
    id: "balls-trn-4",
    name: "Training Low-Bounce Balls (3-pack)",
    category: "Balls",
    price: 9.99,
    desc: "Great for drills and beginners — extra bounce for longer rallies.",
    color: "#ecfeff",
    svg: "ball"
  },
  {
    id: "shoe-ct-5",
    name: "CourtGrip Pro Shoes",
    category: "Shoes",
    price: 119.95,
    desc: "Non-marking sole, reinforced toe, and breathable upper designed for lateral motion.",
    color: "#fef2f2",
    svg: "shoes"
  },
  {
    id: "grip-6",
    name: "Tacky Overgrip (Pack of 5)",
    category: "Accessories",
    price: 7.50,
    desc: "Thin, tacky overgrip to give extra feel and reduce vibration.",
    color: "#fff1f2",
    svg: "tape"
  },
  {
    id: "bag-7",
    name: "Double Racket Bag",
    category: "Accessories",
    price: 69.00,
    desc: "Carry two rackets and accessories with padded compartment and side pocket.",
    color: "#eef2ff",
    svg: "bag"
  },
  {
    id: "string-8",
    name: "PowerString 1.20mm",
    category: "Accessories",
    price: 24.00,
    desc: "Durable synthetic gut string tuned for a mix of power and control.",
    color: "#f0fdf4",
    svg: "string"
  }
];

// Utilities
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

// State
let cart = {};

function formatPrice(n){ return n.toFixed(2); }

// Render products
function renderProducts(list){
  const container = $('#products');
  container.innerHTML = '';
  const tmpl = document.getElementById('productTemplate');
  list.forEach(p=>{
    const el = tmpl.content.cloneNode(true);
    const article = el.querySelector('.product-card');
    article.dataset.id = p.id;
    article.querySelector('.product-name').textContent = p.name;
    article.querySelector('.category').textContent = p.category;
    article.querySelector('.price').textContent = '€' + formatPrice(p.price);
    article.querySelector('.desc').textContent = p.desc;
    const imgWrap = article.querySelector('.img-wrap');
    imgWrap.innerHTML = getSVG(p.svg, p.color);
    el.querySelector('.add').addEventListener('click', ()=> addToCart(p.id));
    el.querySelector('.quick').addEventListener('click', ()=> openModal(renderProductModal(p)));
    container.appendChild(el);
  });
}

// Simple SVG icons as product images
function getSVG(kind, bg='#eef2f7'){
  if(kind === 'racket') return `
    <svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label="Racket illustration">
      <rect x="6" y="6" width="88" height="88" rx="10" fill="${bg}"/>
      <g transform="translate(18,10) rotate(22 32 32)" stroke="#333" stroke-width="2" fill="none">
        <ellipse cx="32" cy="24" rx="18" ry="24"/>
        <line x1="32" y1="48" x2="32" y2="82" />
        <line x1="32" y1="82" x2="24" y2="92" />
      </g>
    </svg>`;
  if(kind === 'ball') return `
    <svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label="Squash ball illustration">
      <circle cx="50" cy="50" r="44" fill="${bg}" />
      <circle cx="50" cy="50" r="16" fill="#111" opacity="0.85"/>
    </svg>`;
  if(kind === 'shoes') return `
    <svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label="Shoes illustration">
      <rect x="6" y="6" width="88" height="88" rx="10" fill="${bg}"/>
      <path d="M18 72 C30 58, 70 58, 82 72 L82 76 C70 86, 30 86, 18 76 Z" stroke="#333" fill="none" stroke-width="2"/>
      <path d="M28 58 C40 48, 60 48, 72 58" stroke="#333" stroke-width="1.5" fill="none"/>
    </svg>`;
  if(kind === 'tape') return `
    <svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label="Grip tape illustration">
      <rect x="6" y="6" width="88" height="88" rx="10" fill="${bg}"/>
      <rect x="30" y="30" width="40" height="30" rx="6" fill="#fff"/>
      <circle cx="50" cy="45" r="6" fill="#333"/>
    </svg>`;
  if(kind === 'bag') return `
    <svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label="Bag illustration">
      <rect x="6" y="18" width="88" height="64" rx="8" fill="${bg}"/>
      <path d="M22 18 Q50 2 78 18" stroke="#333" stroke-width="2" fill="none"/>
    </svg>`;
  if(kind === 'string') return `
    <svg width="100" height="100" viewBox="0 0 100 100" role="img" aria-label="String illustration">
      <rect x="6" y="6" width="88" height="88" rx="10" fill="${bg}"/>
      <g stroke="#333" stroke-width="1.2" fill="none">
        <path d="M22 28 C36 40, 64 60, 78 72"/>
        <path d="M22 36 C36 48, 64 68, 78 80"/>
      </g>
    </svg>`;
  return '';
}

// Modal helpers
const modal = $('#modal');
function openModal(content){
  $('#modalBody').innerHTML = content;
  modal.setAttribute('aria-hidden','false');
}
function closeModal(){ modal.setAttribute('aria-hidden','true'); $('#modalBody').innerHTML = ''; }

function renderProductModal(p){
  return `
    <div style="display:flex;gap:14px;align-items:flex-start">
      <div style="width:160px">${getSVG(p.svg,p.color)}</div>
      <div>
        <h2>${p.name}</h2>
        <div style="color:var(--muted)">${p.category} • €${formatPrice(p.price)}</div>
        <p>${p.desc}</p>
        <div style="display:flex;gap:8px;margin-top:8px">
          <button id="modalAdd">Add to cart</button>
          <button id="modalClose">Close</button>
        </div>
      </div>
    </div>
  `;
}

// Cart functions
function saveCart(){ localStorage.setItem('cart_demo', JSON.stringify(cart)); updateCartUI(); }
function loadCart(){ try{ cart = JSON.parse(localStorage.getItem('cart_demo')||'{}'); }catch(e){cart={};} updateCartUI(); }

function addToCart(id, qty=1){
  cart[id] = (cart[id]||0)+qty;
  saveCart();
  flashAdded();
}

function removeFromCart(id){
  delete cart[id];
  saveCart();
}

function updateCartUI(){
  const list = $('#cartItems');
  list.innerHTML = '';
  const ids = Object.keys(cart);
  let subtotal = 0;
  ids.forEach(id=>{
    const p = PRODUCTS.find(x=>x.id===id);
    const qty = cart[id];
    const li = document.createElement('li');
    li.innerHTML = `<strong>${p.name}</strong><div>€${formatPrice(p.price)} × ${qty} = €${formatPrice(p.price*qty)}</div><button class="rm">Remove</button>`;
    li.querySelector('.rm').addEventListener('click', ()=> { removeFromCart(id); });
    list.appendChild(li);
    subtotal += p.price*qty;
  });
  $('#cartSubtotal').textContent = formatPrice(subtotal);
  $('#cartCount').textContent = ids.reduce((s,k)=>s+cart[k],0) || 0;
}

// interactions
document.addEventListener('DOMContentLoaded', ()=>{
  renderProducts(PRODUCTS);
  loadCart();

  // search and filters
  $('#search').addEventListener('input', applyFilters);
  $$('#sort').forEach(el=>el.addEventListener('change', applyFilters));
  $$('.cat').forEach(cb=>cb.addEventListener('change', applyFilters));
  $('#maxPrice').addEventListener('input', ()=>{ $('#maxPriceVal').textContent = $('#maxPrice').value; applyFilters(); });

  // cart open/close
  $('#cartBtn').addEventListener('click', ()=>{ $('#cartPanel').classList.toggle('open'); $('#cartPanel').setAttribute('aria-hidden', !$('#cartPanel').classList.contains('open')); });
  $('#closeCart').addEventListener('click', ()=>{ $('#cartPanel').classList.remove('open'); $('#cartPanel').setAttribute('aria-hidden','true'); });
  $('#checkoutBtn').addEventListener('click', ()=>{ alert('This is a demo checkout. No real transaction will occur.'); });

  // modal close
  $('#closeModal').addEventListener('click', closeModal);
  modal.addEventListener('click', (ev)=>{ if(ev.target === modal) closeModal(); });

  // delegation for modal add/close after opening
  document.body.addEventListener('click', (ev)=>{
    if(ev.target && ev.target.id === 'modalAdd'){
      const name = $('#modalBody h2')?.textContent;
      const product = PRODUCTS.find(p=>p.name===name);
      if(product) addToCart(product.id);
      closeModal();
    }
    if(ev.target && ev.target.id === 'modalClose') closeModal();
  });
});

function flashAdded(){
  const btn = $('#cartBtn');
  btn.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.06)' }, { transform: 'scale(1)' }], { duration: 220 });
}

// apply filters & sort
function applyFilters(){
  const q = $('#search').value.trim().toLowerCase();
  const checked = $$('.cat').filter(cb=>cb.checked).map(cb=>cb.value);
  const maxP = parseFloat($('#maxPrice').value);

  let list = PRODUCTS.filter(p=> checked.includes(p.category) && p.price <= maxP);
  if(q) list = list.filter(p => (p.name + ' ' + p.desc).toLowerCase().includes(q));
  // sort
  const sort = $('#sort').value;
  if(sort === 'price-asc') list.sort((a,b)=>a.price-b.price);
  if(sort === 'price-desc') list.sort((a,b)=>b.price-a.price);
  if(sort === 'name-az') list.sort((a,b)=>a.name.localeCompare(b.name));
  renderProducts(list);
}

// expose for debugging in demo
window._SQUASH = { PRODUCTS, cart };
