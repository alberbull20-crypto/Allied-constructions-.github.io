/* ==========================================================================
   MWANGI CONSTRUCTION — STYLESHEET
   Design concept: "site blueprint" — deep blueprint-navy, safety-sign amber
   and concrete-plaster neutrals, with a technical/architectural grid motif
   reserved for the hero only. Space Grotesk for headings, Inter for body.
   ========================================================================== */

:root{
  /* Palette */
  --navy:        #10213B;   /* blueprint ink */
  --navy-soft:   #1B3358;   /* lighter navy for panels on dark */
  --amber:       #E8A324;   /* safety-sign amber (primary accent) */
  --amber-dark:  #C4860F;
  --rust:        #B24C2F;   /* murram-earth red — used sparingly */
  --concrete:    #EFEAE1;   /* plaster/concrete background */
  --concrete-2:  #E3DCCF;
  --steel:       #5B6472;   /* steel grey for borders/secondary text */
  --steel-light: #C7CCD3;
  --ink:         #1B2430;   /* body text on light */
  --white:       #FFFFFF;

  --font-head: 'Space Grotesk', 'Segoe UI', sans-serif;
  --font-body: 'Inter', 'Segoe UI', sans-serif;

  --radius-sm: 6px;
  --radius-md: 10px;
  --container: 1120px;
}

