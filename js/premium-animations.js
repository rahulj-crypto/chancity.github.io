/**
 * Chancity Sports Club - Premium Scroll & Animation Controller
 * Advanced scroll animations, page transitions, and interactive effects
 */

class PremiumAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollReveal();
        this.setupStaggerAnimations();
        this.setupNavbarEffect();
        this.setupButtonEffects();
        this.setupPageTransitions();
        this.setupParallax();
        this.setupMagneticHover();
        this.addPageEnterAnimation();

        console.log('Premium animations initialized');
    }

    // Scroll reveal animations
    setupScrollReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');

                    // Trigger stagger if parent
                    if (entry.target.classList.contains('stagger-container')) {
                        entry.target.querySelectorAll(':scope > *').forEach((child, index) => {
                            setTimeout(() => {
                                child.style.opacity = '1';
                                child.style.transform = 'translateY(0)';
                            }, index * 100);
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe reveal elements
        document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-container').forEach(el => {
            observer.observe(el);
        });

        // Also observe data-animate elements
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.classList.add('reveal');
            observer.observe(el);
        });
    }

    // Stagger animations for cards/grids
    setupStaggerAnimations() {
        document.querySelectorAll('[data-stagger]').forEach(container => {
            container.classList.add('stagger-container');
            container.querySelectorAll(':scope > *').forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }

    // Navbar glassmorphism on scroll
    setupNavbarEffect() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
                header.style.background = 'rgba(26, 26, 26, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            } else {
                header.classList.remove('scrolled');
                header.style.background = 'transparent';
                header.style.backdropFilter = 'none';
                header.style.boxShadow = 'none';
            }

            // Hide/show on scroll direction
            if (currentScroll > lastScroll && currentScroll > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // Button ripple & effects
    setupButtonEffects() {
        document.querySelectorAll('.btn, .btn-primary, .btn-premium, button[type="submit"]').forEach(btn => {
            btn.classList.add('shine-effect');

            btn.addEventListener('click', (e) => {
                // Create ripple
                const ripple = document.createElement('span');
                ripple.className = 'ripple';

                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${e.clientX - rect.left - size / 2}px;
                    top: ${e.clientY - rect.top - size / 2}px;
                    background: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple-effect 0.6s ease-out;
                    pointer-events: none;
                `;

                btn.style.position = 'relative';
                btn.style.overflow = 'hidden';
                btn.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add keyframes for ripple if not exists
        if (!document.getElementById('ripple-keyframes')) {
            const style = document.createElement('style');
            style.id = 'ripple-keyframes';
            style.textContent = `
                @keyframes ripple-effect {
                    to { transform: scale(4); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Page transitions
    setupPageTransitions() {
        document.querySelectorAll('a').forEach(link => {
            // Only for internal links
            if (link.href && link.href.includes(window.location.origin) &&
                !link.href.includes('#') && !link.target) {

                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const href = link.href;

                    document.body.classList.add('page-exit');

                    setTimeout(() => {
                        window.location.href = href;
                    }, 300);
                });
            }
        });
    }

    // Parallax effect for hero
    setupParallax() {
        const hero = document.querySelector('.hero, .hero-premium, .page-header');
        if (!hero) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            hero.style.backgroundPositionY = `${rate}px`;
        }, { passive: true });
    }

    // Magnetic hover effect
    setupMagneticHover() {
        document.querySelectorAll('.magnetic-hover').forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Page enter animation
    addPageEnterAnimation() {
        document.body.classList.add('page-transition');
    }
}

// Counter animation for stats
class CounterAnimation {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('[data-count]').forEach(el => {
            observer.observe(el);
        });
    }

    animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            el.textContent = current + (el.dataset.suffix || '');

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }
}

// Smooth scroll for anchor links
class SmoothScroll {
    constructor() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));

                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Cursor effects (optional, for premium feel)
class CursorEffects {
    constructor() {
        if (window.matchMedia('(pointer: fine)').matches) {
            this.init();
        }
    }

    init() {
        const cursor = document.createElement('div');
        cursor.id = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
        document.body.appendChild(cursor);

        const dot = cursor.querySelector('.cursor-dot');
        const outline = cursor.querySelector('.cursor-outline');

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            #custom-cursor {
                pointer-events: none;
                position: fixed;
                z-index: 99999;
            }
            .cursor-dot {
                width: 8px;
                height: 8px;
                background: var(--secondary-color, #DAA520);
                border-radius: 50%;
                position: fixed;
                transform: translate(-50%, -50%);
                transition: transform 0.1s ease;
            }
            .cursor-outline {
                width: 40px;
                height: 40px;
                border: 2px solid rgba(218, 165, 32, 0.5);
                border-radius: 50%;
                position: fixed;
                transform: translate(-50%, -50%);
                transition: all 0.15s ease;
                pointer-events: none;
            }
            .cursor-hover .cursor-outline {
                transform: translate(-50%, -50%) scale(1.5);
                border-color: var(--secondary-color, #DAA520);
            }
            .cursor-hover .cursor-dot {
                transform: translate(-50%, -50%) scale(0.5);
            }
        `;
        document.head.appendChild(style);

        document.addEventListener('mousemove', (e) => {
            dot.style.left = e.clientX + 'px';
            dot.style.top = e.clientY + 'px';
            outline.style.left = e.clientX + 'px';
            outline.style.top = e.clientY + 'px';
        });

        // Hover effect on interactive elements
        document.querySelectorAll('a, button, .btn, [role="button"]').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }
}

// Initialize all effects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PremiumAnimations();
    new CounterAnimation();
    new SmoothScroll();
    // Uncomment for custom cursor: new CursorEffects();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PremiumAnimations, CounterAnimation, SmoothScroll, CursorEffects };
}
