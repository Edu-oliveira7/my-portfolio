document.addEventListener('DOMContentLoaded', () => {

    // ==================== MOBILE MENU TOGGLE ====================
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const mobileIcon = mobileBtn.querySelector('i');

    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        if (mobileMenu.classList.contains('hidden')) {
            mobileIcon.classList.replace('fa-xmark', 'fa-bars');
        } else {
            mobileIcon.classList.replace('fa-bars', 'fa-xmark');
        }
    });

    // Fechar menu mobile ao clicar em um link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileIcon.classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // ==================== EFEITO TYPEWRITER ====================
    const textElement = document.getElementById('typewriter');
    const words = ['Desenvolvedor Frontend', 'UI Designer', 'Dev Full-Stack'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!textElement) return;

        const currentWord = words[wordIndex];

        if (isDeleting) {
            textElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);

    // ==================== SCROLL REVEAL (INTERSECTION OBSERVER) ====================
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal, .fade-in-left, .fade-in-right').forEach(el => {
        // No mobile, o CSS já força opacity 1, mas mantemos o observer ativo 
        // caso a tela seja redimensionada.
        revealObserver.observe(el);
    });

    // ==================== MENU ATIVO ====================
    const sections = document.querySelectorAll('section[id], main[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightActiveLink = () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active-nav', 'bg-black', 'text-white');
                    link.classList.add('text-gray-600');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.remove('text-gray-600');
                        link.classList.add('active-nav');
                        if (sectionId === 'home') link.classList.add('bg-black', 'text-white');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveLink);
});