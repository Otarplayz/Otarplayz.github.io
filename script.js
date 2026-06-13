// --- 1. Matrix Background Canvas ---
const canvas = document.getElementById('binary-rain');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const characters = ['0', '1'];
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100; 
}

function drawBinaryRain() {
    ctx.fillStyle = 'rgba(9, 9, 11, 0.08)'; // Matched to portfolio var(--bg-color)
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0f766e';
    ctx.font = `500 ${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (Math.random() > 0.98) {
            ctx.fillStyle = '#10b981';
        } else {
            ctx.fillStyle = '#064e3b';
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawBinaryRain, 33);

// --- 2. Dynamic Ring Cursor ---
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
});

function animateCursor() {
    const ease = 0.15; 
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Expand and highlight the cursor when hovering over clickable items
const interactables = document.querySelectorAll('a, .btn, .bento-card');

interactables.forEach(item => {
    item.addEventListener('mouseenter', () => {
        ring.style.width = '30px';
        ring.style.height = '30px';
        ring.style.backgroundColor = 'rgba(16, 185, 129, 0.05)';
    });
    
    item.addEventListener('mouseleave', () => {
        ring.style.width = '26px';
        ring.style.height = '26px';
        ring.style.backgroundColor = 'transparent';
    });
});

// --- 3. Scroll Reveal Animations ---
const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // When the element comes into the viewport, add the 'show' class
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Unobserve so the animation only happens once
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
});

// Attach the observer to all elements with the 'hidden' class
hiddenElements.forEach((el) => observer.observe(el));