/* ==========================================================================
   MWANGI CONSTRUCTION — APP LOGIC
   Vanilla JS. Persists everything in localStorage so the mockup feels
   interactive across reloads. No backend, no frameworks.
   ========================================================================== */

/* ---------------------------------------------------------------------- */
/* 0. CONSTANTS & SMALL HELPERS                                           */
/* ---------------------------------------------------------------------- */

const STORAGE_KEYS = {
  users: 'mc_users',
  session: 'mc_session',        // logged-in client's email, or null
  adminSession: 'mc_admin_session', // 'true' while admin is logged in
  reviews: 'mc_reviews',
  work: 'mc_work',
  feed: 'mc_feed',
  messages: 'mc_messages',
  compare: 'mc_before_after'
};

const ADMIN_PASSWORD = 'Allied2024'; // demo-only "auth" for the company admin area

const qs  = (sel, scope = document) => scope.querySelector(sel);
const qsa = (sel, scope = document) => Array.from(scope.querySelectorAll(sel));

function uid(){
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function readStore(key, fallback){
  try{
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  }catch(e){
    console.warn('Could not read', key, e);
    return fallback;
  }
}

function writeStore(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function formatDate(iso){
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

/** Show a small confirmation toast at the bottom of the screen. */
let toastTimer = null;
function showToast(message){
  const toast = qs('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

/**
 * Resize an uploaded image file down to a max width and return a compressed
 * base64 data URL, so we don't blow past localStorage's size limits.
 */
function fileToResizedDataURL(file, maxWidth = 700, quality = 0.75){
  return new Promise((resolve, reject) => {
    if(!file){ resolve(null); return; }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read file'));
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Could not load image'));
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/** Build the ★★★☆☆ markup for a given rating (1-5). */
function starsHTML(rating){
  let out = '<span class="stars" aria-label="' + rating + ' out of 5 stars">';
  for(let i = 1; i <= 5; i++){
    out += i <= rating ? '★' : '<span class="dim">★</span>';
  }
  return out + '</span>';
}

/* ---------------------------------------------------------------------- */
/* 1. SEED DATA (first run only)                                          */
/* ---------------------------------------------------------------------- */

function seedDataIfEmpty(){
  if(!localStorage.getItem(STORAGE_KEYS.users)){
    writeStore(STORAGE_KEYS.users, [
      { name: 'Wanjiru Kamau', email: 'client@example.com', phone: '0722 000 111', password: 'password123' }
    ]);
  }

  if(!localStorage.getItem(STORAGE_KEYS.work)){
    writeStore(STORAGE_KEYS.work, [
      { id: uid(), title: 'Contemporary residence — Nairobi', category: 'construction', description: 'Full shell-to-finish build: stone-clad facade, steel-framed glazing and a landscaped forecourt.', image: 'images/work-exterior-1.jpg' },
      { id: uid(), title: 'Rooftop residence with pergola', category: 'construction', description: 'Three-storey build featuring a glass-balustrade terrace and timber pergola for outdoor living.', image: 'images/work-exterior-2.jpg' },
      { id: uid(), title: 'Foundation & stonework in progress', category: 'construction', description: 'Natural stone footing walls laid and cast, ready for damp-proofing and the ground-floor slab.', image: 'images/work-foundation.jpg' },
      { id: uid(), title: 'Blockwork column detail', category: 'construction', description: 'Reinforced masonry column mid-build, showing rebar starter bars ahead of the next lift.', image: 'images/work-blockwork.jpg' },
      { id: uid(), title: 'Living area — hardwood flooring', category: 'interiors', description: 'Engineered hardwood flooring with a feature stepped threshold and full-height glazing.', image: 'images/work-living-room.jpg' },
      { id: uid(), title: 'Dining space — statement lighting', category: 'lighting', description: 'Porcelain tile flooring, sliding aluminium windows and a custom iron pendant fixture.', image: 'images/work-dining.jpg' },
      { id: uid(), title: 'Open-plan kitchen fit-out', category: 'interiors', description: 'Gloss cabinetry, quartz worktops, integrated appliances and layered pendant lighting.', image: 'images/work-kitchen.jpg' },
      { id: uid(), title: 'Curtains & drapery — living room', category: 'interiors', description: 'Made-to-measure blackout drapes over sheer voile, with wall-panel millwork and sconce lighting.', image: 'images/work-curtains.jpg' },
      { id: uid(), title: 'Entrance hall — statement rug', category: 'interiors', description: 'Herringbone parquet flooring dressed with a hand-knotted rug for the main entrance hall.', image: 'images/work-hallway-rug.jpg' },
      { id: uid(), title: 'Fireplace mantel styling', category: 'interiors', description: 'Bespoke mantel finish paired with a mirror and curated decor for a finished living space.', image: 'images/work-fireplace.jpg' }
    ]);
  }

  if(!localStorage.getItem(STORAGE_KEYS.reviews)){
    writeStore(STORAGE_KEYS.reviews, [
      { id: uid(), name: 'Otieno Barasa', rating: 5, text: 'The crew re-roofed our home in Kitengela in three days flat, no leaks since. Fair pricing too.', photo: null, avatar: 'https://picsum.photos/seed/otieno/100/100', date: '2026-06-14', authorEmail: null,
        ownerReply: { text: 'Thank you Otieno — glad the roof has held up through both rainy seasons. Karibu again anytime.', date: '2026-06-16' } },
      { id: uid(), name: 'Fatuma Ali', rating: 5, text: 'Kitchen fit-out looks better than the show house we toured. Clean site every single day.', photo: null, avatar: 'https://picsum.photos/seed/fatuma/100/100', date: '2026-07-02', authorEmail: null, ownerReply: null },
      { id: uid(), name: 'Brian Kiptoo', rating: 4, text: 'Good work on the perimeter wall. Took a week longer than quoted but communication was solid throughout.', photo: null, avatar: 'https://picsum.photos/seed/brian/100/100', date: '2026-07-20', authorEmail: null, ownerReply: null }
    ]);
  }

  if(!localStorage.getItem(STORAGE_KEYS.feed)){
    writeStore(STORAGE_KEYS.feed, [
      {
        id: uid(),
        author: 'Wanjiru Kamau',
        text: 'Has anyone used Allied for a borehole-adjacent build? Wondering how the team handles waterproofing.',
        date: '2026-08-10',
        likes: 2,
        likedBy: [],
        replies: [
          { id: uid(), author: 'Otieno Barasa', text: 'Yes — they used a bitumen membrane on ours, held up through both rainy seasons.', date: '2026-08-11' }
        ]
      }
    ]);
  }

  if(!localStorage.getItem(STORAGE_KEYS.messages)){
    writeStore(STORAGE_KEYS.messages, []);
  }

  // Deliberately empty by default — a real before/after pair should only ever
  // show an actual transformation of the same space, added by the admin.
  if(!localStorage.getItem(STORAGE_KEYS.compare)){
    writeStore(STORAGE_KEYS.compare, []);
  }
}

/* ---------------------------------------------------------------------- */
/* 2. NAVIGATION (page-level + in-page subtabs)                           */
/* ---------------------------------------------------------------------- */

function showPage(pageName){
  qsa('.page').forEach(p => p.classList.toggle('is-active', p.dataset.page === pageName));
  qsa('.nav-link[data-nav]').forEach(btn => btn.classList.toggle('is-current', btn.dataset.nav === pageName));
  qs('#navLinks').classList.remove('is-open');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateNavPill();

  // Guard the protected pages: bounce back if not authenticated
  const session = localStorage.getItem(STORAGE_KEYS.session);
  const adminSession = localStorage.getItem(STORAGE_KEYS.adminSession);

  if(pageName === 'dashboard' && !session){
    showPage('auth');
    return;
  }
  if(pageName === 'admin' && adminSession !== 'true'){
    showPage('admin-login');
    return;
  }

  if(pageName === 'dashboard') renderDashboard();
  if(pageName === 'admin') renderAdmin();
  if(pageName === 'home') renderHome();
}

/** Slide the nav's active-page pill under whichever nav-link is current. */
function updateNavPill(){
  const pill = qs('#navPill');
  const current = qs('.nav-link.is-current');
  if(!pill || !current){
    if(pill) pill.style.opacity = '0';
    return;
  }
  pill.style.opacity = '1';
  pill.style.width = current.offsetWidth + 'px';
  pill.style.transform = `translateX(${current.offsetLeft}px)`;
}

/** Wire up every element with data-nav="pageName" to switch pages. */
function initPageNavigation(){
  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-nav]');
    if(trigger) showPage(trigger.dataset.nav);
  });
}

/** Generic tab/subtab switcher: works for the auth tabs, dashboard subtabs
 *  and admin subtabs, since they all share the same data-tab pattern. */
function initTabGroup(tabSelector, panelSelector, activeClass){
  qsa(tabSelector).forEach(tabButton => {
    tabButton.addEventListener('click', () => {
      const group = tabButton.parentElement;
      const panelsContainer = group.nextElementSibling ? group.parentElement : document;
      qsa(tabSelector, group).forEach(t => t.classList.remove(activeClass));
      tabButton.classList.add(activeClass);

      const target = tabButton.dataset.tab;
      qsa(panelSelector, panelsContainer).forEach(panel => {
        panel.classList.toggle(activeClass, panel.dataset.tabpanel === target);
      });
    });
  });
}

/* ---------------------------------------------------------------------- */
/* 3. HOME PAGE RENDERING                                                 */
/* ---------------------------------------------------------------------- */

/* Tracks which gallery filter chip is currently selected. */
let currentGalleryFilter = 'all';

function renderHome(){
  renderGallery();
  renderRatingSummary();
  renderCompareList();
  renderMarquee();

  // Reviews (show newest first, cap at 6 on the public page)
  const reviews = readStore(STORAGE_KEYS.reviews, [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 6);

  qs('#homeReviewsGrid').innerHTML = reviews.map(reviewCardHTML).join('')
    || '<p class="list-item-empty">No reviews yet — be the first to leave one.</p>';
}

/** Render a single review as HTML — shared by the home page, dashboard and admin. */
function reviewCardHTML(r){
  const verified = r.authorEmail
    ? '<span class="verified-badge">Verified client</span>'
    : '';
  const reply = r.ownerReply
    ? `<div class="owner-reply">
         <div class="owner-reply-label">Response from Allied Interiors and Construction</div>
         <p>${r.ownerReply.text}</p>
       </div>`
    : '';

  return `
    <article class="review-card">
      <div class="review-head">
        <img class="review-avatar" src="${r.avatar}" alt="${r.name}">
        <div>
          <div class="review-name">${r.name}${verified}</div>
          <div class="review-date">${formatDate(r.date)}</div>
        </div>
      </div>
      ${starsHTML(r.rating)}
      <p class="review-text" style="margin-top:8px;">${r.text}</p>
      ${r.photo ? `<img class="review-photo" src="${r.photo}" alt="Photo from ${r.name}">` : ''}
      ${reply}
    </article>
  `;
}

/** Holds whatever set of projects is currently shown, so the lightbox's
 *  prev/next buttons can step through exactly what the visitor is browsing. */
let currentGalleryItems = [];

function renderGallery(){
  const work = readStore(STORAGE_KEYS.work, []);
  const filtered = currentGalleryFilter === 'all'
    ? work
    : work.filter(item => item.category === currentGalleryFilter);
  currentGalleryItems = filtered;

  qs('#galleryGrid').innerHTML = filtered.map((item, i) => `
    <article class="gallery-card" data-lightbox-index="${i}">
      <span class="category-badge">${item.category || 'work'}</span>
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="gallery-card-body">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </div>
    </article>
  `).join('') || '<p class="list-item-empty">No projects in this category yet.</p>';

  qsa('[data-lightbox-index]').forEach(card => {
    card.addEventListener('click', () => openLightbox(+card.dataset.lightboxIndex));
  });
}

function initGalleryFilters(){
  qsa('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentGalleryFilter = btn.dataset.filter;
      qsa('.filter-btn').forEach(b => b.classList.toggle('is-active', b === btn));
      renderGallery();
    });
  });
}

/* ---------- Gallery lightbox ---------- */

let lightboxIndex = 0;

function openLightbox(index){
  lightboxIndex = index;
  updateLightbox();
  qs('#lightbox').classList.add('is-open');
}

function updateLightbox(){
  const item = currentGalleryItems[lightboxIndex];
  if(!item) return;
  qs('#lightboxImg').src = item.image;
  qs('#lightboxImg').alt = item.title;
  qs('#lightboxCaption').textContent = `${item.title} — ${item.description}`;
}

function closeLightbox(){
  qs('#lightbox').classList.remove('is-open');
}

function stepLightbox(delta){
  if(!currentGalleryItems.length) return;
  lightboxIndex = (lightboxIndex + delta + currentGalleryItems.length) % currentGalleryItems.length;
  updateLightbox();
}

function initLightbox(){
  qs('#lightboxClose').addEventListener('click', closeLightbox);
  qs('#lightboxPrev').addEventListener('click', () => stepLightbox(-1));
  qs('#lightboxNext').addEventListener('click', () => stepLightbox(1));

  // Click the dark backdrop (not the image/caption) to close
  qs('#lightbox').addEventListener('click', (e) => {
    if(e.target.id === 'lightbox') closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if(!qs('#lightbox').classList.contains('is-open')) return;
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowLeft') stepLightbox(-1);
    if(e.key === 'ArrowRight') stepLightbox(1);
  });
}

/* ---------- Review marquee ---------- */

function renderMarquee(){
  const track = qs('#marqueeTrack');
  if(!track) return;
  const reviews = readStore(STORAGE_KEYS.reviews, []);
  if(!reviews.length){ track.innerHTML = ''; return; }

  const chipHTML = (r) => `
    <div class="marquee-chip">
      <img src="${r.avatar}" alt="">
      <span><strong>${r.name}</strong> <span class="stars">${starsHTML(r.rating)}</span></span>
    </div>
  `;

  // Render the list twice back-to-back so the CSS animation (translateX -50%) loops seamlessly
  track.innerHTML = reviews.map(chipHTML).join('') + reviews.map(chipHTML).join('');
}

/* ---------- Before / After compare sliders ---------- */

function renderCompareList(){
  const container = qs('#compareList');
  if(!container) return;
  const items = readStore(STORAGE_KEYS.compare, []);

  container.innerHTML = items.map(item => `
    <div class="compare-slider">
      <div class="compare-title">${item.title}</div>
      <div class="compare-frame" data-compare-id="${item.id}">
        <img class="compare-img" src="${item.afterImage}" alt="After — ${item.title}">
        <div class="compare-after-wrap" style="clip-path: inset(0 50% 0 0)">
          <img class="compare-img" src="${item.beforeImage}" alt="Before — ${item.title}">
        </div>
        <div class="compare-handle" style="left:50%">
          <span class="compare-handle-grip">
            <svg viewBox="0 0 24 24"><polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/></svg>
          </span>
        </div>
        <span class="compare-tag compare-tag-before">Before</span>
        <span class="compare-tag compare-tag-after">After</span>
      </div>
      ${item.description ? `<p class="compare-desc">${item.description}</p>` : ''}
    </div>
  `).join('') || '<p class="list-item-empty">Transformations are on their way — check back soon.</p>';

  initCompareSliders();
}

/** Wire up drag-to-reveal on every .compare-frame currently in the DOM. */
function initCompareSliders(){
  qsa('.compare-frame').forEach(frame => {
    const afterWrap = qs('.compare-after-wrap', frame);
    const handle = qs('.compare-handle', frame);
    let dragging = false;

    function setPosition(clientX){
      const rect = frame.getBoundingClientRect();
      let pct = ((clientX - rect.left) / rect.width) * 100;
      pct = Math.max(0, Math.min(100, pct));
      afterWrap.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    }

    frame.addEventListener('pointerdown', (e) => {
      dragging = true;
      frame.setPointerCapture(e.pointerId);
      setPosition(e.clientX);
    });
    frame.addEventListener('pointermove', (e) => { if(dragging) setPosition(e.clientX); });
    frame.addEventListener('pointerup', () => { dragging = false; });
    frame.addEventListener('pointercancel', () => { dragging = false; });
  });
}

/** Compute and render the average-rating summary block above the reviews grid. */
function renderRatingSummary(){
  const reviews = readStore(STORAGE_KEYS.reviews, []);
  const container = qs('#ratingSummary');
  const heroRatingEl = qs('#heroRatingValue');

  if(!reviews.length){
    container.innerHTML = '';
    if(heroRatingEl) heroRatingEl.textContent = '—';
    return;
  }

  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const average = (total / reviews.length).toFixed(1);
  if(heroRatingEl) heroRatingEl.textContent = average;

  const counts = [5, 4, 3, 2, 1].map(star => reviews.filter(r => r.rating === star).length);
  const maxCount = Math.max(...counts, 1);

  const barsHTML = [5, 4, 3, 2, 1].map((star, i) => `
    <div class="rating-bar-row">
      <span>${star} star</span>
      <div class="rating-bar-track"><div class="rating-bar-fill" style="width:${(counts[i] / maxCount) * 100}%"></div></div>
      <span>${counts[i]}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="rating-score">
      <div class="rating-score-num">${average}</div>
      ${starsHTML(Math.round(average))}
      <div class="rating-score-count">${reviews.length} review${reviews.length === 1 ? '' : 's'}</div>
    </div>
    <div class="rating-bars">${barsHTML}</div>
  `;
}

/* ---------------------------------------------------------------------- */
/* 4. AUTH: LOGIN / REGISTER                                              */
/* ---------------------------------------------------------------------- */

function getCurrentUser(){
  const email = localStorage.getItem(STORAGE_KEYS.session);
  if(!email) return null;
  return readStore(STORAGE_KEYS.users, []).find(u => u.email === email) || null;
}

function updateNavForAuthState(){
  const loggedIn = !!localStorage.getItem(STORAGE_KEYS.session);
  qs('#navAuthBtn').classList.toggle('is-hidden', loggedIn);
  qs('#navDashboardBtn').classList.toggle('is-hidden', !loggedIn);
  qs('#navLogoutBtn').classList.toggle('is-hidden', !loggedIn);
}

function initAuthForms(){
  // Login
  qs('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = qs('#loginEmail').value.trim().toLowerCase();
    const password = qs('#loginPassword').value;
    const errorEl = qs('#loginError');

    const user = readStore(STORAGE_KEYS.users, []).find(
      u => u.email.toLowerCase() === email && u.password === password
    );

    if(!user){
      errorEl.textContent = 'Email or password is incorrect. Try again or register below.';
      return;
    }
    errorEl.textContent = '';
    localStorage.setItem(STORAGE_KEYS.session, user.email);
    updateNavForAuthState();
    e.target.reset();
    showToast(`Welcome back, ${user.name.split(' ')[0]}!`);
    showPage('dashboard');
  });

  // Register
  qs('#registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = qs('#regName').value.trim();
    const email = qs('#regEmail').value.trim().toLowerCase();
    const phone = qs('#regPhone').value.trim();
    const password = qs('#regPassword').value;
    const errorEl = qs('#registerError');

    const users = readStore(STORAGE_KEYS.users, []);
    if(users.some(u => u.email.toLowerCase() === email)){
      errorEl.textContent = 'An account with that email already exists. Try logging in instead.';
      return;
    }
    if(password.length < 6){
      errorEl.textContent = 'Please use a password with at least 6 characters.';
      return;
    }

    errorEl.textContent = '';
    users.push({ name, email, phone, password });
    writeStore(STORAGE_KEYS.users, users);
    localStorage.setItem(STORAGE_KEYS.session, email);
    updateNavForAuthState();
    e.target.reset();
    showToast(`Account created — welcome, ${name.split(' ')[0]}!`);
    showPage('dashboard');
  });

  // Logout (client)
  qs('#navLogoutBtn').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEYS.session);
    updateNavForAuthState();
    showToast('You have been logged out.');
    showPage('home');
  });

  // "Contact contractor" buttons on the home page route through login
  ['heroContactBtn', 'ctaContactBtn', 'aboutContactBtn', 'estimatorCTA'].forEach(id => {
    qs('#' + id).addEventListener('click', () => {
      if(getCurrentUser()){
        showPage('dashboard');
        // Jump straight to the contact subtab
        qs('.subtab[data-tab="contact"]').click();
      }else{
        showToast('Log in or register to message our team.');
        showPage('auth');
      }
    });
  });
}

