/* ==========================================================================
   Lajes Iran Lima - JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu when a link is clicked
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // --- Header Scrolled Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Active Link on Scroll (ScrollSpy) ---
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightNavLink);

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.service-card, .diff-card, .process-step, .about-info, .about-visual, .contact-info-block, .contact-form-container, .coverage-info, .coverage-map, .testimonial-card');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        // Set initial state for animated fade-ins
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(element);
    });

    // --- Contact Form Submission Simulation ---
    const quoteForm = document.getElementById('quote-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const spinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
    const btnText = submitBtn ? submitBtn.querySelector('span') : null;
    const formFeedback = document.getElementById('form-feedback');

    if (quoteForm && submitBtn) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            if (spinner) spinner.style.display = 'inline-block';
            if (btnText) btnText.textContent = 'Enviando Orçamento...';
            if (formFeedback) formFeedback.style.display = 'none';

            // Simulate server request delay
            setTimeout(() => {
                // Reset button state
                submitBtn.disabled = false;
                if (spinner) spinner.style.display = 'none';
                if (btnText) btnText.textContent = 'Solicitar Orçamento';

                // Display success message
                if (formFeedback) {
                    formFeedback.style.display = 'block';
                    formFeedback.className = 'form-feedback success';
                    formFeedback.textContent = 'Orçamento solicitado com sucesso! Nossa equipe técnica entrará em contato em breve.';
                }

                // Reset form fields
                quoteForm.reset();
            }, 2000);
        });
    }

    // --- Counter Animation for Stats Banner ---
    const counterElements = document.querySelectorAll('.stat-banner-number');
    
    if (counterElements.length > 0) {
        const countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const countTo = parseInt(target.getAttribute('data-target'), 10);
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();
                    
                    function updateCount(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        // Ease out cubic
                        const easeProgress = 1 - Math.pow(1 - progress, 3);
                        const currentCount = Math.floor(easeProgress * countTo);
                        
                        // Formatting prefixes / suffixes
                        if (target.id === 'years-stat') {
                            target.textContent = `+${currentCount}`;
                        } else if (target.id === 'sat-stat') {
                            target.textContent = `${currentCount}%`;
                        } else {
                            target.textContent = `+${currentCount.toLocaleString('pt-BR')}`;
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(updateCount);
                        } else {
                            // Finish exactly on target
                            if (target.id === 'years-stat') {
                                target.textContent = `+${countTo}`;
                            } else if (target.id === 'sat-stat') {
                                target.textContent = `${countTo}%`;
                            } else {
                                target.textContent = `+${countTo.toLocaleString('pt-BR')}`;
                            }
                        }
                    }
                    
                    requestAnimationFrame(updateCount);
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        counterElements.forEach(el => countObserver.observe(el));
    }

    // --- Testimonials Carousel Auto-Slide & Logic ---
    const track = document.getElementById('testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.getElementById('carousel-dots');
    
    if (track && cards.length > 0) {
        let index = 0;
        let interval = null;
        
        function getVisibleCount() {
            if (window.innerWidth <= 600) return 1;
            if (window.innerWidth <= 992) return 2;
            return 3;
        }
        
        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const visibleCount = getVisibleCount();
            const steps = cards.length - visibleCount + 1;
            
            for (let i = 0; i < steps; i++) {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (i === index) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    index = i;
                    updateCarousel();
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        function updateDots(currentIndex, totalSteps) {
            if (!dotsContainer) return;
            if (dotsContainer.children.length !== totalSteps) {
                createDots();
                return;
            }
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                if (i === currentIndex) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        }
        
        function updateCarousel() {
            const visibleCount = getVisibleCount();
            const maxIndex = cards.length - visibleCount;
            if (index > maxIndex) index = 0; // fallback to start if out of bounds on resize
            
            // Calculate dynamic width of one card + computed CSS gap
            const cardWidth = cards[0].getBoundingClientRect().width;
            const style = window.getComputedStyle(track);
            const gap = parseFloat(style.columnGap || style.gap) || 0;
            
            const moveAmount = (cardWidth + gap) * index;
            track.style.transform = `translateX(-${moveAmount}px)`;
            
            updateDots(index, maxIndex + 1);
        }
        
        function startInterval() {
            interval = setInterval(() => {
                const visibleCount = getVisibleCount();
                const maxIndex = cards.length - visibleCount;
                index = (index >= maxIndex) ? 0 : index + 1;
                updateCarousel();
            }, 4000);
        }
        
        function resetInterval() {
            clearInterval(interval);
            startInterval();
        }
        
        // Initialize Carousel
        createDots();
        updateCarousel();
        startInterval();
        
        // Redraw on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                createDots();
                updateCarousel();
            }, 100);
        });
    }

});
