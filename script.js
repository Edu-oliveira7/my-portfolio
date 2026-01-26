document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. EFEITO DE DIGITAÇÃO (TYPEWRITER) - RESTAURADO
       ========================================== */
    const textElement = document.getElementById('typewriter');
    // Defina aqui as palavras que você quer que apareçam
    const words = ["Designer", "Python Developer"]; 
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100; // Velocidade padrão de digitação

    function typeWriter() {
        if (!textElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            // Apagando
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Apaga mais rápido
        } else {
            // Escrevendo
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Escreve em velocidade normal
        }

        // Lógica de controle de fluxo
        if (!isDeleting && charIndex === currentWord.length) {
            // Terminou de escrever a palavra inteira
            isDeleting = true;
            typeSpeed = 2000; // Pausa antes de começar a apagar (2 segundos)
        } else if (isDeleting && charIndex === 0) {
            // Terminou de apagar a palavra inteira
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length; // Passa para a próxima palavra
            typeSpeed = 500; // Pequena pausa antes de começar a escrever a próxima
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Inicia o efeito
    typeWriter();


    /* ==========================================
       2. MENU MOBILE E BACKDROP
       ========================================== */
    const btnMobile = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('menu-backdrop');
    const menuIcon = btnMobile ? btnMobile.querySelector('i') : null;
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        if (!mobileMenu || !menuIcon || !backdrop) return;

        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            // ABRIR
            backdrop.classList.remove('hidden');
            setTimeout(() => {
                backdrop.classList.remove('opacity-0');
                backdrop.classList.add('opacity-100');
            }, 10);

            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('flex');
            
            setTimeout(() => {
                mobileMenu.classList.remove('opacity-0', 'scale-95');
                mobileMenu.classList.add('opacity-100', 'scale-100');
            }, 10);

            document.body.style.overflow = 'hidden'; // Trava o scroll do corpo
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            // FECHAR
            mobileMenu.classList.remove('opacity-100', 'scale-100');
            mobileMenu.classList.add('opacity-0', 'scale-95');

            backdrop.classList.remove('opacity-100');
            backdrop.classList.add('opacity-0');
            
            setTimeout(() => {
                mobileMenu.classList.remove('flex');
                mobileMenu.classList.add('hidden');
                
                backdrop.classList.remove('opacity-100'); 
                backdrop.classList.add('hidden');
            }, 300);

            document.body.style.overflow = 'auto'; // Destrava o scroll
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    }

    if (btnMobile) btnMobile.addEventListener('click', toggleMenu);
    if (backdrop) backdrop.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));


    /* ==========================================
       3. SCROLL REVEAL (ANIMAÇÃO AO ROLAR)
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    /* ==========================================
       4. PARTICULAS DE FUNDO
       ========================================== */
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "repulse" },
                    resize: true,
                },
                modes: {
                    repulse: { distance: 100, duration: 0.4 },
                },
            },
            particles: {
                color: { value: "#00f3ff" },
                links: {
                    color: "#00f3ff",
                    distance: 150,
                    enable: true,
                    opacity: 0.15,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 0.8,
                    direction: "none",
                    random: false,
                    straight: false,
                    outModes: { default: "bounce" },
                },
                number: { density: { enable: true, area: 800 }, value: 50 },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
        });
    }
});

/* ==========================================
   5. INTRO ANIMADA (ANTES DO SITE)
========================================== */
window.addEventListener("load", () => {
    const tl = gsap.timeline();

    tl.from("#intro h1", {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power4.out"
    })
    .to("#intro h1", {
        opacity: 0,
        y: -30,
        duration: 0.6,
        delay: 0.8,
        ease: "power2.in"
    })
    .to("#intro", {
        opacity: 0,
        duration: 0.6
    })
    .set("#intro", { display: "none" })
    .to("#site-content", {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    });
});