/* ---------------------------------------------------------------------- */
/* 5. CLIENT DASHBOARD                                                    */
/* ---------------------------------------------------------------------- */

function renderDashboard(){
  const user = getCurrentUser();
  if(!user) return;
  qs('#dashWelcome').textContent = `Welcome back, ${user.name.split(' ')[0]}`;
  renderMyReviews();
  renderFeed();
}

function renderMyReviews(){
  const user = getCurrentUser();
  const mine = readStore(STORAGE_KEYS.reviews, [])
    .filter(r => r.authorEmail === user.email)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  qs('#myReviewsList').innerHTML = mine.map(reviewCardHTML).join('')
    || '<p class="list-item-empty">You haven\'t posted a review yet.</p>';
}

/** Build an interactive 5-star rating input inside the given container. */
function buildStarInput(container, hiddenInput){
  container.innerHTML = '';
  for(let i = 1; i <= 5; i++){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.value = i;
    btn.textContent = '★';
    btn.setAttribute('aria-label', i + ' star' + (i > 1 ? 's' : ''));
    btn.addEventListener('click', () => {
      hiddenInput.value = i;
      qsa('button', container).forEach(b => b.classList.toggle('is-filled', +b.dataset.value <= i));
    });
    container.appendChild(btn);
  }
}

