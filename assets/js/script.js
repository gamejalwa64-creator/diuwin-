/**
 * Diuwin Website Exact Replica JavaScript
 * Handles minimal interactive UI components in 100% vanilla JavaScript.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const menuToggleBtn = document.getElementById('mobile-menu-toggle');
    const mainNav = document.querySelector('.nav-menu');

    if (menuToggleBtn && mainNav) {
        menuToggleBtn.addEventListener('click', () => {
            mainNav.classList.toggle('is-open');
            const expanded = menuToggleBtn.getAttribute('aria-expanded') === 'true' || false;
            menuToggleBtn.setAttribute('aria-expanded', !expanded);
        });
    }

    // 2. Sticky Navbar on Scroll
    const siteHeader = document.getElementById('site-header');
    
    if (siteHeader) {
        // We use a small offset like 50px before making it sticky to avoid jumpiness
        const stickyThreshold = 50;

        window.addEventListener('scroll', () => {
            if (window.scrollY > stickyThreshold) {
                if (!siteHeader.classList.contains('is-sticky')) {
                    siteHeader.classList.add('is-sticky');
                }
            } else {
                if (siteHeader.classList.contains('is-sticky')) {
                    siteHeader.classList.remove('is-sticky');
                }
            }
        });
    }

    // 3. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Close all other FAQs (optional accordion behavior like the original rank-math)
            document.querySelectorAll('.faq-question.active').forEach(activeQ => {
                if (activeQ !== question) {
                    activeQ.classList.remove('active');
                    activeQ.nextElementSibling.style.maxHeight = null;
                    activeQ.nextElementSibling.style.paddingTop = '0';
                    activeQ.nextElementSibling.style.paddingBottom = '0';
                }
            });

            // Toggle current FAQ
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 40 + "px"; // 40px for padding
                answer.style.paddingTop = '10px';
                answer.style.paddingBottom = '10px';
            } else {
                question.classList.remove('active');
                answer.style.maxHeight = null;
                answer.style.paddingTop = '0';
                answer.style.paddingBottom = '0';
            }
        });
    });

    // 4. Smooth scrolling for TOC links
    document.querySelectorAll('.table-of-contents a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Offset for sticky header
                    const headerOffset = siteHeader ? siteHeader.offsetHeight + 20 : 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // 5. Scroll-reveal animations via IntersectionObserver
    const revealSelectors = [
        '.game-card',
        '.testimonial-card',
        '.faq-item',
        '.screenshot-img',
        '.feature-card',
        '.strategy-card',
        '.table-of-contents',
        '.article-image',
        '.main-article > p',
        '.main-article > h2',
        '.main-article > h3',
        '.action-btn-wrapper',
        '.standard-list',
    ];

    // Attach .reveal class to all target elements
    revealSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add('reveal');
            // Set stagger order for grid children
            el.style.setProperty('--reveal-order', index % 6);
        });
    });

    // Create observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Stop observing once revealed to avoid re-triggering
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,       // trigger when 12% of the element is visible
        rootMargin: '0px 0px -40px 0px'  // fire slightly before element enters bottom of viewport
    });

    // Observe all revealed elements
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // 6. TOC Show / Hide toggle
    const tocToggleBtn = document.getElementById('toc-toggle-btn');
    const tocBody = document.getElementById('toc-body');

    if (tocToggleBtn && tocBody) {
        tocToggleBtn.addEventListener('click', () => {
            const isCollapsed = tocBody.classList.toggle('collapsed');
            tocToggleBtn.textContent = isCollapsed ? 'show' : 'hide';
            tocToggleBtn.setAttribute('aria-expanded', !isCollapsed);
        });
    }

});

