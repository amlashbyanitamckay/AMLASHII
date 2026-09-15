// ===============================
// AMLASH — EDYTUJ TYLKO TE DANE
// ===============================
const CONFIG = {
  booksyUrl: "https://booksy.com/",        // <-- wklej tutaj pełny link do Twojego profilu Booksy
  instagramUrl: "https://instagram.com/",  // <-- wklej tutaj pełny link do Instagrama
  instagramLabel: "@amlash"                // <-- wpisz swój właściwy @nick
};

// Linki Booksy
document.querySelectorAll(".js-booksy").forEach(link => {
  link.href = CONFIG.booksyUrl;
});

// Linki Instagram
document.querySelectorAll(".js-instagram").forEach(link => {
  link.href = CONFIG.instagramUrl;
});
document.querySelectorAll(".js-instagram-label").forEach(el => {
  el.textContent = CONFIG.instagramLabel;
});

// Rok w stopce
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobilne
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

// Delikatne animacje sekcji
const items = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach(item => observer.observe(item));
} else {
  items.forEach(item => item.classList.add("is-visible"));
}