function initReviewForm(){
  const starContainer = qs('#reviewStarInput');
  const hiddenRating = qs('#reviewRatingValue');
  buildStarInput(starContainer, hiddenRating);

  const photoInput = qs('#reviewPhoto');
  const photoPreview = qs('#reviewPhotoPreview');
  photoInput.addEventListener('change', async () => {
    const dataUrl = await fileToResizedDataURL(photoInput.files[0]);
    if(dataUrl){
      photoPreview.src = dataUrl;
      photoPreview.classList.remove('is-hidden');
    }else{
      photoPreview.classList.add('is-hidden');
    }
  });

  qs('#reviewForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const errorEl = qs('#reviewError');
    const rating = +hiddenRating.value;
    const text = qs('#reviewText').value.trim();

    if(rating === 0){
      errorEl.textContent = 'Please select a star rating.';
      return;
    }
    if(!text){
      errorEl.textContent = 'Please write a short review.';
      return;
    }
    errorEl.textContent = '';

    const photoDataUrl = await fileToResizedDataURL(photoInput.files[0]);

    const reviews = readStore(STORAGE_KEYS.reviews, []);
    reviews.push({
      id: uid(),
      name: user.name,
      rating,
      text,
      photo: photoDataUrl,
      avatar: `https://picsum.photos/seed/${encodeURIComponent(user.email)}/100/100`,
      date: new Date().toISOString(),
      authorEmail: user.email,
      ownerReply: null
    });
    writeStore(STORAGE_KEYS.reviews, reviews);

    e.target.reset();
    hiddenRating.value = 0;
    qsa('button', starContainer).forEach(b => b.classList.remove('is-filled'));
    photoPreview.classList.add('is-hidden');

    showToast('Thanks — your review has been posted!');
    renderMyReviews();
  });
}

