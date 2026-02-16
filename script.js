(function () {
  const SITE = window.SITE;
  if (!SITE) return;

  // SEO
  document.getElementById("pageTitle").textContent = SITE.seo.title;
  document.getElementById("pageDesc").setAttribute("content", SITE.seo.description);
  document.title = SITE.seo.title;

  // Brand
  document.getElementById("brandName").textContent = SITE.brand;

  // Nav links (desktop + mobile)
  const navLinks = document.getElementById("navLinks");
  const navMobile = document.getElementById("navMobile");

  function makeNavLink(item) {
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.label;
    return a;
  }

  SITE.nav.forEach((item) => {
    navLinks.appendChild(makeNavLink(item));
    navMobile.appendChild(makeNavLink(item));
  });

  // Mobile toggle
  const navToggle = document.getElementById("navToggle");
  navToggle.addEventListener("click", () => {
    const isHidden = navMobile.hasAttribute("hidden");
    if (isHidden) navMobile.removeAttribute("hidden");
    else navMobile.setAttribute("hidden", "");
  });

  // Hero
  document.getElementById("heroBadge").textContent = SITE.hero.badge;
  document.getElementById("heroHeadline").textContent = SITE.hero.headline;
  document.getElementById("heroSubhead").textContent = SITE.hero.subhead;

  const primary = document.getElementById("primaryCta");
  primary.textContent = SITE.hero.primaryCta.label;
  primary.href = SITE.hero.primaryCta.href;

  const secondary = document.getElementById("secondaryCta");
  secondary.textContent = SITE.hero.secondaryCta.label;
  secondary.href = SITE.hero.secondaryCta.href;

  const statsWrap = document.getElementById("stats");
  SITE.hero.stats.forEach((s) => {
    const div = document.createElement("div");
    div.className = "stat";
    div.innerHTML = `<strong>${s.value}</strong><span>${s.label}</span>`;
    statsWrap.appendChild(div);
  });

  // Featured card
  document.getElementById("cardTitle").textContent = SITE.featuredCard.title;
  document.getElementById("cardText").textContent = SITE.featuredCard.text;

  const cardList = document.getElementById("cardList");
  SITE.featuredCard.bullets.forEach((b) => {
    const div = document.createElement("div");
    div.className = "pill";
    div.textContent = b;
    cardList.appendChild(div);
  });

  const cardBtn = document.getElementById("cardButton");
  cardBtn.textContent = SITE.featuredCard.button.label;
  cardBtn.href = SITE.featuredCard.button.href;

  // About
  document.getElementById("aboutText").textContent = SITE.about;

  // Work grid
  const workGrid = document.getElementById("workGrid");
  SITE.work.forEach((w) => {
    const div = document.createElement("div");
    div.className = "tile";
    div.innerHTML = `
      <h3>${w.title}</h3>
      <p>${w.description}</p>
      <a href="${w.href}">${w.linkLabel} →</a>
    `;
    workGrid.appendChild(div);
  });

  // Services grid
  const servicesGrid = document.getElementById("servicesGrid");
  SITE.services.forEach((s) => {
    const div = document.createElement("div");
    div.className = "tile";
    div.innerHTML = `
      <h3>${s.title}</h3>
      <p>${s.description}</p>
    `;
    servicesGrid.appendChild(div);
  });

  // Contact
  document.getElementById("contactText").textContent = SITE.contact.text;

  const contactButtons = document.getElementById("contactButtons");
  SITE.contact.buttons.forEach((b) => {
    const a = document.createElement("a");
    a.className = "btn btn--ghost";
    a.href = b.href;
    a.target = b.href.startsWith("http") ? "_blank" : "_self";
    a.rel = "noopener noreferrer";
    a.textContent = b.label;
    contactButtons.appendChild(a);
  });

  // Footer
  const year = new Date().getFullYear();
  document.getElementById("footerText").textContent = SITE.footer.text.replace("{year}", String(year));

  const socialLinks = document.getElementById("socialLinks");
  SITE.footer.socials.forEach((s) => {
    const a = document.createElement("a");
    a.href = s.href;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.textContent = s.label;
    socialLinks.appendChild(a);
  });
})();