/* ---------- Reset ---------- */
*, *::before, *::after{ box-sizing: border-box; }
html{ scroll-behavior: smooth; }
body{
  margin: 0;
  font-family: var(--font-body);
  color: var(--ink);
  background: var(--concrete);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4{
  font-family: var(--font-head);
  color: var(--navy);
  margin: 0 0 .5em;
  line-height: 1.15;
}
p{ margin: 0 0 1em; }
ul{ list-style: none; margin: 0; padding: 0; }
img{ max-width: 100%; display: block; }
button{ font-family: inherit; }
a{ color: inherit; }

:focus-visible{
  outline: 3px solid var(--amber);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce){
  html{ scroll-behavior: auto; }
  *{ animation-duration: .01ms !important; transition-duration: .01ms !important; }
}

/* ---------- Layout helpers ---------- */
.section{
  max-width: var(--container);
  margin: 0 auto;
  padding: 56px 20px;
}
.section-tinted{ background: var(--concrete-2); max-width: none; }
.section-tinted > *{ max-width: var(--container); margin-left: auto; margin-right: auto; }
.section-head{ margin-bottom: 28px; max-width: 560px; }
.section-head p{ color: var(--steel); margin: 0; }

.is-hidden{ display: none !important; }

/* ---------- Buttons ---------- */
.btn{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 13px 24px;
  border-radius: var(--radius-sm);
  border: 1.5px solid transparent;
  font-weight: 600;
  font-size: .95rem;
  cursor: pointer;
  transition: transform .12s ease, background-color .15s ease, border-color .15s ease;
}
.btn:active{ transform: translateY(1px); }
.btn-primary{
  background: var(--amber);
  color: var(--navy);
}
.btn-primary:hover{ background: var(--amber-dark); }
.btn-ghost{
  background: transparent;
  border-color: currentColor;
  color: inherit;
}
.btn-ghost:hover{ background: rgba(255,255,255,.08); }
.btn-block{ width: 100%; }
.btn-whatsapp{
  background: #25D366;
  color: #0B3D22;
  text-decoration: none;
}
.btn-whatsapp:hover{ background: #1EBE5A; }
.wa-icon{ color: #0B3D22; font-size: .6em; }

.link-btn{
  background: none;
  border: none;
  padding: 0;
  color: var(--navy);
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
}

/* ==========================================================================
   NAVBAR
   ========================================================================== */
.navbar{
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--navy);
  border-bottom: 3px solid var(--amber);
}
.nav-inner{
  max-width: var(--container);
  margin: 0 auto;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.brand{
  display: flex;
  align-items: center;
  gap: 12px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  padding: 0;
}
.brand-mark{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  background: var(--amber);
  color: var(--navy);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;
}
.brand-text{
  font-family: var(--font-head);
  font-weight: 600;
  color: var(--white);
  font-size: 1rem;
  line-height: 1.2;
}
.brand-text small{
  display: block;
  font-family: var(--font-body);
  font-weight: 400;
  color: var(--steel-light);
  font-size: .72rem;
}

.nav-links{
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
}
.nav-pill{
  position: absolute;
  top: 4px;
  left: 0;
  height: calc(100% - 8px);
  background: var(--navy-soft);
  border-radius: var(--radius-sm);
  z-index: 0;
  opacity: 0;
  transition: transform .3s cubic-bezier(.22,.61,.36,1), width .3s cubic-bezier(.22,.61,.36,1), opacity .2s ease;
}
.nav-link{
  position: relative;
  z-index: 1;
  background: none;
  border: none;
  color: var(--steel-light);
  font-weight: 600;
  font-size: .9rem;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color .15s ease, color .15s ease;
}
.nav-link:hover{ color: var(--white); background: rgba(255,255,255,.08); }
.nav-link.is-current{ color: var(--amber); }

.nav-toggle{
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 34px;
  height: 34px;
  background: none;
  border: none;
  cursor: pointer;
}
.nav-toggle span{
  display: block;
  height: 2px;
  background: var(--white);
  border-radius: 2px;
}

@media (max-width: 760px){
  .nav-toggle{ display: flex; }
  .nav-links{
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    background: var(--navy);
    padding: 8px 20px 16px;
    border-bottom: 3px solid var(--amber);
    display: none;
  }
  .nav-links.is-open{ display: flex; }
  .nav-link{ text-align: left; padding: 12px 8px; }
}

/* ==========================================================================
   PAGES
   ========================================================================== */
.page{ display: none; }
.page.is-active{ display: block; animation: pageIn .25s ease; }
@keyframes pageIn{
  from{ opacity: 0; transform: translateY(6px); }
  to{ opacity: 1; transform: translateY(0); }
}

/* ==========================================================================
   HERO — cinematic, full-bleed, with glass cards and subtle parallax
   ========================================================================== */
.hero{
  position: relative;
  background: var(--navy);
  color: var(--white);
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 120px 20px 40px;
}
.hero-photo{
  position: absolute;
  inset: -4%;
  background-size: cover;
  background-position: center 35%;
  animation: heroSlowZoom 20s ease-in-out infinite alternate;
  will-change: transform;
}
@keyframes heroSlowZoom{
  from{ transform: scale(1); }
  to{ transform: scale(1.09); }
}
.hero-overlay{
  position: absolute;
  inset: 0;
  background: linear-gradient(100deg, var(--navy) 0%, rgba(16,33,59,.95) 38%, rgba(16,33,59,.62) 75%, rgba(16,33,59,.45) 100%);
}
.hero-grid{
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(90deg, rgba(255,255,255,.07) 0 1px, transparent 1px 64px),
    repeating-linear-gradient(0deg, rgba(255,255,255,.07) 0 1px, transparent 1px 64px);
  mask-image: radial-gradient(ellipse 90% 70% at 70% 30%, black 40%, transparent 85%);
}
.hero-grain{
  position: absolute;
  inset: 0;
  opacity: .05;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

.hero-inner{
  position: relative;
  max-width: var(--container);
  width: 100%;
  margin: 0 auto;
  will-change: transform;
}

/* Entrance animation: staggered blur-to-clear fade-up, delay set per-element via --d */
.hero-anim{
  opacity: 0;
  transform: translateY(18px);
  filter: blur(6px);
  animation: heroEnter .7s cubic-bezier(.22,.61,.36,1) both;
  animation-delay: var(--d, 0s);
}
@keyframes heroEnter{
  to{ opacity: 1; transform: translateY(0); filter: blur(0); }
}

.hero-eyebrow{
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--white);
  font-weight: 600;
  letter-spacing: .08em;
  text-transform: uppercase;
  margin-bottom: 18px;
  font-size: .78rem;
}
.hero-eyebrow-tick{
  display: inline-block;
  width: 28px;
  height: 1.5px;
  background: var(--amber);
}

.hero-title{
  margin-bottom: .5em;
  line-height: .84;
}
.hero-title-sans{
  display: block;
  font-family: var(--font-head);
  font-weight: 700;
  color: var(--white);
  font-size: clamp(2.6rem, 7vw, 4.6rem);
  letter-spacing: -.01em;
}
.hero-title-serif{
  display: block;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-style: italic;
  color: var(--amber);
  -webkit-text-stroke: .5px var(--navy);
  font-size: clamp(3rem, 8.5vw, 5.6rem);
}

.hero-lede{
  max-width: 42ch;
  color: var(--steel-light);
  font-size: 1.02rem;
}
.hero-actions{
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 22px 0 18px;
}

/* "Explore our work" underline + arrow CTA */
.hero-explore{
  background: none;
  border: none;
  color: var(--white);
  font-weight: 600;
  font-size: .92rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  position: relative;
  margin-bottom: 8px;
}
.hero-explore::after{
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  height: 1px;
  background: rgba(255,255,255,.35);
}
.hero-explore::before{
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 0%;
  height: 1px;
  background: var(--amber);
  transition: width .3s ease;
}
.hero-explore:hover::before{ width: 100%; }
.hero-explore svg{
  width: 16px; height: 16px;
  fill: none; stroke: currentColor; stroke-width: 1.8;
  transition: transform .25s ease;
}
.hero-explore:hover svg{ transform: translateX(5px); }

/* ---------- Bottom glass card row ---------- */
.hero-bottom{
  position: relative;
  max-width: var(--container);
  width: 100%;
  margin: 36px auto 0;
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 14px;
}
.hero-card{
  background: rgba(16,33,59,.55);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,.14);
  border-radius: var(--radius-md);
  padding: 14px 16px;
}
.hero-card-reviews{
  min-width: 168px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.hero-card-reviews-top{
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.hero-card-reviews-top span{
  font-family: var(--font-head);
  font-weight: 600;
  font-size: .85rem;
  line-height: 1.2;
  color: var(--white);
}
.hero-avatars{ display: flex; }
.hero-avatars img{
  width: 26px; height: 26px;
  border-radius: 50%;
  border: 2px solid var(--navy);
  object-fit: cover;
  margin-left: -8px;
}
.hero-avatars img:first-child{ margin-left: 0; }
.hero-card-divider{ height: 1px; background: rgba(255,255,255,.15); }
.hero-card-reviews-bottom{
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: .85rem;
  color: var(--white);
}
.hero-card-reviews-bottom strong{ font-family: var(--font-head); font-size: 1rem; }
.hero-star{ color: var(--amber); }
.hero-pill-outline{
  margin-left: auto;
  border: 1px solid rgba(255,255,255,.3);
  border-radius: 999px;
  font-size: .7rem;
  padding: 3px 10px;
  color: var(--steel-light);
}

.hero-card-feature{
  position: relative;
  width: 150px;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.16);
  padding: 0;
}
.hero-card-feature img{
  width: 100%; height: 100%;
  min-height: 100px;
  object-fit: cover;
  display: block;
  transition: transform .6s ease;
}
.hero-card-feature:hover img{ transform: scale(1.08); }
.hero-card-feature-label{
  position: absolute;
  left: 10px; bottom: 10px;
  background: rgba(16,33,59,.75);
  color: var(--white);
  font-size: .68rem;
  font-weight: 600;
  padding: 4px 9px;
  border-radius: 999px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity .25s ease, transform .25s ease;
}
.hero-card-feature:hover .hero-card-feature-label{ opacity: 1; transform: translateY(0); }

.hero-stat-pill{
  align-self: center;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.18);
  border-radius: 999px;
  padding: 8px 16px;
  font-size: .78rem;
  color: var(--white);
  white-space: nowrap;
}
.hero-status-dot{
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--white);
  box-shadow: 0 0 0 0 rgba(255,255,255,.6);
  animation: heroPulse 2.2s ease-out infinite;
}
@keyframes heroPulse{
  0%{ box-shadow: 0 0 0 0 rgba(255,255,255,.5); }
  100%{ box-shadow: 0 0 0 8px rgba(255,255,255,0); }
}

.hero-cta-row{
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}
.hero-membership{
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(120deg, rgba(16,33,59,.75), rgba(255,255,255,.12));
  border: 1px solid rgba(255,255,255,.22);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-radius: 999px;
  padding: 10px 20px 10px 10px;
  color: var(--white);
  font-weight: 600;
  font-size: .85rem;
  cursor: pointer;
  transition: transform .18s ease;
}
.hero-membership:hover{ transform: translateY(-2px); }
.hero-avatars-stack img{ width: 28px; height: 28px; }

.hero-diamond{
  width: 42px; height: 42px;
  flex-shrink: 0;
  background: var(--amber);
  border: none;
  border-radius: 8px;
  transform: rotate(45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform .2s ease, background-color .2s ease;
}
.hero-diamond:hover{ transform: rotate(45deg) scale(1.08); background: var(--amber-dark); }
.hero-diamond svg{
  transform: rotate(-45deg);
  width: 18px; height: 18px;
  fill: none; stroke: var(--navy); stroke-width: 2;
}

.hero-scroll-indicator{
  position: absolute;
  right: 28px;
  bottom: 22px;
  display: none;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--steel-light);
  font-size: .68rem;
  letter-spacing: .1em;
  text-transform: uppercase;
}
.hero-scroll-line{
  position: relative;
  width: 1px;
  height: 46px;
  background: rgba(255,255,255,.25);
  overflow: hidden;
}
.hero-scroll-highlight{
  position: absolute;
  left: 0; top: -100%;
  width: 100%; height: 100%;
  background: var(--white);
  animation: heroScrollMove 2.4s ease-in-out infinite;
}
@keyframes heroScrollMove{
  0%{ top: -100%; }
  60%{ top: 100%; }
  100%{ top: 100%; }
}

@media (min-width: 900px){
  .hero-scroll-indicator{ display: flex; }
}
@media (max-width: 760px){
  .hero{ min-height: 94vh; padding-top: 100px; padding-bottom: 96px; }
  .hero-photo{ background-position: right 35%; }
  .hero-bottom{ flex-direction: column; align-items: stretch; }
  .hero-card-feature{ width: 100%; height: 110px; }
  .hero-card-feature img{ height: 110px; }
  .hero-stat-pill{ align-self: flex-start; }
  .hero-cta-row{ margin-left: 0; }
}
@media (prefers-reduced-motion: reduce){
  .hero-photo{ animation: none; }
  .hero-status-dot{ animation: none; }
  .hero-scroll-highlight{ animation: none; }
}

/* ---------- Trust bar ---------- */
.trust-bar{
  background: var(--navy-soft);
  color: var(--white);
}
.trust-bar-inner{
  max-width: var(--container);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.trust-bar-inner span{
  padding: 13px 22px;
  font-size: .82rem;
  font-weight: 600;
  border-right: 1px solid rgba(255,255,255,.15);
}
.trust-bar-inner span:last-child{ border-right: none; }

/* ---------- Brand quote ---------- */
.quote-strip{
  max-width: 720px;
  margin: 0 auto;
  padding: 44px 20px 8px;
  text-align: center;
}
.quote-strip p{
  font-family: var(--font-head);
  font-size: clamp(1.15rem, 2.4vw, 1.5rem);
  font-weight: 500;
  color: var(--navy);
  line-height: 1.4;
  margin: 0;
}

/* ---------- Services strip ---------- */
.services{ padding-top: 40px; padding-bottom: 8px; }
.services-list{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
}
.services-list li{
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--white);
  border: 1px solid var(--concrete-2);
  border-radius: var(--radius-sm);
  padding: 14px 16px;
  font-weight: 600;
  font-size: .92rem;
  color: var(--navy);
}
.service-icon{
  display: inline-flex;
  flex-shrink: 0;
  width: 22px;
  height: 22px;
}
.service-icon svg{
  width: 100%;
  height: 100%;
  fill: none;
  stroke: var(--amber-dark);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ---------- How we work ---------- */
.process-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin: 0;
  padding: 0;
}
.process-step{ list-style: none; }
.process-num{
  display: block;
  font-family: var(--font-head);
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--amber);
  -webkit-text-stroke: 1px var(--navy);
  opacity: .85;
  margin-bottom: 6px;
}
.process-step h4{ font-size: 1rem; margin-bottom: 6px; }
.process-step p{ font-size: .88rem; color: var(--steel); margin: 0; }