/* ---------- Community feed ---------- */

function renderFeed(){
  const user = getCurrentUser();
  const posts = readStore(STORAGE_KEYS.feed, [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  qs('#feedList').innerHTML = posts.map(post => {
    const likedBy = post.likedBy || [];
    const isLiked = likedBy.includes(user.email);
    return `
    <div class="list-item" data-post-id="${post.id}">
      <div class="feed-post-head">
        <span class="feed-author">${post.author}</span>
        <span class="feed-date">${formatDate(post.date)}</span>
      </div>
      <p class="feed-text">${post.text}</p>
      <div class="feed-actions">
        <button class="feed-helpful ${isLiked ? 'is-liked' : ''}" data-like-post="${post.id}">
          <svg viewBox="0 0 24 24"><path d="M7 11v9H3v-9h4zm3.5-8.5L14 4l-1 5h6a2 2 0 0 1 2 2.4l-1.6 7A2 2 0 0 1 17.4 20H10a2 2 0 0 1-2-2v-8.3a2 2 0 0 1 .6-1.4l1.9-1.8z"/></svg>
          Helpful ${likedBy.length ? `(${likedBy.length})` : ''}
        </button>
        <button class="feed-reply-toggle" data-reply-toggle="${post.id}">Reply</button>
      </div>

      ${post.replies && post.replies.length ? `
        <div class="feed-replies">
          ${post.replies.map(r => `
            <div>
              <div class="feed-post-head">
                <span class="feed-author">${r.author}</span>
                <span class="feed-date">${formatDate(r.date)}</span>
              </div>
              <p class="feed-text" style="margin-bottom:0;">${r.text}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <form class="feed-reply-form" data-reply-form="${post.id}">
        <input type="text" placeholder="Write a reply…" required>
        <button type="submit" class="btn btn-primary">Reply</button>
      </form>
    </div>
  `;
  }).join('') || '<p class="list-item-empty">No posts yet — start the conversation.</p>';

  // Toggle "Helpful" — one like per logged-in user, click again to remove
  qsa('[data-like-post]').forEach(btn => {
    btn.addEventListener('click', () => {
      const posts = readStore(STORAGE_KEYS.feed, []);
      const post = posts.find(p => p.id === btn.dataset.likePost);
      post.likedBy = post.likedBy || [];
      const idx = post.likedBy.indexOf(user.email);
      if(idx === -1) post.likedBy.push(user.email);
      else post.likedBy.splice(idx, 1);
      writeStore(STORAGE_KEYS.feed, posts);
      renderFeed();
    });
  });

  // Toggle reply forms open/closed
  qsa('[data-reply-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const form = qs(`[data-reply-form="${btn.dataset.replyToggle}"]`);
      form.classList.toggle('is-open');
      if(form.classList.contains('is-open')) qs('input', form).focus();
    });
  });

  // Handle reply submission
  qsa('[data-reply-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = qs('input', form);
      const text = input.value.trim();
      if(!text) return;

      const posts = readStore(STORAGE_KEYS.feed, []);
      const post = posts.find(p => p.id === form.dataset.replyForm);
      post.replies = post.replies || [];
      post.replies.push({ id: uid(), author: user.name, text, date: new Date().toISOString() });
      writeStore(STORAGE_KEYS.feed, posts);

      renderFeed();
      showToast('Reply posted.');
    });
  });
}

