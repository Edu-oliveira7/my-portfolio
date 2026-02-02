document.addEventListener('DOMContentLoaded', () => {
    
    // 1. EFEITO INTRO (SPLASH SCREEN)
    const intro = document.getElementById('intro');
    if (intro) {
        setTimeout(() => {
            intro.style.transition = 'opacity 0.8s ease, visibility 0.8s';
            intro.style.opacity = '0';
            intro.style.visibility = 'hidden';
            // Inicia o reveal do conteúdo principal
            document.querySelectorAll('.reveal').forEach(el => {
                if(el.getBoundingClientRect().top < window.innerHeight) {
                    el.classList.add('active');
                }
            });
        }, 2000); // 2 segundos de exibição
    }

    // 2. TYPEWRITER (EFEITO DE DIGITAÇÃO)
    const textElement = document.getElementById('typewriter');
    const words = ["Python Developer", "Full-stack Jr", "Designer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pausa no final da palavra
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    if (textElement) type();

    // 3. MENU MOBILE (UX)
    const btnMobile = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const backdrop = document.getElementById('menu-backdrop');

    function toggleMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            backdrop.classList.remove('hidden');
            setTimeout(() => {
                mobileMenu.classList.replace('opacity-0', 'opacity-100');
                mobileMenu.classList.replace('scale-95', 'scale-100');
                backdrop.classList.replace('opacity-0', 'opacity-100');
            }, 10);
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.replace('opacity-100', 'opacity-0');
            mobileMenu.classList.replace('scale-100', 'scale-95');
            backdrop.classList.replace('opacity-100', 'opacity-0');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                backdrop.classList.add('hidden');
            }, 300);
            document.body.style.overflow = '';
        }
    }

    if (btnMobile) btnMobile.addEventListener('click', toggleMenu);
    if (backdrop) backdrop.addEventListener('click', toggleMenu);
    
    // Fecha menu ao clicar em links
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 4. SCROLL REVEAL (UX)
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };
    window.addEventListener('scroll', reveal);

    // 5. CONFIGURAÇÃO DAS PARTÍCULAS (BACKGROUND)
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load("tsparticles", {
            fpsLimit: 60,
            particles: {
                number: { value: 60, density: { enable: true, area: 800 } },
                color: { value: "#00f3ff" },
                shape: { type: "circle" },
                opacity: { value: 0.2 },
                size: { value: { min: 1, max: 3 } },
                links: {
                    enable: true,
                    distance: 150,
                    color: "#00f3ff",
                    opacity: 0.1,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1.2,
                    direction: "none",
                    outModes: { default: "out" }
                }
            },
            interactivity: {
                events: {
                    onHover: { enable: true, mode: "grab" },
                    resize: true
                },
                modes: {
                    grab: { distance: 200, links: { opacity: 0.4 } }
                }
            },
            detectRetina: true
        });
    }
});