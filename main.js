/* ============================================ */
/* BADAL MEHER PORTFOLIO - MAIN JAVASCRIPT      */
/* Version: 1.0.0                               */
/* Security: XSS-safe, No eval, CSP-compliant   */
/* ============================================ */

(function() {
    'use strict';

    /* ============================================ */
    /* CONFIGURATION                                */
    /* ============================================ */
    const CONFIG = {
        typingSpeed: 100,
        typingDeleteSpeed: 50,
        typingPause: 2000,
        typingPhrases: [
            'innovative startups',
            'scalable solutions',
            'digital experiences',
            'future-ready products',
            'impactful technology'
        ],
        particleCount: window.matchMedia('(pointer: coarse)').matches ? 30 : 60,
        particleConnectionDistance: 120,
        scrollRevealThreshold: 0.15,
        counterDuration: 2000,
        galleryAutoplayInterval: 5000
    };

    /* ============================================ */
    /* DOM ELEMENT REFERENCES                       */
    /* ============================================ */
    const DOM = {
        loadingScreen: document.getElementById('loading-screen'),
        loadingBar: document.getElementById('loading-bar'),
        scrollProgress: document.getElementById('scroll-progress'),
        customCursor: document.getElementById('custom-cursor'),
        customCursorTrail: document.getElementById('custom-cursor-trail'),
        siteHeader: document.getElementById('site-header'),
        mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
        navMenu: document.getElementById('nav-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        typingText: document.getElementById('typing-text'),
        particleCanvas: document.getElementById('particle-canvas'),
        statNumbers: document.querySelectorAll('.stat-number'),
        gallerySlider: document.getElementById('gallery-slider'),
        gallerySlides: document.querySelectorAll('.gallery-slide'),
        galleryPrev: document.getElementById('gallery-prev'),
        galleryNext: document.getElementById('gallery-next'),
        galleryDots: document.querySelectorAll('.gallery-dot'),
        contactForm: document.getElementById('contact-form'),
        formStatus: document.getElementById('form-status'),
        submitBtn: document.getElementById('submit-btn'),
        backToTop: document.getElementById('back-to-top'),
        currentYear: document.getElementById('current-year'),
        revealElements: document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
    };

    /* ============================================ */
    /* UTILITY FUNCTIONS                            */
    /* ============================================ */

    /**
     * Throttle function execution
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in ms
     * @returns {Function}
     */
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Debounce function execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function}
     */
    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    /**
     * Sanitize user input for safe display
     * @param {string} str - String to sanitize
     * @returns {string}
     */
    function sanitizeInput(str) {
        if (typeof str !== 'string') return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Validate email format
     * @param {string} email - Email to validate
     * @returns {boolean}
     */
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Validate phone format (optional, basic check)
     * @param {string} phone - Phone to validate
     * @returns {boolean}
     */
    function isValidPhone(phone) {
        if (!phone) return true; // Optional
        const re = /^[\+]?[\d\s\-\(\)]+$/;
        return re.test(phone) && phone.replace(/\D/g, '').length >= 7;
    }

    /* ============================================ */
    /* LOADING SCREEN                               */
    /* ============================================ */
    function initLoadingScreen() {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    DOM.loadingScreen.classList.add('hidden');
                    document.body.style.overflow = '';
                    // Trigger initial reveal animations
                    setTimeout(checkRevealAnimations, 300);
                }, 500);
            }
            DOM.loadingBar.style.width = progress + '%';
        }, 150);

        // Prevent scroll during loading
        document.body.style.overflow = 'hidden';
    }

    /* ============================================ */
    /* SCROLL PROGRESS BAR                          */
    /* ============================================ */
    function updateScrollProgress() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        DOM.scrollProgress.style.width = progress + '%';
    }

    /* ============================================ */
    /* CUSTOM CURSOR                                */
    /* ============================================ */
    function initCustomCursor() {
        // Skip on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let trailX = 0, trailY = 0;
        let isActive = false;
        let rafId = null;

        function onMouseMove(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isActive) {
                isActive = true;
                DOM.customCursor.classList.add('active');
                DOM.customCursorTrail.classList.add('active');
                animate();
            }
        }

        function animate() {
            if (!isActive) return;

            // Smooth follow for main cursor
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;

            // Slower follow for trail
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;

            DOM.customCursor.style.left = cursorX + 'px';
            DOM.customCursor.style.top = cursorY + 'px';
            DOM.customCursorTrail.style.left = trailX + 'px';
            DOM.customCursorTrail.style.top = trailY + 'px';

            rafId = requestAnimationFrame(animate);
        }

        function onMouseLeave() {
            isActive = false;
            DOM.customCursor.classList.remove('active');
            DOM.customCursorTrail.classList.remove('active');
            if (rafId) cancelAnimationFrame(rafId);
        }

        // Hover effects on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .gallery-btn, .gallery-dot, .social-card, .skill-tag');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                DOM.customCursor.classList.add('hover');
                DOM.customCursorTrail.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                DOM.customCursor.classList.remove('hover');
                DOM.customCursorTrail.classList.remove('hover');
            });
        });

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);
    }

    /* ============================================ */
    /* NAVIGATION                                   */
    /* ============================================ */
    function initNavigation() {
        // Scroll behavior for navbar
        function handleScroll() {
            const scrollY = window.scrollY;

            // Add/remove scrolled class
            if (scrollY > 50) {
                DOM.siteHeader.classList.add('scrolled');
            } else {
                DOM.siteHeader.classList.remove('scrolled');
            }

            // Back to top visibility
            if (scrollY > 500) {
                DOM.backToTop.classList.add('visible');
            } else {
                DOM.backToTop.classList.remove('visible');
            }

            // Update scroll progress
            updateScrollProgress();
        }

        window.addEventListener('scroll', throttle(handleScroll, 16), { passive: true });
        handleScroll(); // Initial check

        // Mobile menu toggle
        DOM.mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = DOM.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            DOM.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            DOM.navMenu.classList.toggle('active');
            document.body.style.overflow = isExpanded ? '' : 'hidden';
        });

        // Close mobile menu on link click
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                DOM.mobileMenuToggle.setAttribute('aria-expanded', 'false');
                DOM.navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Smooth scroll for anchor links
        DOM.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.scrollY - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Back to top
        DOM.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ============================================ */
    /* TYPING EFFECT                                */
    /* ============================================ */
    function initTypingEffect() {
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isPaused = false;

        function type() {
            const currentPhrase = CONFIG.typingPhrases[phraseIndex];

            if (isPaused) {
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    type();
                }, CONFIG.typingPause);
                return;
            }

            if (isDeleting) {
                DOM.typingText.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % CONFIG.typingPhrases.length;
                }

                setTimeout(type, CONFIG.typingDeleteSpeed);
            } else {
                DOM.typingText.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === currentPhrase.length) {
                    isPaused = true;
                }

                setTimeout(type, CONFIG.typingSpeed);
            }
        }

        // Start typing after loading screen
        setTimeout(type, 1500);
    }

    /* ============================================ */
    /* PARTICLE CANVAS                              */
    /* ============================================ */
    function initParticles() {
        const canvas = DOM.particleCanvas;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId = null;
        let isVisible = true;

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.color = Math.random() > 0.5 ? '0, 212, 255' : '59, 130, 246';
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
                ctx.fill();
            }
        }

        function init() {
            resize();
            particles = [];
            for (let i = 0; i < CONFIG.particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < CONFIG.particleConnectionDistance) {
                        const opacity = (1 - distance / CONFIG.particleConnectionDistance) * 0.15;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            if (!isVisible) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            drawConnections();

            animationId = requestAnimationFrame(animate);
        }

        // Visibility observer to pause when not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible && !animationId) {
                    animate();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(canvas);

        window.addEventListener('resize', debounce(resize, 200));

        init();
        animate();
    }

    /* ============================================ */
    /* COUNTER ANIMATION                            */
    /* ============================================ */
    function initCounters() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'));
                    const duration = CONFIG.counterDuration;
                    const start = 0;
                    const startTime = performance.now();

                    function updateCounter(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);

                        // Ease out quart
                        const ease = 1 - Math.pow(1 - progress, 4);
                        const current = Math.floor(start + (target - start) * ease);

                        el.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            el.textContent = target;
                        }
                    }

                    requestAnimationFrame(updateCounter);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        DOM.statNumbers.forEach(stat => observer.observe(stat));
    }

    /* ============================================ */
    /* GALLERY SLIDER                               */
    /* ============================================ */
    function initGallery() {
        let currentSlide = 0;
        let autoplayTimer = null;
        const totalSlides = DOM.gallerySlides.length;

        function showSlide(index) {
            // Handle wrap-around
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;

            currentSlide = index;

            // Update slides
            DOM.gallerySlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });

            // Update dots
            DOM.galleryDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function startAutoplay() {
            autoplayTimer = setInterval(nextSlide, CONFIG.galleryAutoplayInterval);
        }

        function stopAutoplay() {
            clearInterval(autoplayTimer);
        }

        // Event listeners
        DOM.galleryNext.addEventListener('click', () => {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });

        DOM.galleryPrev.addEventListener('click', () => {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });

        DOM.galleryDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoplay();
                showSlide(index);
                startAutoplay();
            });
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        const slider = DOM.gallerySlider;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoplay();
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            startAutoplay();
        }, { passive: true });

        // Pause on hover
        slider.addEventListener('mouseenter', stopAutoplay);
        slider.addEventListener('mouseleave', startAutoplay);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const gallerySection = document.getElementById('gallery');
            const rect = gallerySection.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

            if (isVisible) {
                if (e.key === 'ArrowRight') {
                    stopAutoplay();
                    nextSlide();
                    startAutoplay();
                } else if (e.key === 'ArrowLeft') {
                    stopAutoplay();
                    prevSlide();
                    startAutoplay();
                }
            }
        });

        startAutoplay();
    }

    /* ============================================ */
    /* CONTACT FORM                                 */
    /* ============================================ */
    function initContactForm() {
        if (!DOM.contactForm) return;

        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const phoneInput = document.getElementById('contact-phone');
        const messageInput = document.getElementById('contact-message');
        const honeypot = document.getElementById('website');
        const charCount = document.getElementById('char-count');

        // Character counter
        messageInput.addEventListener('input', () => {
            const length = messageInput.value.length;
            charCount.textContent = length;

            if (length > 2000) {
                charCount.style.color = '#ef4444';
            } else if (length > 1500) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = '';
            }
        });

        // Real-time validation
        function validateField(input, validator, errorId) {
            const errorEl = document.getElementById(errorId);
            const isValid = validator(input.value);

            if (input.value && !isValid) {
                input.classList.add('error');
                input.classList.remove('success');
                errorEl.classList.add('visible');
                return false;
            } else if (input.value && isValid) {
                input.classList.remove('error');
                input.classList.add('success');
                errorEl.classList.remove('visible');
                return true;
            } else {
                input.classList.remove('error', 'success');
                errorEl.classList.remove('visible');
                return !input.required;
            }
        }

        nameInput.addEventListener('blur', () => {
            validateField(nameInput, (v) => v.length >= 2 && v.length <= 100, 'name-error');
        });

        emailInput.addEventListener('blur', () => {
            validateField(emailInput, isValidEmail, 'email-error');
        });

        phoneInput.addEventListener('blur', () => {
            validateField(phoneInput, isValidPhone, 'phone-error');
        });

        messageInput.addEventListener('blur', () => {
            validateField(messageInput, (v) => v.length >= 10 && v.length <= 2000, 'message-error');
        });

        // Form submission
        DOM.contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Honeypot check (spam protection)
            if (honeypot && honeypot.value) {
                console.warn('Honeypot triggered - possible bot submission');
                return;
            }

            // Validate all fields
            const isNameValid = validateField(nameInput, (v) => v.length >= 2 && v.length <= 100, 'name-error');
            const isEmailValid = validateField(emailInput, isValidEmail, 'email-error');
            const isPhoneValid = validateField(phoneInput, isValidPhone, 'phone-error');
            const isMessageValid = validateField(messageInput, (v) => v.length >= 10 && v.length <= 2000, 'message-error');

            if (!isNameValid || !isEmailValid || !isPhoneValid || !isMessageValid) {
                showFormStatus('Please fix the errors above before submitting.', 'error');
                return;
            }

            // Prepare data
            const formData = {
                name: sanitizeInput(nameInput.value.trim()),
                email: sanitizeInput(emailInput.value.trim()),
                phone: sanitizeInput(phoneInput.value.trim()),
                message: sanitizeInput(messageInput.value.trim()),
                timestamp: new Date().toISOString()
            };

            // Show loading state
            DOM.submitBtn.classList.add('loading');
            DOM.submitBtn.disabled = true;

            /* 
            ============================================
            FORM SUBMISSION OPTIONS
            ============================================

            OPTION 1: Formspree (Recommended for static sites)
            -----------------------------------------------
            1. Sign up at https://formspree.io
            2. Create a new form and get your endpoint URL
            3. Replace the fetch below with:

            const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            OPTION 2: Netlify Forms
            -----------------------------------------------
            1. Add data-netlify="true" to the form tag in HTML
            2. Add a hidden input: <input type="hidden" name="form-name" value="contact">
            3. Netlify will handle submissions automatically

            OPTION 3: Google Forms
            -----------------------------------------------
            1. Create a Google Form
            2. Get the prefilled URL parameters
            3. Redirect or submit via fetch

            OPTION 4: Custom Backend
            -----------------------------------------------
            Replace the fetch with your API endpoint
            ============================================
            */

            // Simulated submission (replace with real endpoint)
            try {
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1500));

                // For production, uncomment and use one of the options above
                // const response = await fetch('/api/contact', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // });

                // if (!response.ok) throw new Error('Submission failed');

                // Success
                showFormStatus('Thank you! Your message has been sent successfully. I'll get back to you within 24 hours.', 'success');
                DOM.contactForm.reset();
                charCount.textContent = '0';

                // Clear validation states
                [nameInput, emailInput, phoneInput, messageInput].forEach(input => {
                    input.classList.remove('error', 'success');
                });

            } catch (error) {
                showFormStatus('Something went wrong. Please try again or email me directly at hello@badalmeher.com', 'error');
                console.error('Form submission error:', error);
            } finally {
                DOM.submitBtn.classList.remove('loading');
                DOM.submitBtn.disabled = false;
            }
        });

        function showFormStatus(message, type) {
            DOM.formStatus.textContent = message;
            DOM.formStatus.className = 'form-status visible ' + type;

            // Auto-hide after 8 seconds
            setTimeout(() => {
                DOM.formStatus.classList.remove('visible');
            }, 8000);
        }
    }

    /* ============================================ */
    /* SCROLL REVEAL ANIMATIONS                     */
    /* ============================================ */
    function initScrollReveal() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: CONFIG.scrollRevealThreshold,
            rootMargin: '0px 0px -50px 0px'
        });

        DOM.revealElements.forEach(el => observer.observe(el));
    }

    function checkRevealAnimations() {
        // Check elements that might already be in viewport on load
        DOM.revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.classList.add('visible');
            }
        });
    }

    /* ============================================ */
    /* CURRENT YEAR                                 */
    /* ============================================ */
    function initCurrentYear() {
        if (DOM.currentYear) {
            DOM.currentYear.textContent = new Date().getFullYear();
        }
    }

    /* ============================================ */
    /* PERFORMANCE: LAZY LOAD IMAGES                */
    /* ============================================ */
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
        }
    }

    /* ============================================ */
    /* SECURITY: PREVENT COMMON ATTACKS             */
    /* ============================================ */
    function initSecurity() {
        // Prevent right-click context menu on images (optional, for protection)
        document.addEventListener('contextmenu', (e) => {
            if (e.target.tagName === 'IMG') {
                // Optional: e.preventDefault();
            }
        });

        // Detect and warn about console usage (basic deterrence)
        const devToolsCheck = () => {
            const threshold = 160;
            const widthThreshold = window.outerWidth - window.innerWidth > threshold;
            const heightThreshold = window.outerHeight - window.innerHeight > threshold;

            if (widthThreshold || heightThreshold) {
                console.log('%cStop!', 'color: red; font-size: 50px; font-weight: bold;');
                console.log('%cThis is a browser feature intended for developers.', 'color: #00d4ff; font-size: 16px;');
            }
        };

        // Run check periodically
        setInterval(devToolsCheck, 3000);
    }

    /* ============================================ */
    /* INITIALIZATION                               */
    /* ============================================ */
    function init() {
        initLoadingScreen();
        initCustomCursor();
        initNavigation();
        initTypingEffect();
        initParticles();
        initCounters();
        initGallery();
        initContactForm();
        initScrollReveal();
        initCurrentYear();
        initLazyLoading();
        initSecurity();

        console.log('%cBadal Meher Portfolio', 'color: #00d4ff; font-size: 24px; font-weight: bold;');
        console.log('%cBuilt with precision and passion.', 'color: #94a3b8; font-size: 14px;');
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
