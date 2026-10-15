/* Shared mobile navigation, code-copy handling, and keyboard accessibility. */
document.documentElement.classList.add("js");
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".site-nav");
  const menu = nav?.querySelector(".site-menu-toggle");
  const links = nav?.querySelector(".nav-links");
  if (nav && menu && links) {
    const close = () => { links.classList.remove("is-open"); menu.setAttribute("aria-expanded", "false"); };
    menu.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      menu.setAttribute("aria-expanded", String(isOpen));
    });
    links.addEventListener("click", (event) => { if (event.target.closest("a")) close(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
    document.addEventListener("click", (event) => { if (!nav.contains(event.target)) close(); });
    const current = location.pathname.split("/").pop() || "index.html";
    nav.querySelectorAll(".nav-links a").forEach((link) => {
      if (link.getAttribute("href").split("/").pop() === current) link.setAttribute("aria-current", "page");
    });
    if (["roblox-modules.html","roblox-classes.html","roblox-games.html","bnum-calc.html"].includes(current) || location.pathname.includes("/docs/") || location.pathname.includes("/classes/")) {
      nav.querySelector('a[href$="projects.html"]')?.setAttribute("aria-current","page");
    }
  }
  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.setAttribute("type", "button");
    button.addEventListener("click", async () => {
      const target = button.dataset.copyTarget ? document.getElementById(button.dataset.copyTarget) : button.closest(".code-wrap")?.querySelector("pre code, pre, .codeblock");
      if (!target) { button.textContent = "No code found"; return; }
      const value = target.textContent.trim();
      const old = button.dataset.originalLabel || button.textContent;
      button.dataset.originalLabel = old;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          const input = document.createElement("textarea");
          input.value = value; input.setAttribute("readonly",""); input.style.position="fixed"; input.style.opacity="0";
          document.body.appendChild(input); input.select();
          const ok = document.execCommand("copy"); input.remove();
          if (!ok) throw new Error("Copy blocked");
        }
        button.textContent = "Copied!";
      } catch {
        button.textContent = "Select code to copy";
        target.setAttribute("tabindex","0"); target.focus();
      }
      window.setTimeout(() => { button.textContent = old; }, 1800);
    });
  });
});
