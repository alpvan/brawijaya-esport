// Smooth scroll transitions with Intersection Observer
// Auto-attaches to elements with data-scroll attribute

export const initScrollTransitions = () => {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    // Observe all elements with scroll transition classes
    const elementsToAnimate = document.querySelectorAll(
        '[data-scroll], .scroll-fade-in, .scroll-scale-in, section, .animate-on-scroll'
    );

    elementsToAnimate.forEach(el => {
        // Add scroll animation class if not already present
        if (!el.classList.contains('scroll-fade-in') && !el.classList.contains('scroll-scale-in')) {
            el.classList.add('scroll-fade-in');
        }
        observer.observe(el);
    });

    // Add parallax effect on scroll
    let ticking = false;

    const handleScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;

                // Parallax for elements with data-parallax attribute
                document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
                    const speed = parseFloat(el.getAttribute('data-parallax') || '0.5');
                    const yPos = -(scrolled * speed);
                    el.style.transform = `translateY(${yPos}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
    };
};

// Auto-initialize on DOM load
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollTransitions);
    } else {
        initScrollTransitions();
    }
}