function initFeedForm(){
  qs('#feedForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const textEl = qs('#feedText');
    const text = textEl.value.trim();
    if(!text) return;

    const posts = readStore(STORAGE_KEYS.feed, []);
    posts.push({ id: uid(), author: user.name, text, date: new Date().toISOString(), replies: [], likes: 0, likedBy: [] });
    writeStore(STORAGE_KEYS.feed, posts);

    e.target.reset();
    renderFeed();
    showToast('Posted to the community feed.');
  });
}

/* ---------- Rough cost estimator (public, no login needed) ---------- */

/**
 * ILLUSTRATIVE RATES ONLY — these are placeholder per-square-metre ranges
 * for a generic Kenyan market, not Allied Interiors' real pricing.
 * Replace with the business's actual rates before this tool goes live.
 */
const ESTIMATE_RATES_KES_PER_SQM = {
  'New construction': { low: 35000, high: 65000 },
  'Renovation': { low: 15000, high: 35000 },
  'Interior fit-out': { low: 20000, high: 45000 },
  'Roofing': { low: 1500, high: 3000 },
  'Painting': { low: 300, high: 600 },
};

function formatKES(n){ return Math.round(n).toLocaleString('en-US'); }

function initEstimator(){
  qs('#estimatorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const type = qs('#estimatorType').value;
    const size = parseFloat(qs('#estimatorSize').value);
    if(!size || size <= 0) return;

    const rate = ESTIMATE_RATES_KES_PER_SQM[type];
    const low = size * rate.low;
    const high = size * rate.high;

    qs('#estLow').textContent = formatKES(low);
    qs('#estHigh').textContent = formatKES(high);
    qs('#estimatorResult').classList.remove('is-hidden');
    qs('#estimatorResult').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* ---------- Contact contractor (from client dashboard) ---------- */

function initContactForm(){
  const photoInput = qs('#contactPhoto');
  const photoPreview = qs('#contactPhotoPreview');
  photoInput.addEventListener('change', async () => {
    const dataUrl = await fileToResizedDataURL(photoInput.files[0]);
    if(dataUrl){
      photoPreview.src = dataUrl;
      photoPreview.classList.remove('is-hidden');
    }else{
      photoPreview.classList.add('is-hidden');
    }
  });

  qs('#contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const projectType = qs('#contactProjectType').value;
    const budget = qs('#contactBudget').value;
    const text = qs('#contactText').value.trim();
    if(!text) return;

    const photoDataUrl = await fileToResizedDataURL(photoInput.files[0]);

    const messages = readStore(STORAGE_KEYS.messages, []);
    messages.push({
      id: uid(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      projectType,
      budget,
      text,
      photo: photoDataUrl,
      date: new Date().toISOString()
    });
    writeStore(STORAGE_KEYS.messages, messages);

    e.target.reset();
    photoPreview.classList.add('is-hidden');
    qs('#contactSuccess').classList.remove('is-hidden');
    showToast('Message sent to our team.');
    setTimeout(() => qs('#contactSuccess').classList.add('is-hidden'), 4000);
  });
}

/* ---------------------------------------------------------------------- */
/* 6. ADMIN AREA                                                          */
/* ---------------------------------------------------------------------- */

function initAdminLogin(){
  qs('#adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const password = qs('#adminPassword').value;
    const errorEl = qs('#adminLoginError');

    if(password !== ADMIN_PASSWORD){
      errorEl.textContent = 'Incorrect password.';
      return;
    }
    errorEl.textContent = '';
    localStorage.setItem(STORAGE_KEYS.adminSession, 'true');
    e.target.reset();
    showToast('Welcome back — admin access granted.');
    showPage('admin');
  });

  qs('#adminLogoutBtn').addEventListener('click', () => {
    localStorage.removeItem(STORAGE_KEYS.adminSession);
    showToast('Logged out of admin.');
    showPage('home');
  });

  // Wipes every mc_* key and reloads with fresh seed data — useful whenever
  // stored data was created by an older version of this app and is missing
  // newer fields (category, ownerReply, likes, etc).
  qs('#resetDemoBtn').addEventListener('click', () => {
    const sure = confirm('This clears all saved reviews, projects, messages and accounts on this device and reloads fresh demo data. Continue?');
    if(!sure) return;
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    window.location.reload();
  });
}

function renderAdmin(){
  renderAdminWork();
  renderAdminCompareList();
  renderAdminReviews();
  renderAdminMessages();
}

function renderAdminWork(){
  const work = readStore(STORAGE_KEYS.work, []);
  qs('#adminWorkGrid').innerHTML = work.map(item => `
    <article class="admin-card">
      <span class="category-badge">${item.category || 'work'}</span>
      <img src="${item.image}" alt="${item.title}">
      <div class="admin-card-body">
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <div class="admin-card-actions">
          <button class="btn-edit" data-edit-work="${item.id}">Edit</button>
          <button class="btn-delete" data-delete-work="${item.id}">Delete</button>
        </div>
      </div>
    </article>
  `).join('') || '<p class="list-item-empty">No project photos uploaded yet.</p>';

  qsa('[data-delete-work]').forEach(btn => {
    btn.addEventListener('click', () => {
      const remaining = readStore(STORAGE_KEYS.work, []).filter(w => w.id !== btn.dataset.deleteWork);
      writeStore(STORAGE_KEYS.work, remaining);
      renderAdminWork();
      showToast('Project removed from gallery.');
    });
  });

  qsa('[data-edit-work]').forEach(btn => {
    btn.addEventListener('click', () => startEditWork(btn.dataset.editWork));
  });
}

/** Populate the upload form with an existing project's details and switch to edit mode. */
function startEditWork(id){
  const item = readStore(STORAGE_KEYS.work, []).find(w => w.id === id);
  if(!item) return;

  qs('#workEditId').value = item.id;
  qs('#workTitle').value = item.title;
  qs('#workCategory').value = item.category || 'construction';
  qs('#workDesc').value = item.description;
  qs('#workPhoto').value = '';
  qs('#workPhotoPreview').src = item.image;
  qs('#workPhotoPreview').classList.remove('is-hidden');
  qs('#workPhotoNote').textContent = 'Leave blank to keep the current photo.';
  qs('#workFormTitle').textContent = 'Edit project';
  qs('#workSubmitBtn').textContent = 'Save changes';
  qs('#workCancelEdit').classList.remove('is-hidden');

  // Jump to the Upload tab so the form is visible, then scroll to it
  qs('.subtab[data-tab="upload"]').click();
  qs('#workForm').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetWorkForm(){
  qs('#workForm').reset();
  qs('#workEditId').value = '';
  qs('#workPhotoPreview').classList.add('is-hidden');
  qs('#workPhotoNote').textContent = 'No file? A placeholder photo will be used.';
  qs('#workFormTitle').textContent = 'Add a project photo';
  qs('#workSubmitBtn').textContent = 'Add to gallery';
  qs('#workCancelEdit').classList.add('is-hidden');
}

function initWorkForm(){
  const photoInput = qs('#workPhoto');
  const photoPreview = qs('#workPhotoPreview');
  photoInput.addEventListener('change', async () => {
    const dataUrl = await fileToResizedDataURL(photoInput.files[0]);
    if(dataUrl){
      photoPreview.src = dataUrl;
      photoPreview.classList.remove('is-hidden');
    }
  });

  qs('#workCancelEdit').addEventListener('click', resetWorkForm);

  qs('#workForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = qs('#workTitle').value.trim();
    const category = qs('#workCategory').value;
    const description = qs('#workDesc').value.trim();
    if(!title || !description) return;

    const editId = qs('#workEditId').value;
    const uploaded = await fileToResizedDataURL(photoInput.files[0]);
    const work = readStore(STORAGE_KEYS.work, []);

    if(editId){
      const item = work.find(w => w.id === editId);
      item.title = title;
      item.category = category;
      item.description = description;
      if(uploaded) item.image = uploaded; // keep existing photo if none re-uploaded
      writeStore(STORAGE_KEYS.work, work);
      showToast('Project updated.');
    }else{
      const image = uploaded || `https://picsum.photos/seed/${uid()}/700/500`;
      work.unshift({ id: uid(), title, category, description, image });
      writeStore(STORAGE_KEYS.work, work);
      showToast('Project added to your gallery.');
    }

    resetWorkForm();
    renderAdminWork();
  });
}

/* ---------- Admin: before/after management ---------- */

function renderAdminCompareList(){
  const list = qs('#adminCompareList');
  if(!list) return;
  const items = readStore(STORAGE_KEYS.compare, []);

  list.innerHTML = items.map(item => `
    <div class="list-item">
      <div class="admin-compare-thumbs">
        <img src="${item.beforeImage}" alt="Before — ${item.title}">
        <img src="${item.afterImage}" alt="After — ${item.title}">
      </div>
      <strong>${item.title}</strong>
      ${item.description ? `<p class="review-text" style="margin-top:4px;">${item.description}</p>` : ''}
      <button class="btn-delete" style="margin-top:10px;" data-delete-compare="${item.id}">Delete</button>
    </div>
  `).join('') || '<p class="list-item-empty">No before/after pairs added yet.</p>';

  qsa('[data-delete-compare]').forEach(btn => {
    btn.addEventListener('click', () => {
      const remaining = readStore(STORAGE_KEYS.compare, []).filter(c => c.id !== btn.dataset.deleteCompare);
      writeStore(STORAGE_KEYS.compare, remaining);
      renderAdminCompareList();
      showToast('Transformation removed.');
    });
  });
}

function initCompareForm(){
  const beforeInput = qs('#compareBefore');
  const afterInput = qs('#compareAfter');
  const beforePreview = qs('#compareBeforePreview');
  const afterPreview = qs('#compareAfterPreview');

  beforeInput.addEventListener('change', async () => {
    const dataUrl = await fileToResizedDataURL(beforeInput.files[0]);
    if(dataUrl){ beforePreview.src = dataUrl; beforePreview.classList.remove('is-hidden'); }
  });
  afterInput.addEventListener('change', async () => {
    const dataUrl = await fileToResizedDataURL(afterInput.files[0]);
    if(dataUrl){ afterPreview.src = dataUrl; afterPreview.classList.remove('is-hidden'); }
  });

  qs('#compareForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = qs('#compareTitle').value.trim();
    const description = qs('#compareDesc').value.trim();
    if(!title || !beforeInput.files[0] || !afterInput.files[0]) return;

    const beforeImage = await fileToResizedDataURL(beforeInput.files[0]);
    const afterImage = await fileToResizedDataURL(afterInput.files[0]);

    const items = readStore(STORAGE_KEYS.compare, []);
    items.unshift({ id: uid(), title, description, beforeImage, afterImage });
    writeStore(STORAGE_KEYS.compare, items);

    e.target.reset();
    beforePreview.classList.add('is-hidden');
    afterPreview.classList.add('is-hidden');
    showToast('Transformation added.');
    renderAdminCompareList();
  });
}

