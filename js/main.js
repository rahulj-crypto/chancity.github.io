// Chancity Sports Club - Main JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation Toggle
    initMobileNav();

    // Smooth Scrolling
    initSmoothScroll();

    // Form Validation
    initFormValidation();

    // Scroll Animations
    initScrollAnimations();

    // Active Nav Link
    setActiveNavLink();
});

// Mobile Navigation
function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }
}

// Smooth Scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Form Validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        // Skip tournament registration form - it has its own handler
        if (form.id === 'tournamentRegistration') {
            return;
        }

        form.addEventListener('submit', function (e) {
            let isValid = true;

            // Validate required fields
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else {
                    clearFieldError(field);
                }
            });

            // Validate email fields
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                if (field.value && !isValidEmail(field.value)) {
                    isValid = false;
                    showFieldError(field, 'Please enter a valid email address');
                }
            });

            // Validate phone fields
            const phoneFields = form.querySelectorAll('input[type="tel"]');
            phoneFields.forEach(field => {
                if (field.value && !isValidPhone(field.value)) {
                    isValid = false;
                    showFieldError(field, 'Please enter a valid phone number');
                }
            });

            if (!isValid) {
                e.preventDefault();
            } else {
                // For demo purposes, show success message
                e.preventDefault();
                showFormSuccess(form);
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    return phoneRegex.test(phone);
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.style.borderColor = '#dc3545';
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '#ddd';
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function showFormSuccess(form) {
    const formContent = form.innerHTML;
    form.innerHTML = `
        <div class="form-success" style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; color: #28a745; margin-bottom: 20px;">✓</div>
            <h3 style="color: #28a745; margin-bottom: 15px;">Submission Successful!</h3>
            <p>Thank you for your submission. We will contact you soon.</p>
            <p style="color: #666; font-size: 0.9rem; margin-top: 20px;">
                <em>Ready To Fight!</em>
            </p>
        </div>
    `;
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.team-card, .feature-card, .news-card');

    // Check for IntersectionObserver support
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            observer.observe(element);
        });
    } else {
        // Fallback for older browsers - show all elements immediately
        animatedElements.forEach(element => {
            element.classList.add('fade-in');
        });
    }
}

// Set Active Nav Link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Header scroll effect
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Newsletter form handler
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const submitBtn = this.querySelector('button[type="submit"]');
        if (emailInput && emailInput.value) {
            // Show inline success message instead of alert
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '✓ Subscribed!';
            submitBtn.style.backgroundColor = '#28a745';
            submitBtn.disabled = true;
            emailInput.value = '';
            emailInput.disabled = true;

            // Reset after 3 seconds to allow another submission
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                emailInput.disabled = false;
            }, 3000);
        }
    });
}

// Dynamic copyright year
document.addEventListener('DOMContentLoaded', function () {
    const copyrightElements = document.querySelectorAll('.footer-bottom p');
    copyrightElements.forEach(el => {
        el.innerHTML = el.innerHTML.replace('© 2024', '© ' + new Date().getFullYear());
    });
});

// Prevent page jump on placeholder social links
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
    });
});
