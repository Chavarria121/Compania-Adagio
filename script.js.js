// Lógica alineada a tu zip:
// - Toggle del menú: aria-expanded + clase .hidden
// - Sincronización en resize (mostrar menú si vuelve a desktop)
// - Botón Copy por bloque
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("nav-toggle");
  const siteNav   = document.getElementById("site-nav");
  const yearOut   = document.getElementById("yy");

  // Año dinámico en footer (como en tu landing)
  if (yearOut) yearOut.textContent = new Date().getFullYear();

  // Toggle navbar
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      siteNav.classList.toggle("hidden");
    });

    // Sincroniza estado al redimensionar (si pasa a desktop, asegúrate de mostrar el nav)
    window.addEventListener("resize", () => {
      const isDesktop = window.innerWidth > 860;
      if (isDesktop) {
        siteNav.classList.remove("hidden");
        navToggle.setAttribute("aria-expanded", "true");
      } else {
        siteNav.classList.add("hidden");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Botones Copy
  document.querySelectorAll(".copy").forEach(btn => {
    btn.addEventListener("click", async () => {
      const selector = btn.getAttribute("data-copy");
      const pre = document.querySelector(selector);
      if (!pre) return;
      const text = pre.innerText;

      try {
        await navigator.clipboard.writeText(text);
        const prev = btn.textContent;
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = prev), 1200);
      } catch (err) {
        console.warn("Clipboard no disponible. Usa Ctrl+C.", err);
      }
    });
  });
});