function renderAdminReviews(){
  const reviews = readStore(STORAGE_KEYS.reviews, [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  qs('#adminReviewsList').innerHTML = reviews.map(r => `
    <div class="list-item">
      <div class="feed-post-head">
        <span class="feed-author">${r.name}${r.authorEmail ? '<span class="verified-badge">Verified client</span>' : ''}</span>
        <span class="feed-date">${formatDate(r.date)}</span>
      </div>
      ${starsHTML(r.rating)}
      <p class="review-text" style="margin-top:8px;">${r.text}</p>
      ${r.photo ? `<img class="review-photo" src="${r.photo}" alt="Review photo from ${r.name}">` : ''}

      ${r.ownerReply ? `
        <div class="owner-reply">
          <div class="owner-reply-label">Your response</div>
          <p>${r.ownerReply.text}</p>
        </div>
        <button class="btn-delete" style="margin-top:10px;" data-remove-reply="${r.id}">Remove response</button>
      ` : `
        <form class="feed-reply-form is-open" data-owner-reply-form="${r.id}" style="margin-top:12px;">
          <input type="text" placeholder="Write a public response…" required>
          <button type="submit" class="btn btn-primary">Respond</button>
        </form>
      `}

      <button class="btn-delete" style="margin-top:10px;" data-delete-review="${r.id}">Delete review</button>
    </div>
  `).join('') || '<p class="list-item-empty">No reviews yet.</p>';

  qsa('[data-delete-review]').forEach(btn => {
    btn.addEventListener('click', () => {
      const remaining = readStore(STORAGE_KEYS.reviews, []).filter(r => r.id !== btn.dataset.deleteReview);
      writeStore(STORAGE_KEYS.reviews, remaining);
      renderAdminReviews();
      showToast('Review removed.');
    });
  });

  qsa('[data-remove-reply]').forEach(btn => {
    btn.addEventListener('click', () => {
      const reviews = readStore(STORAGE_KEYS.reviews, []);
      const review = reviews.find(r => r.id === btn.dataset.removeReply);
      review.ownerReply = null;
      writeStore(STORAGE_KEYS.reviews, reviews);
      renderAdminReviews();
    });
  });

  qsa('[data-owner-reply-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = qs('input', form);
      const text = input.value.trim();
      if(!text) return;

      const reviews = readStore(STORAGE_KEYS.reviews, []);
      const review = reviews.find(r => r.id === form.dataset.ownerReplyForm);
      review.ownerReply = { text, date: new Date().toISOString() };
      writeStore(STORAGE_KEYS.reviews, reviews);
      renderAdminReviews();
      showToast('Response posted — visible on your public reviews.');
    });
  });
}