/* ---------- Before / After compare slider ---------- */
.compare-list{
  display: grid;
  gap: 32px;
}
.compare-slider{ max-width: 720px; }
.compare-title{
  font-family: var(--font-head);
  font-weight: 600;
  color: var(--navy);
  margin-bottom: 10px;
  font-size: 1.05rem;
}
.compare-frame{
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--concrete-2);
  cursor: ew-resize;
  touch-action: pan-y;
  user-select: none;
}
.compare-img{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}
.compare-after-wrap{
  position: absolute;
  inset: 0;
  clip-path: inset(0 50% 0 0);
}
.compare-handle{
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 3px;
  background: var(--white);
  transform: translateX(-50%);
  pointer-events: none;
}
.compare-handle-grip{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38px; height: 38px;
  border-radius: 50%;
  background: var(--white);
  box-shadow: 0 4px 14px rgba(16,33,59,.3);
  display: flex;
  align-items: center;
  justify-content: center;
}
.compare-handle-grip svg{
  width: 18px; height: 18px;
  fill: none; stroke: var(--navy); stroke-width: 2;
}
.compare-tag{
  position: absolute;
  top: 12px;
  background: rgba(16,33,59,.72);
  color: var(--white);
  font-size: .72rem;
  font-weight: 700;
  letter-spacing: .04em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 999px;
}
.compare-tag-before{ left: 12px; }
.compare-tag-after{ right: 12px; }
.compare-desc{ font-size: .88rem; color: var(--steel); margin: 10px 0 0; }

