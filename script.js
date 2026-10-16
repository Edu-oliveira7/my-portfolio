document.addEventListener("DOMContentLoaded", () => {
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // ============================================================
  // LOADER + HERO ENTRANCE
  // ============================================================

  const loader = document.getElementById("loader");

  setTimeout(() => {
    document.body.classList.add("loaded");

    if (loader) {
      loader.classList.add("hidden");
    }
  }, reduced ? 0 : 950);


  // ============================================================
  // MOBILE MENU
  // ============================================================

  const menu = document.getElementById("mobile-menu");
  const menuBtn = document.getElementById("menu-btn");
  const menuClose = document.getElementById("menu-close");

  const openMenu = () => {
    if (!menu || !menuBtn) return;
    menu.classList.add("open");
    document.body.classList.add("menu-open");
    menu.setAttribute("aria-hidden", "false");
    menuBtn.setAttribute("aria-expanded", "true");
    menuBtn.setAttribute("aria-label", "Fechar menu");
  };

  const closeMenu = () => {
    if (!menu) return;
    menu.classList.remove("open");
    document.body.classList.remove("menu-open");
    menu.setAttribute("aria-hidden", "true");
    if (menuBtn) {
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Abrir menu");
    }
  };

  if (menuBtn) {
    menuBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = menu && menu.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (menuClose) {
    menuClose.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  // Menu mobile: fecha ao clicar num link e rola suavemente até a seção
  if (menu) {
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", (event) => {
        const href = a.getAttribute("href");
        const target = href && href.startsWith("#") ? document.querySelector(href) : null;

        if (target) {
          event.preventDefault();
          closeMenu();
          // Pequeno atraso para o menu começar a fechar antes da rolagem
          setTimeout(() => {
            target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
            history.pushState(null, "", href);
          }, 100);
        } else {
          closeMenu();
        }
      });
    });
  }

  // Demais links internos (navbar, botões, skip link): rolagem suave
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    if (a.closest("#mobile-menu")) return;

    a.addEventListener("click", (event) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      history.pushState(null, "", href);
    });
  });

  // Fecha o menu com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });


  // ============================================================
  // NAVBAR — EFEITO AO ROLAR
  // ============================================================

  const nav = document.getElementById("navbar");

  const updateNav = () => {
    nav?.classList.toggle("scrolled", window.scrollY > 30);
  };

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();


  // ============================================================
  // NAVBAR — SEÇÃO ATIVA
  // ============================================================

  const sectionLinks = document.querySelectorAll(".nav-links a[data-section]");
  const trackedSections = [...document.querySelectorAll("main > section[id]")];

  const updateActiveSection = () => {
    const marker = window.innerHeight * 0.3;
    let currentSection = "";

    trackedSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= marker && rect.bottom > marker) {
        currentSection = section.id;
      }
    });

    sectionLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === currentSection);
    });
  };

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  updateActiveSection();


  // ============================================================
  // REVELAÇÃO AO ROLAR (cards de projeto)
  // ============================================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
      }
    );

    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach((el) => {
      el.classList.add("visible");
    });
  }
});