function renderAdminMessages(){
  const messages = readStore(STORAGE_KEYS.messages, [])
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  qs('#adminMessagesList').innerHTML = messages.map(m => `
    <div class="list-item">
      <div class="feed-post-head">
        <span class="feed-author">${m.name}</span>
        <span class="feed-date">${formatDate(m.date)}</span>
      </div>
      <p class="review-text" style="margin:4px 0;">${m.phone} &nbsp;·&nbsp; ${m.email}</p>
      ${m.projectType ? `<p class="review-text" style="margin:4px 0;"><strong>${m.projectType}</strong> &nbsp;·&nbsp; Budget: ${m.budget}</p>` : ''}
      <p class="review-text">${m.text}</p>
      ${m.photo ? `<img class="msg-photo" src="${m.photo}" alt="Photo from ${m.name}">` : ''}
    </div>
  `).join('') || '<p class="list-item-empty">No messages yet.</p>';
}

/* ---------------------------------------------------------------------- */
/* 7. MOBILE NAV TOGGLE                                                   */
/* ---------------------------------------------------------------------- */

function initMobileNav(){
  const toggle = qs('#navToggle');
  const links = qs('#navLinks');
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
}

/** Wire up every password field's show/hide eye button. */
function initPasswordToggles(){
  qsa('.password-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById(btn.dataset.toggleFor);
      const isShowing = input.type === 'text';
      input.type = isShowing ? 'password' : 'text';
      btn.classList.toggle('is-active', !isShowing);
      btn.setAttribute('aria-label', isShowing ? 'Show password' : 'Hide password');
    });
  });
}