/* ---------- Gallery ---------- */
.gallery-filters{
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.filter-btn{
  background: var(--white);
  border: 1.5px solid var(--concrete-2);
  color: var(--steel);
  font-weight: 600;
  font-size: .85rem;
  padding: 8px 16px;
  border-radius: 999px;
  cursor: pointer;
  transition: border-color .15s ease, color .15s ease, background-color .15s ease;
}
.filter-btn:hover{ border-color: var(--amber); }
.filter-btn.is-active{ background: var(--navy); border-color: var(--navy); color: var(--white); }
.gallery-grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}
.gallery-card{
  background: var(--white);
  border: 1px solid var(--concrete-2);
  border-radius: var(--radius-md);
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease;
}
.gallery-card:hover{
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(16,33,59,.12);
}
.gallery-card img{
  width: 100%;
  height: 190px;
  object-fit: cover;
}
.gallery-card-body{ padding: 14px 16px; }
.gallery-card-body h4{ font-size: 1rem; margin-bottom: 4px; }
.gallery-card-body p{
  font-size: .85rem;
  color: var(--steel);
  margin: 0;
}
.category-badge{
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(16,33,59,.85);
  color: var(--amber);
  font-size: .72rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  text-transform: capitalize;
}

/* ---------- Review marquee (auto-scrolling social proof) ---------- */
.marquee-section{
  background: var(--navy);
  overflow: hidden;
  padding: 22px 0;
}
.marquee-track{
  display: flex;
  gap: 16px;
  width: max-content;
  animation: marqueeScroll 34s linear infinite;
}
.marquee-section:hover .marquee-track{ animation-play-state: paused; }
@keyframes marqueeScroll{
  from{ transform: translateX(0); }
  to{ transform: translateX(-50%); }
}
.marquee-chip{
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,.07);
  border: 1px solid rgba(255,255,255,.14);
  border-radius: 999px;
  padding: 9px 18px 9px 9px;
  color: var(--white);
  white-space: nowrap;
  font-size: .84rem;
}
.marquee-chip img{
  width: 28px; height: 28px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.marquee-chip .stars{ font-size: .8rem; margin-left: 2px; }
.marquee-chip strong{ font-weight: 600; }
@media (prefers-reduced-motion: reduce){
  .marquee-track{ animation: none; }
}

/* ---------- Gallery lightbox ---------- */
.lightbox{
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(10,16,26,.94);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease;
}
.lightbox.is-open{ opacity: 1; pointer-events: auto; }
.lightbox-figure{
  max-width: min(90vw, 900px);
  max-height: 86vh;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.lightbox-img{
  max-width: 100%;
  max-height: 74vh;
  object-fit: contain;
  border-radius: var(--radius-sm);
}
.lightbox-caption{
  color: var(--white);
  font-size: .88rem;
  margin-top: 14px;
  text-align: center;
}
.lightbox-close{
  position: absolute;
  top: 20px; right: 24px;
  background: none;
  border: none;
  color: var(--white);
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
}
.lightbox-nav{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,.1);
  border: 1px solid rgba(255,255,255,.25);
  color: var(--white);
  width: 44px; height: 44px;
  border-radius: 50%;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lightbox-nav:hover{ background: rgba(255,255,255,.2); }
.lightbox-prev{ left: 16px; }
.lightbox-next{ right: 16px; }
@media (max-width: 600px){
  .lightbox-nav{ width: 38px; height: 38px; font-size: 1.3rem; }
  .lightbox-close{ top: 12px; right: 14px; }
}

/* ---------- Reviews ---------- */
.reviews-grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 18px;
}
.review-card{
  background: var(--white);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--rust);
  padding: 18px 20px;
}
.review-head{
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.review-avatar{
  width: 42px;
  height: 42px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}
.review-name{ font-weight: 700; font-size: .92rem; color: var(--navy); }
.review-date{ font-size: .75rem; color: var(--steel); }
.review-text{ font-size: .92rem; margin: 0 0 10px; }
.review-photo{
  border-radius: var(--radius-sm);
  max-height: 160px;
  object-fit: cover;
  margin-top: 8px;
}

.stars{ color: var(--amber); letter-spacing: 2px; font-size: 1rem; white-space: nowrap; }
.stars .dim{ color: var(--steel-light); }

/* ---------- Rating summary ---------- */
.rating-summary{
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  align-items: center;
  background: var(--white);
  border: 1px solid var(--concrete-2);
  border-radius: var(--radius-md);
  padding: 24px 28px;
  margin-bottom: 24px;
}
.rating-score{ text-align: center; }
.rating-score-num{
  font-family: var(--font-head);
  font-size: 2.6rem;
  font-weight: 700;
  color: var(--navy);
  line-height: 1;
}
.rating-score-count{ font-size: .8rem; color: var(--steel); margin-top: 4px; }
.rating-bars{ flex: 1 1 220px; display: grid; gap: 6px; min-width: 200px; }
.rating-bar-row{ display: flex; align-items: center; gap: 8px; font-size: .78rem; color: var(--steel); }
.rating-bar-row span:first-child{ width: 38px; flex-shrink: 0; }
.rating-bar-track{ flex: 1; height: 6px; border-radius: 4px; background: var(--concrete-2); overflow: hidden; }
.rating-bar-fill{ height: 100%; background: var(--amber); border-radius: 4px; }
.rating-bar-row span:last-child{ width: 22px; text-align: right; flex-shrink: 0; }

/* ---------- Verified badge & owner reply ---------- */
.verified-badge{
  display: inline-block;
  font-size: .68rem;
  font-weight: 700;
  color: #2E7D32;
  background: #E8F5E9;
  padding: 2px 8px;
  border-radius: 999px;
  margin-left: 8px;
  vertical-align: middle;
}
.owner-reply{
  margin-top: 12px;
  padding: 12px 14px;
  background: var(--concrete);
  border-left: 3px solid var(--amber);
  border-radius: var(--radius-sm);
}
.owner-reply-label{
  font-size: .78rem;
  font-weight: 700;
  color: var(--navy);
  margin-bottom: 2px;
}
.owner-reply p{ font-size: .85rem; margin: 0; color: var(--ink); }

/* ---------- CTA banner ---------- */
.cta-banner{
  background: var(--amber);
  color: var(--navy);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 40px 20px;
}
.cta-banner > div{ max-width: var(--container); margin: 0 auto; flex: 1 1 320px; }
.cta-banner h2{ margin-bottom: 4px; }
.cta-banner p{ margin: 0; color: #4a3a12; }
.cta-banner .btn{ flex-shrink: 0; }
.cta-banner-actions{ display: flex; gap: 12px; flex-wrap: wrap; }

/* ---------- Find us / map ---------- */
.findus-grid{
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 24px;
  align-items: stretch;
}
.findus-map{
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--concrete-2);
  min-height: 280px;
}
.findus-map iframe{
  width: 100%;
  height: 100%;
  min-height: 280px;
  border: 0;
  display: block;
}
.findus-details{
  background: var(--white);
  border: 1px solid var(--concrete-2);
  border-radius: var(--radius-md);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}
.findus-details dl{ margin: 0; display: grid; gap: 14px; }
.findus-details dt{ font-size: .78rem; font-weight: 700; color: var(--amber-dark); margin-bottom: 2px; }
.findus-details dd{ margin: 0; font-size: .95rem; color: var(--ink); }
.btn-navy{ color: var(--navy); border-color: var(--navy); align-self: flex-start; }
.btn-navy:hover{ background: var(--navy); color: var(--white); }

@media (max-width: 760px){
  .findus-grid{ grid-template-columns: 1fr; }
  .findus-map{ min-height: 220px; }
}

/* ---------- Site-visit checklist ---------- */
.checklist-grid{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.checklist-item{
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: var(--white);
  border: 1px solid var(--concrete-2);
  border-radius: var(--radius-md);
  padding: 16px 18px;
  font-size: .92rem;
  color: var(--ink);
  line-height: 1.45;
}
.checklist-icon{
  flex-shrink: 0;
  width: 26px; height: 26px;
  border-radius: 50%;
  background: var(--navy);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1px;
}
.checklist-icon svg{
  width: 14px; height: 14px;
  fill: none;
  stroke: var(--amber);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* ---------- Cost estimator ---------- */
.estimator-card{
  max-width: 620px;
  background: var(--white);
  border: 1px solid var(--concrete-2);
  border-radius: var(--radius-md);
  padding: 28px;
}
.estimator-card form{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: end;
}
.estimator-card form .btn{ grid-column: 1 / -1; }
.estimator-result{
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--concrete-2);
}
.estimator-label{ font-size: .8rem; font-weight: 700; color: var(--amber-dark); margin: 0 0 4px; }
.estimator-range{
  font-family: var(--font-head);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--navy);
  margin: 0 0 10px;
}
.estimator-disclaimer{ font-size: .82rem; color: var(--steel); margin: 0 0 16px; }

@media (max-width: 520px){
  .estimator-card form{ grid-template-columns: 1fr; }
}

/* ==========================================================================
   AUTH PAGES
   ========================================================================== */
.auth-wrap{
  min-height: calc(100vh - 200px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 20px;
}
.auth-card{
  width: 100%;
  max-width: 420px;
  background: var(--white);
  border: 1px solid var(--concrete-2);
  border-radius: var(--radius-md);
  padding: 32px;
}
.tabs{
  display: flex;
  border-bottom: 2px solid var(--concrete-2);
  margin-bottom: 24px;
}
.tab{
  flex: 1;
  background: none;
  border: none;
  padding: 10px 6px;
  font-weight: 600;
  color: var(--steel);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}
.tab.is-active{ color: var(--navy); border-color: var(--amber); }

.tab-panel{ display: none; }
.tab-panel.is-active{ display: block; }

.form-title{ font-size: 1.4rem; margin-bottom: 6px; }
.form-hint{ font-size: .85rem; color: var(--steel); margin-bottom: 20px; }

.field{ display: block; margin-bottom: 16px; }
.field > span{
  display: block;
  font-size: .85rem;
  font-weight: 600;
  color: var(--navy);
  margin-bottom: 6px;
}
.field input[type="text"],
.field input[type="email"],
.field input[type="tel"],
.field input[type="password"],
.field textarea{
  width: 100%;
  padding: 11px 13px;
  border: 1.5px solid var(--concrete-2);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: .95rem;
  background: var(--concrete);
  color: var(--ink);
  transition: border-color .15s ease;
}
.field input:focus, .field textarea:focus{
  outline: none;
  border-color: var(--amber);
  background: var(--white);
}
.field textarea{ resize: vertical; min-height: 80px; }
.field input[type="file"]{
  width: 100%;
  font-size: .85rem;
  padding: 8px 0;
}
.field select{
  width: 100%;
  padding: 11px 13px;
  border: 1.5px solid var(--concrete-2);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: .95rem;
  background: var(--concrete);
  color: var(--ink);
}
.password-wrap{ position: relative; }
.password-wrap input{ padding-right: 42px; }
.password-toggle{
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  color: var(--steel);
}
.password-toggle svg{
  width: 18px;
  height: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
}
.password-toggle.is-active{ color: var(--amber-dark); }
.form-actions{ display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.field-note{ display: block; font-size: .78rem; color: var(--steel); margin-top: 4px; }
.field-error{
  color: var(--rust);
  font-size: .85rem;
  min-height: 1.2em;
  margin: -6px 0 12px;
}
.field-success{
  color: #2E7D32;
  font-size: .85rem;
  margin: -6px 0 12px;
  font-weight: 600;
}
.photo-preview{
  margin-top: 10px;
  max-height: 140px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--concrete-2);
}

.auth-admin-link{
  text-align: center;
  font-size: .85rem;
  margin-top: 20px;
  margin-bottom: 0;
  color: var(--steel);
}

/* ==========================================================================
   DASHBOARD (shared client + admin)
   ========================================================================== */
.dash-header{
  max-width: var(--container);
  margin: 0 auto;
  padding: 40px 20px 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.dash-eyebrow{
  color: var(--amber-dark);
  font-weight: 700;
  font-size: .8rem;
  text-transform: uppercase;
  letter-spacing: .04em;
  margin-bottom: 4px;
}
.dash-header h1{ margin-bottom: 0; font-size: 1.7rem; }

.subtabs{
  max-width: var(--container);
  margin: 20px auto 0;
  padding: 0 20px;
  display: flex;
  gap: 6px;
  border-bottom: 2px solid var(--concrete-2);
  overflow-x: auto;
}
.subtab{
  background: none;
  border: none;
  padding: 12px 16px;
  font-weight: 600;
  font-size: .9rem;
  color: var(--steel);
  cursor: pointer;
  border-bottom: 3px solid transparent;
  margin-bottom: -2px;
  white-space: nowrap;
}
.subtab.is-active{ color: var(--navy); border-color: var(--amber); }

.subtab-panel{
  display: none;
  max-width: var(--container);
  margin: 0 auto;
  padding: 28px 20px 64px;
}
.subtab-panel.is-active{
  display: grid;
  gap: 24px;
}
.subtab-panel[data-tabpanel="feed"].is-active,
.subtab-panel[data-tabpanel="manage"].is-active,
.subtab-panel[data-tabpanel="areviews"].is-active,
.subtab-panel[data-tabpanel="messages"].is-active{
  display: block;
}

.panel-card{
  background: var(--white);
  border: 1px solid var(--concrete-2);
  border-radius: var(--radius-md);
  padding: 24px;
}
.panel-card h3{ font-size: 1.1rem; margin-bottom: 16px; }
.panel-card-narrow{ max-width: 560px; }

@media (min-width: 860px){
  .subtab-panel[data-tabpanel="review"].is-active{
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

/* ---------- Star rating input ---------- */
.star-input{ display: flex; gap: 6px; }
.star-input button{
  background: none;
  border: none;
  font-size: 1.7rem;
  line-height: 1;
  color: var(--steel-light);
  cursor: pointer;
  padding: 2px;
}
.star-input button.is-filled{ color: var(--amber); }

/* ---------- Stacked lists (reviews mine, feed, admin lists) ---------- */
.stacked-list{ display: grid; gap: 14px; }
.list-item{
  background: var(--white);
  border: 1px solid var(--concrete-2);
  border-radius: var(--radius-md);
  padding: 16px 18px;
}
.list-item-empty{
  color: var(--steel);
  font-size: .9rem;
  text-align: center;
  padding: 24px;
  border: 1px dashed var(--steel-light);
  border-radius: var(--radius-md);
}

/* ---------- Community feed ---------- */
.feed-list{ margin-top: 4px; }
.feed-post-head{
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 6px;
}
.feed-author{ font-weight: 700; color: var(--navy); font-size: .9rem; }
.feed-date{ font-size: .75rem; color: var(--steel); }
.feed-text{ margin: 0 0 10px; font-size: .92rem; }
.feed-reply-toggle{
  background: none;
  border: none;
  color: var(--amber-dark);
  font-weight: 600;
  font-size: .82rem;
  cursor: pointer;
  padding: 0;
}
.feed-actions{ display: flex; gap: 16px; align-items: center; }
.feed-helpful{
  background: none;
  border: none;
  color: var(--steel);
  font-weight: 600;
  font-size: .82rem;
  cursor: pointer;
  padding: 0;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.feed-helpful svg{ width: 15px; height: 15px; fill: none; stroke: currentColor; stroke-width: 1.6; }
.feed-helpful.is-liked{ color: var(--amber-dark); }
.feed-helpful.is-liked svg{ fill: var(--amber); }
.feed-replies{
  margin-top: 12px;
  padding-left: 16px;
  border-left: 2px solid var(--concrete-2);
  display: grid;
  gap: 10px;
}
.feed-reply-form{
  display: none;
  margin-top: 12px;
  gap: 8px;
}
.feed-reply-form.is-open{ display: flex; }
.feed-reply-form input{
  flex: 1;
  padding: 9px 12px;
  border: 1.5px solid var(--concrete-2);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  background: var(--concrete);
}
.feed-reply-form input:focus{ outline: none; border-color: var(--amber); background: var(--white); }
.feed-reply-form button{
  padding: 9px 16px;
  font-size: .85rem;
}

/* ---------- Admin ---------- */
.dash-header-admin{ background: var(--navy-soft); border-radius: var(--radius-md); color: var(--white); max-width: var(--container); }
.dash-header-admin .dash-eyebrow{ color: var(--amber); }
.dash-header-admin h1{ color: var(--white); }
.dash-header-actions{ display: flex; gap: 10px; flex-wrap: wrap; }

.admin-grid{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 18px;
}
.admin-card{
  background: var(--white);
  border: 1px solid var(--concrete-2);
  border-radius: var(--radius-md);
  overflow: hidden;
}
.admin-card img{ width: 100%; height: 160px; object-fit: cover; }
.admin-card-body{ padding: 14px 16px; }
.admin-card-body h4{ font-size: .95rem; margin-bottom: 4px; }
.admin-card-body p{ font-size: .82rem; color: var(--steel); margin: 0 0 12px; }
.admin-card-actions{ display: flex; gap: 10px; }

.admin-compare-thumbs{ display: flex; gap: 8px; margin-bottom: 10px; }
.admin-compare-thumbs img{
  width: 100px; height: 80px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  border: 1px solid var(--concrete-2);
}
.btn-edit{
  background: none;
  border: 1.5px solid var(--steel);
  color: var(--navy);
  padding: 7px 14px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: .8rem;
  cursor: pointer;
}
.btn-edit:hover{ background: var(--navy); border-color: var(--navy); color: var(--white); }
.btn-delete{
  background: none;
  border: 1.5px solid var(--rust);
  color: var(--rust);
  padding: 7px 14px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: .8rem;
  cursor: pointer;
}
.btn-delete:hover{ background: var(--rust); color: var(--white); }

.msg-photo{ max-height: 140px; border-radius: var(--radius-sm); margin-top: 10px; }

/* ==========================================================================
   FOOTER
   ========================================================================== */
.site-footer{
  background: var(--navy);
  color: var(--steel-light);
  margin-top: 40px;
}
.footer-inner{
  max-width: var(--container);
  margin: 0 auto;
  padding: 36px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
}
.footer-inner p{ margin: 0; font-size: .88rem; }
.footer-inner > div:first-child{ display: flex; align-items: center; gap: 12px; }
.footer-contact p{ margin-bottom: 6px; }
.footer-label{
  display: inline-block;
  min-width: 52px;
  color: var(--amber);
  font-weight: 600;
  font-size: .82rem;
  margin-right: 8px;
}
.footer-admin-link{ color: var(--steel-light); font-size: .82rem; }

/* ---------- About / bio page ---------- */
.about-wrap{
  max-width: var(--container);
  margin: 0 auto;
  padding: 64px 20px 80px;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 48px;
  align-items: start;
}
.about-avatar-placeholder{
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  background: var(--navy);
  color: var(--amber);
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.about-photo-note{
  font-size: .78rem;
  color: var(--steel);
  text-align: center;
  margin: 10px 0 0;
  font-style: italic;
}
.about-role{
  font-weight: 600;
  color: var(--amber-dark);
  margin-bottom: 16px;
}
.about-teaser-link{
  display: block;
  margin-top: 12px;
  font-size: .9rem;
}

@media (max-width: 700px){
  .about-wrap{ grid-template-columns: 1fr; }
  .about-photo-col{ max-width: 220px; margin: 0 auto; }
}
.footer-bottom{
  border-top: 1px solid rgba(255,255,255,.1);
  padding: 16px 20px;
  text-align: center;
}
.footer-bottom p{ margin: 0; font-size: .78rem; color: var(--steel-light); }
.footer-whatsapp{
  color: #4ADE80;
  font-weight: 600;
  font-size: .88rem;
  text-decoration: none;
}
.footer-whatsapp:hover{ text-decoration: underline; }

/* ==========================================================================
   TOAST
   ========================================================================== */
.toast{
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translate(-50%, 20px);
  background: var(--navy);
  color: var(--white);
  padding: 12px 22px;
  border-radius: var(--radius-sm);
  border-left: 4px solid var(--amber);
  font-size: .9rem;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease, transform .2s ease;
  z-index: 200;
  max-width: 90vw;
}
.toast.is-visible{
  opacity: 1;
  transform: translate(-50%, 0);
}

/* ==========================================================================
   FAQ QUICK-ANSWERS WIDGET
   ========================================================================== */
.faq-widget{
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 190;
}
.faq-launcher{
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--amber);
  color: var(--navy);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 24px rgba(16,33,59,.28);
  transition: transform .15s ease, background-color .15s ease;
}
.faq-launcher:hover{ transform: scale(1.06); background: var(--amber-dark); }
.faq-launcher svg{
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.faq-launcher .faq-icon-close{ display: none; }
.faq-widget.is-open .faq-launcher .faq-icon-chat{ display: none; }
.faq-widget.is-open .faq-launcher .faq-icon-close{ display: block; }

.faq-panel{
  position: absolute;
  right: 0;
  bottom: 72px;
  width: 320px;
  max-width: calc(100vw - 40px);
  background: var(--white);
  border-radius: var(--radius-md);
  border: 1px solid var(--concrete-2);
  box-shadow: 0 24px 48px rgba(16,33,59,.22);
  display: flex;
  flex-direction: column;
  max-height: 65vh;
  overflow: hidden;
  opacity: 0;
  transform: translateY(14px) scale(.97);
  pointer-events: none;
  transition: opacity .18s ease, transform .18s ease;
}
.faq-widget.is-open .faq-panel{
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

.faq-panel-header{
  background: var(--navy);
  color: var(--white);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.faq-panel-header strong{ display: block; font-size: .92rem; }
.faq-panel-header span{ display: block; font-size: .74rem; color: var(--steel-light); }
.faq-panel-close{
  background: none;
  border: none;
  color: var(--white);
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  padding: 2px 6px;
}

.faq-messages{
  padding: 14px 16px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}
.faq-message{
  font-size: .85rem;
  line-height: 1.45;
  padding: 10px 13px;
  border-radius: var(--radius-sm);
  max-width: 88%;
}
.faq-message-bot{
  background: var(--concrete);
  color: var(--ink);
  align-self: flex-start;
  border-bottom-left-radius: 2px;
}
.faq-message-user{
  background: var(--navy);
  color: var(--white);
  align-self: flex-end;
  border-bottom-right-radius: 2px;
}

.faq-chips{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 16px 16px;
  border-top: 1px solid var(--concrete-2);
  flex-shrink: 0;
  max-height: 140px;
  overflow-y: auto;
}
.faq-chip{
  background: var(--white);
  border: 1.5px solid var(--concrete-2);
  color: var(--navy);
  font-size: .78rem;
  font-weight: 600;
  padding: 7px 12px;
  border-radius: 999px;
  cursor: pointer;
  transition: border-color .15s ease;
}
.faq-chip:hover{ border-color: var(--amber); }

@media (max-width: 480px){
  .faq-widget{ right: 14px; bottom: 14px; }
  .faq-panel{ width: calc(100vw - 28px); }
}

/* ==========================================================================
   RESPONSIVE TWEAKS
   ========================================================================== */
@media (max-width: 600px){
  .hero{ padding-top: 56px; }
  .hero-actions{ flex-direction: column; align-items: stretch; }
  .cta-banner{ flex-direction: column; align-items: flex-start; }
  .cta-banner .btn{ width: 100%; }
  .dash-header{ flex-direction: column; align-items: flex-start; }
}
