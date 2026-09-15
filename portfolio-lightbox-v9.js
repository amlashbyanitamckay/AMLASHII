(() => {
  const cards = Array.from(document.querySelectorAll(".portfolio-card"));
  if (!cards.length) return;

  const items = cards
    .map((card) => {
      const img = card.querySelector("img");
      if (!img) return null;

      const caption =
        card.querySelector("figcaption strong")?.textContent?.trim() ||
        img.alt ||
        "Zdjęcie z portfolio AMLASH";

      img.classList.add("portfolio-lightbox-trigger");
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      img.setAttribute("aria-label", `Powiększ zdjęcie: ${caption}`);

      return { img, caption };
    })
    .filter(Boolean);

  if (!items.length) return;

  const overlay = document.createElement("div");
  overlay.className = "portfolio-lightbox";
  overlay.setAttribute("aria-hidden", "true");

  overlay.innerHTML = `
    <div class="portfolio-lightbox__dialog"
         role="dialog"
         aria-modal="true"
         aria-label="Powiększone zdjęcie z portfolio">
      <button class="portfolio-lightbox__close" type="button" aria-label="Zamknij powiększone zdjęcie">×</button>
      <button class="portfolio-lightbox__prev" type="button" aria-label="Poprzednie zdjęcie">‹</button>
      <div class="portfolio-lightbox__image-wrap">
        <img class="portfolio-lightbox__image" src="" alt="">
      </div>
      <button class="portfolio-lightbox__next" type="button" aria-label="Następne zdjęcie">›</button>
      <div class="portfolio-lightbox__caption" aria-live="polite"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  const modalImage = overlay.querySelector(".portfolio-lightbox__image");
  const captionEl = overlay.querySelector(".portfolio-lightbox__caption");
  const closeBtn = overlay.querySelector(".portfolio-lightbox__close");
  const prevBtn = overlay.querySelector(".portfolio-lightbox__prev");
  const nextBtn = overlay.querySelector(".portfolio-lightbox__next");

  let currentIndex = 0;
  let lastFocused = null;

  function render(index) {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];

    modalImage.src = item.img.currentSrc || item.img.src;
    modalImage.alt = item.img.alt || item.caption;
    captionEl.textContent = item.caption;

    const showNavigation = items.length > 1;
    prevBtn.hidden = !showNavigation;
    nextBtn.hidden = !showNavigation;
  }

  function open(index) {
    lastFocused = document.activeElement;
    render(index);
    overlay.classList.add("is-open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove("is-open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
    modalImage.removeAttribute("src");

    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  items.forEach((item, index) => {
    item.img.addEventListener("click", () => open(index));
    item.img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(index);
      }
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", () => render(currentIndex - 1));
  nextBtn.addEventListener("click", () => render(currentIndex + 1));

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) close();
  });

  document.addEventListener("keydown", (event) => {
    if (!overlay.classList.contains("is-open")) return;

    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") render(currentIndex - 1);
    if (event.key === "ArrowRight") render(currentIndex + 1);
  });
})();
