(function () {
  const SITE = window.SITE;
  if (!SITE) return;

  // ---------- SEO ----------
  document.title = SITE.seo?.title ?? "Photography";
  const titleEl = document.getElementById("pageTitle");
  if (titleEl) titleEl.textContent = document.title;

  const desc = SITE.seo?.description ?? "";
  const descEl = document.getElementById("pageDesc");
  if (descEl) descEl.setAttribute("content", desc);

  // ---------- BRAND ----------
  document.getElementById("brandName").textContent = SITE.brand ?? "Brand";

  // ---------- ROUTER ----------
  const pages = Array.from(document.querySelectorAll(".page"));
  const navLinksEl = document.getElementById("navLinks");
  const navMobileEl = document.getElementById("navMobile");
  const navToggle = document.getElementById("navToggle");

  function setActivePage(pageKey) {
    pages.forEach((p) => p.classList.toggle("is-active", p.dataset.page === pageKey));

    // Highlight nav active
    const allNav = document.querySelectorAll('[data-navlink="true"]');
    allNav.forEach((a) => a.classList.toggle("active", a.dataset.page === pageKey));

    // Close mobile menu
    if (!navMobileEl.hasAttribute("hidden")) navMobileEl.setAttribute("hidden", "");
  }

  function navigate(pageKey) {
    window.location.hash = `#${pageKey}`;
    setActivePage(pageKey);
  }

  function currentPageFromHash() {
    const h = (window.location.hash || "").replace("#", "").trim();
    const allowed = new Set(["home", "portraits", "travels", "events", "services", "contact"]);
    return allowed.has(h) ? h : "home";
  }

  // Build nav
  const nav = SITE.nav ?? [];
  function buildNavLink(item) {
    const a = document.createElement("a");
    a.href = `#${item.page}`;
    a.textContent = item.label;
    a.dataset.page = item.page;
    a.dataset.navlink = "true";
    a.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(item.page);
    });
    return a;
  }

  nav.forEach((item) => {
    navLinksEl.appendChild(buildNavLink(item));
    navMobileEl.appendChild(buildNavLink(item));
  });

  navToggle.addEventListener("click", () => {
    const isHidden = navMobileEl.hasAttribute("hidden");
    if (isHidden) navMobileEl.removeAttribute("hidden");
    else navMobileEl.setAttribute("hidden", "");
  });

  window.addEventListener("hashchange", () => setActivePage(currentPageFromHash()));

  // ---------- HOME HERO ----------
  const hero = SITE.hero ?? {};
  document.getElementById("heroBadge").textContent = hero.badge ?? "Photography";
  document.getElementById("heroHeadline").textContent = hero.headline ?? "Your Headline";
  document.getElementById("heroSubhead").textContent = hero.subhead ?? "";

  // CTAs (navigate within pages)
  const primaryBtn = document.getElementById("primaryCta");
  const secondaryBtn = document.getElementById("secondaryCta");

  primaryBtn.textContent = hero.primaryCta?.label ?? "View Work";
  primaryBtn.addEventListener("click", () => navigate(hero.primaryCta?.page ?? "portraits"));

  secondaryBtn.textContent = hero.secondaryCta?.label ?? "Services";
  secondaryBtn.addEventListener("click", () => navigate(hero.secondaryCta?.page ?? "services"));

  // Stats
  const statsWrap = document.getElementById("stats");
  (hero.stats ?? []).forEach((s) => {
    const div = document.createElement("div");
    div.className = "stat";
    div.innerHTML = `<strong>${s.value}</strong><span>${s.label}</span>`;
    statsWrap.appendChild(div);
  });

  // Featured card
  const fc = SITE.featuredCard ?? {};
  document.getElementById("cardTitle").textContent = fc.title ?? "Featured";
  document.getElementById("cardText").textContent = fc.text ?? "";
  const cardList = document.getElementById("cardList");
  (fc.bullets ?? []).forEach((b) => {
    const div = document.createElement("div");
    div.className = "pill";
    div.textContent = b;
    cardList.appendChild(div);
  });
  const cardBtn = document.getElementById("cardButton");
  cardBtn.textContent = fc.button?.label ?? "Contact";
  cardBtn.href = fc.button?.href ?? "#contact";

  // ---------- GALLERIES ----------
  const galleries = SITE.galleries ?? {};

  function setPageHead(pageKey, titleId, subtitleId) {
    const g = galleries[pageKey];
    if (!g) return;
    const tEl = document.getElementById(titleId);
    const sEl = document.getElementById(subtitleId);
    if (tEl) tEl.textContent = g.title ?? pageKey;
    if (sEl) sEl.textContent = g.subtitle ?? "";
  }

  setPageHead("portraits", "portraitsTitle", "portraitsSubtitle");
  setPageHead("travels", "travelsTitle", "travelsSubtitle");
  setPageHead("events", "eventsTitle", "eventsSubtitle");

  function renderAlbumGrid(pageKey, gridId) {
    const grid = document.getElementById(gridId);
    grid.innerHTML = "";

    const g = galleries[pageKey];
    const sets = g?.sets ?? [];

    sets.forEach((set) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "album";
      btn.addEventListener("click", () => openLightbox(set));

      const img = document.createElement("img");
      img.className = "album__img";
      img.src = set.cover?.src;
      img.alt = set.cover?.alt ?? set.title ?? "Album cover";
      img.loading = "lazy";

      const overlay = document.createElement("div");
      overlay.className = "album__overlay";

      const h = document.createElement("h3");
      h.className = "album__title";
      h.textContent = set.title ?? "Untitled set";

      const meta = document.createElement("p");
      meta.className = "album__meta";
      const loc = set.location ? set.location : "";
      const date = set.date ? set.date : "";
      meta.textContent = [loc, date].filter(Boolean).join(" • ");

      overlay.appendChild(h);
      overlay.appendChild(meta);

      btn.appendChild(img);
      btn.appendChild(overlay);
      grid.appendChild(btn);
    });
  }

  renderAlbumGrid("portraits", "portraitsGrid");
  renderAlbumGrid("travels", "travelsGrid");
  renderAlbumGrid("events", "eventsGrid");

  // ---------- SERVICES ----------
  const services = SITE.services ?? {};
  document.getElementById("servicesTitle").textContent = services.title ?? "Services";
  document.getElementById("servicesSubtitle").textContent = services.subtitle ?? "";

  const servicesGrid = document.getElementById("servicesGrid");
  (services.items ?? []).forEach((item) => {
    const div = document.createElement("div");
    div.className = "tile";
    const bullets = (item.bullets ?? []).map((b) => `<li>${b}</li>`).join("");
    div.innerHTML = `
      <h3>${item.title ?? ""}</h3>
      <p><strong>${item.price ?? ""}</strong></p>
      <ul>${bullets}</ul>
    `;
    servicesGrid.appendChild(div);
  });

  const servicesButtons = document.getElementById("servicesButtons");
  if (services.cta?.href) {
    const a = document.createElement("a");
    a.className = "btn btn--primary";
    a.href = services.cta.href;
    a.textContent = services.cta.label ?? "Inquire";
    servicesButtons.appendChild(a);
  }

  // ---------- CONTACT ----------
  const contact = SITE.contact ?? {};
  document.getElementById("contactTitle").textContent = contact.title ?? "Contact";
  document.getElementById("contactText").textContent = contact.text ?? "";

  const contactButtons = document.getElementById("contactButtons");
  (contact.buttons ?? []).forEach((b) => {
    const a = document.createElement("a");
    a.className = "btn btn--ghost";
    a.href = b.href;
    a.target = b.href.startsWith("http") ? "_blank" : "_self";
    a.rel = "noopener noreferrer";
    a.textContent = b.label;
    contactButtons.appendChild(a);
  });

  // ---------- FOOTER ----------
  const year = new Date().getFullYear();
  const footer = SITE.footer ?? {};
  document.getElementById("footerText").textContent =
    (footer.text ?? "© {year}").replace("{year}", String(year));

  const socialLinks = document.getElementById("socialLinks");
  (footer.socials ?? []).forEach((s) => {
    const a = document.createElement("a");
    a.href = s.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = s.label;
    socialLinks.appendChild(a);
  });

  // ---------- LIGHTBOX ----------
  const lightbox = document.getElementById("lightbox");
  const backdrop = document.getElementById("lightboxBackdrop");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const imgEl = document.getElementById("lightboxImg");
  const titleEl = document.getElementById("lightboxTitle");
  const subEl = document.getElementById("lightboxSub");
  const thumbsEl = document.getElementById("lightboxThumbs");

  let activeSet = null;
  let activeIndex = 0;

  function openLightbox(set) {
    activeSet = set;
    activeIndex = 0;

    titleEl.textContent = set.title ?? "Gallery";
    subEl.textContent = [set.location, set.date].filter(Boolean).join(" • ");

    renderThumbs(set);
    setPhoto(0);

    lightbox.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.setAttribute("hidden", "");
    document.body.style.overflow = "";
    activeSet = null;
    activeIndex = 0;
    thumbsEl.innerHTML = "";
  }

  function setPhoto(index) {
    if (!activeSet) return;
    const photos = activeSet.photos ?? [];
    if (photos.length === 0) return;

    activeIndex = (index + photos.length) % photos.length;
    imgEl.src = photos[activeIndex];

    // highlight thumb
    Array.from(thumbsEl.children).forEach((t, i) => {
      t.classList.toggle("is-active", i === activeIndex);
    });
  }

  function renderThumbs(set) {
    thumbsEl.innerHTML = "";
    (set.photos ?? []).forEach((src, i) => {
      const t = document.createElement("div");
      t.className = "thumb";
      t.addEventListener("click", () => setPhoto(i));

      const im = document.createElement("img");
      im.src = src;
      im.alt = `${set.title ?? "Photo"} ${i + 1}`;
      im.loading = "lazy";

      t.appendChild(im);
      thumbsEl.appendChild(t);
    });
  }

  backdrop.addEventListener("click", closeLightbox);
  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => setPhoto(activeIndex - 1));
  nextBtn.addEventListener("click", () => setPhoto(activeIndex + 1));

  window.addEventListener("keydown", (e) => {
    if (lightbox.hasAttribute("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") setPhoto(activeIndex - 1);
    if (e.key === "ArrowRight") setPhoto(activeIndex + 1);
  });

  // Start at current hash route
  setActivePage(currentPageFromHash());
})();
