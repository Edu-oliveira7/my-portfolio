// --- Animação Typewriter ---
const words = ["DEVELOPER", "DESIGNER"];
const typewriter = document.getElementById("typewriter");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let delay = 150;

function type() {
  const currentWord = words[wordIndex];
  
  if (!isDeleting) {
    typewriter.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      delay = 1000;
    } else delay = 150;
  } else {
    typewriter.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    } else delay = 80;
  }
  setTimeout(type, delay);
}
type();

// --- Animação ao Scroll (reveal) ---
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  for (let el of reveals) {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  }
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // executa na primeira carga
