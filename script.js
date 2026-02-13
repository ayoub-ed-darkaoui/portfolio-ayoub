// ================================================================
// PORTFOLIO — Unified JavaScript
// Features: Particles, Navbar, Scroll Reveal, Typing Effect, 
//           Code Background, Contact Form, Mobile Menu
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initScrollReveal();
    initCodeBackground();
    initTypingEffect();
    initSmoothScroll();
    initContactForm();
    initProficiencyBars();
});

// ========== PARTICLE BACKGROUND ==========
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    const particles = [];
    const PARTICLE_COUNT = 60;
    const CONNECTION_DIST = 120;

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 1.5 + 0.5,
            color: Math.random() > 0.5 ? 'rgba(208, 0, 0, 0.4)' : 'rgba(100, 17, 173, 0.35)'
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < CONNECTION_DIST) {
                    const opacity = (1 - dist / CONNECTION_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(208, 0, 0, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Cleanup on page leave
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });
}

// ========== NAVBAR ==========
function initNavbar() {
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar__link');

    // Mobile menu toggle
    if (toggle) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            toggle.setAttribute('aria-expanded',
                menu.classList.contains('active') ? 'true' : 'false'
            );
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menu) menu.classList.remove('active');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }
}

// ========== SCROLL REVEAL ==========
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('in-view'));
    }
}

// ========== CODE BACKGROUND ==========
function initCodeBackground() {
    const codeBg = document.querySelector('.code-bg');
    if (!codeBg) return;

    const codeSnippets = [
        'const init = () => {',
        '  document.ready();',
        '  app.listen(3000);',
        '};',
        '',
        'function render(component) {',
        '  return createElement(component);',
        '}',
        '',
        'class Developer {',
        '  constructor(name) {',
        '    this.name = name;',
        '    this.skills = [];',
        '  }',
        '',
        '  addSkill(skill) {',
        '    this.skills.push(skill);',
        '  }',
        '}',
        '',
        'const portfolio = new Developer("Ayoub");',
        'portfolio.addSkill("HTML");',
        'portfolio.addSkill("CSS");',
        'portfolio.addSkill("JavaScript");',
        '',
        'async function fetchData(url) {',
        '  const res = await fetch(url);',
        '  return res.json();',
        '}',
        '',
        'export default App;',
        '',
        'import { useState } from "react";',
        '',
        'const [state, setState] = useState(null);',
        '',
        'router.get("/api", handler);',
        '',
        'npm install --save-dev',
        'git commit -m "feat: update"',
        '',
        '// Built with passion',
        '// Code. Create. Deploy.',
    ];

    const fullText = codeSnippets.join('\n');
    // Duplicate for seamless loop
    codeBg.innerHTML = `<div class="code-bg__scroll">${fullText}\n${fullText}</div>`;
}

// ========== TYPING EFFECT ==========
function initTypingEffect() {
    const typingEl = document.getElementById('typing-text');
    if (!typingEl) return;

    const words = ['Full-Stack Web Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Coder'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            delay = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 400;
        }

        setTimeout(type, delay);
    }

    // Start after animations
    setTimeout(type, 1500);
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href === '') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('input[name="name"]')?.value.trim();
        const email = form.querySelector('input[name="email"]')?.value.trim();
        const subject = form.querySelector('input[name="subject"]')?.value.trim();
        const message = form.querySelector('textarea[name="message"]')?.value.trim();
        const notice = form.querySelector('#formNotice');

        if (!name || !email || !message) {
            showNotice(notice, 'Please fill out all required fields.', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotice(notice, 'Please enter a valid email address.', 'error');
            return;
        }

        const subjectLine = subject
            ? `Portfolio Inquiry: ${subject} from ${name}`
            : `Portfolio Contact from ${name}`;

        const mailtoLink = `mailto:ayoubdarkaoui006@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

        showNotice(notice, 'Opening your email client...', 'success');

        setTimeout(() => {
            window.location.href = mailtoLink;
            form.reset();
            if (notice) notice.style.display = 'none';
        }, 500);
    });
}

function showNotice(el, message, type) {
    if (!el) return;
    el.textContent = message;
    el.className = `form-notice ${type}`;
    el.style.display = 'block';

    if (type === 'error') {
        setTimeout(() => { el.style.display = 'none'; }, 5000);
    }
}

// ========== PROFICIENCY BARS ==========
function initProficiencyBars() {
    const bars = document.querySelectorAll('.proficiency-fill');
    if (!bars.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width') || bar.style.width;
                    bar.style.width = '0%';
                    requestAnimationFrame(() => {
                        bar.style.width = width;
                    });
                    bar.classList.add('animated');
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        bars.forEach(bar => {
            // Store target width and reset
            const targetWidth = bar.style.width;
            bar.setAttribute('data-width', targetWidth);
            bar.style.width = '0%';
            observer.observe(bar);
        });
    }
}
