// ================================================================
// MODERN PORTFOLIO — JavaScript
// Features: Mobile Menu, Contact Form, Project Modal, 
//           Scroll Animations, Form Validation
// ================================================================

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initContactForm();
    initProjectModals();
    initSmoothScroll();
});

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Close menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showMessage(formMessage, 'Please fill in all fields.', 'error');
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showMessage(formMessage, 'Please enter a valid email address.', 'error');
            return;
        }

        // Success message
        showMessage(formMessage, 'Message sent successfully! Thank you for reaching out.', 'success');

        // Reset form
        setTimeout(() => {
            form.reset();
            formMessage.classList.add('hidden');
        }, 3000);

        // Here you would typically send the data to a server
        console.log({ name, email, subject, message });
    });
}

function showMessage(element, message, type) {
    if (!element) return;

    element.textContent = message;
    element.className = `mt-4 text-center ${type === 'success' ? 'text-green-600' : 'text-red-600'}`;
    element.classList.remove('hidden');
}

// ========== PROJECT MODALS ==========
function initProjectModals() {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeModal');
    const projectLinks = document.querySelectorAll('.projectLink');

    if (!modal || !projectLinks.length) return;

    const projectData = {
        1: {
            title: 'E-Commerce Platform',
            description: 'A fully functional e-commerce platform built with React, Node.js, and MongoDB. Features include product catalog, shopping cart, user authentication, payment integration with Stripe, and admin dashboard for managing products and orders. The application is fully responsive and optimized for performance.',
            link: '#projects'
        },
        2: {
            title: 'Mobile Task App',
            description: 'A cross-platform mobile application for task management built with React Native and Firebase. Features real-time synchronization, offline support, push notifications, and beautiful UI. Users can create, edit, and organize tasks with priority levels and due dates.',
            link: '#projects'
        },
        3: {
            title: 'Analytics Dashboard',
            description: 'A real-time data visualization dashboard built with Vue.js and D3.js. Displays business metrics, sales data, and user analytics with interactive charts and filters. Integrated with Python backend for data processing and API endpoints.',
            link: '#projects'
        },
        4: {
            title: 'Social Network',
            description: 'A scalable social platform built with Next.js and WebSocket technology. Features include user profiles, real-time messaging, notifications, and feed functionality. Implements authentication, authorization, and real-time updates.',
            link: '#projects'
        },
        5: {
            title: 'Music Streaming App',
            description: 'A feature-rich music streaming application built with Flutter. Supports playlist management, audio quality selection, user authentication, and offline downloads. Integrates with REST API for music library and streaming.',
            link: '#projects'
        },
        6: {
            title: 'AI Chat Assistant',
            description: 'An intelligent chatbot powered by machine learning and TensorFlow. Features natural language processing, context awareness, and personalized responses. Built with Python backend and web interface for easy integration.',
            link: '#projects'
        }
    };

    projectLinks.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                document.getElementById('modalTitle').textContent = project.title;
                document.getElementById('modalDescription').textContent = project.description;
                document.getElementById('modalLink').href = project.link;
                modal.classList.remove('hidden');
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
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