/** Subtle cursor-based parallax on the hero background/text, and the
 *  "Explore our work" link scrolling smoothly to the gallery. Skipped
 *  entirely for touch devices and people who prefer reduced motion. */
function initHeroInteractions(){
  const hero = qs('#heroSection');
  const photo = qs('#heroPhoto');
  const inner = qs('#heroInner');
  if(!hero || !photo || !inner) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if(!prefersReducedMotion && !isTouch){
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5..0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      photo.style.transform = `translate(${relX * -14}px, ${relY * -14}px)`;
      inner.style.transform = `translate(${relX * 8}px, ${relY * 8}px)`;
    });
    hero.addEventListener('mouseleave', () => {
      photo.style.transform = '';
      inner.style.transform = '';
    });
  }

  const exploreBtn = qs('#heroExploreBtn');
  const galleryHeading = qs('#galleryFilters');
  if(exploreBtn && galleryHeading){
    exploreBtn.addEventListener('click', () => {
      galleryHeading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

/* ---------------------------------------------------------------------- */
/* 9. FAQ QUICK-ANSWERS WIDGET (rule-based — not a live AI connection)    */
/* ---------------------------------------------------------------------- */

const FAQ_DATA = [
  { q: 'What areas do you serve?', a: 'We serve nationwide. Get in touch if you\u2019re just outside this area \u2014 we may still be able to help.' },
  { q: 'Do you offer free quotes?', a: 'Yes \u2014 site visits and quotes are free. Use the quote form on this site or message us on WhatsApp to get started.' },
  { q: 'How long does a typical project take?', a: 'It depends on scope. A single room fit-out might take 1\u20133 weeks, while a full build can take several months. We\u2019ll give you a realistic timeline after a site visit.' },
  { q: 'Are you insured and registered?', a: 'Yes \u2014 we\u2019re an NCA registered contractor and fully insured & bonded.' },
  { q: 'What payment methods do you accept?', a: 'M-Pesa and bank transfer, with a staged payment schedule agreed before work begins.' },
  { q: 'Can I see more of your work?', a: 'Definitely \u2014 check out the \u201cRecent work\u201d gallery on the homepage. You can filter it by Construction, Interiors, Lighting and more.' },
  { q: 'How do I leave a review?', a: 'Create a free account and post a review from your client dashboard \u2014 we\u2019d love to hear about your project.' },
];

function initFaqWidget(){
  const widget = qs('#faqWidget');
  const launcher = qs('#faqLauncher');
  const closeBtn = qs('#faqPanelClose');
  const chipsEl = qs('#faqChips');
  const messagesEl = qs('#faqMessages');

  chipsEl.innerHTML = FAQ_DATA.map((item, i) =>
    `<button class="faq-chip" data-faq-index="${i}">${item.q}</button>`
  ).join('');

  function setOpen(open){
    widget.classList.toggle('is-open', open);
    launcher.setAttribute('aria-expanded', open);
  }

  launcher.addEventListener('click', () => setOpen(!widget.classList.contains('is-open')));
  closeBtn.addEventListener('click', () => setOpen(false));

  qsa('[data-faq-index]', chipsEl).forEach(btn => {
    btn.addEventListener('click', () => {
      const item = FAQ_DATA[+btn.dataset.faqIndex];

      const userBubble = document.createElement('div');
      userBubble.className = 'faq-message faq-message-user';
      userBubble.textContent = item.q;

      const botBubble = document.createElement('div');
      botBubble.className = 'faq-message faq-message-bot';
      botBubble.textContent = item.a;

      messagesEl.appendChild(userBubble);
      messagesEl.appendChild(botBubble);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  });

  // Close the panel when clicking anywhere outside it
  document.addEventListener('click', (e) => {
    if(widget.classList.contains('is-open') && !widget.contains(e.target)) setOpen(false);
  });
}

/* ---------------------------------------------------------------------- */
/* 10. INIT                                                               */
/* ---------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  seedDataIfEmpty();

  initPageNavigation();
  initMobileNav();
  initPasswordToggles();
  initGalleryFilters();
  initTabGroup('.tab', '.tab-panel', 'is-active');       // login/register tabs
  initTabGroup('.subtab', '.subtab-panel', 'is-active'); // dashboard + admin subtabs

  initAuthForms();
  initReviewForm();
  initFeedForm();
  initContactForm();

  initAdminLogin();
  initWorkForm();
  initCompareForm();
  initFaqWidget();
  initHeroInteractions();
  initEstimator();
  initLightbox();

  window.addEventListener('resize', updateNavPill);

  updateNavForAuthState();
  renderHome();
  qs('#copyYear').textContent = new Date().getFullYear();

  // Land on whichever page is already marked active (home, by default)
  showPage('home');
});
