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

  // Close menu on mobile link click + smooth scroll
  if (menu) {
    menu.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", (event) => {
        const href = a.getAttribute("href");
        const target = document.querySelector(href);

        if (target) {
          event.preventDefault();
          closeMenu();
          // Small delay to let menu close animation start
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

  // Desktop nav links — smooth scroll
  document.querySelectorAll(".nav-links a, .brand, .nav-cta").forEach((a) => {
    a.addEventListener("click", (event) => {
      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      history.pushState(null, "", href);
    });
  });

  // Also handle any in-page anchor links (hero buttons etc)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    // Skip if already handled (nav-links, brand, nav-cta, mobile-menu)
    if (a.closest(".nav-links") || a.closest("#mobile-menu") || a.classList.contains("brand") || a.classList.contains("nav-cta")) return;

    a.addEventListener("click", (event) => {
      const href = a.getAttribute("href");
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
      history.pushState(null, "", href);
    });
  });

  // Close menu on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });


  // ============================================================
  // NAVBAR — SCROLL EFFECT
  // ============================================================

  const nav = document.getElementById("navbar");

  const updateNav = () => {
    nav?.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );
  };

  window.addEventListener(
    "scroll",
    updateNav,
    { passive: true }
  );

  updateNav();


  // ============================================================
  // NAVBAR — ACTIVE SECTION TRACKING
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
      link.classList.toggle(
        "active",
        link.dataset.section === currentSection
      );
    });
  };

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  updateActiveSection();


  // ============================================================
  // SCROLL REVEAL
  // ============================================================

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          revealObserver.unobserve(
            entry.target
          );
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px"
    }
  );

  document
    .querySelectorAll(".reveal")
    .forEach((el) => {
      revealObserver.observe(el);
    });


  // ============================================================
  // COUNTER
  // ============================================================

  const counters =
    document.querySelectorAll("[data-count]");

  const counterObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const el = entry.target;
          const target = Number(
            el.dataset.count
          );

          if (reduced) {
            el.textContent = target;

            counterObserver.unobserve(el);

            return;
          }

          const start = performance.now();
          const duration = 1100;

          const tick = (now) => {
            const progress = Math.min(
              (now - start) / duration,
              1
            );

            const eased =
              1 - Math.pow(1 - progress, 3);

            el.textContent =
              Math.round(target * eased);

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };

          requestAnimationFrame(tick);

          counterObserver.unobserve(el);
        });
      },
      {
        threshold: 0.65
      }
    );

  counters.forEach((el) => {
    counterObserver.observe(el);
  });


  // ============================================================
  // SUBTLE HERO PARALLAX
  // ============================================================

  const parallax =
    document.querySelector("[data-parallax]");

  if (
    parallax &&
    !reduced &&
    window.matchMedia(
      "(min-width: 901px)"
    ).matches
  ) {
    let ticking = false;

    const updateParallax = () => {
      const rect =
        parallax.getBoundingClientRect();

      const viewport =
        window.innerHeight;

      const amount =
        (
          viewport / 2 -
          (rect.top + rect.height / 2)
        ) * 0.035;

      parallax.style.transform =
        `translateY(${amount}px)`;

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(
            updateParallax
          );

          ticking = true;
        }
      },
      {
        passive: true
      }
    );

    updateParallax();
  }


});