// Main script file for xenotect

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar background effect on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }
    });
    
    // 2. Intersection Observer for Scroll Animations
    // This triggers the sequential reveal animations when a service panel comes into view
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25 // Trigger when 25% of the panel is visible
    };
    
    const panelObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the 'active' class to trigger CSS transitions
                entry.target.classList.add('active');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            } else {
                // If you want the animation to replay when scrolling back up/down,
                // you can remove the active class. Otherwise, remove this else block.
                // entry.target.classList.remove('active');
            }
        });
    }, observerOptions);
    
    // Select all service panels and observe them
    const servicePanels = document.querySelectorAll('.service-panel');
    servicePanels.forEach(panel => {
        panelObserver.observe(panel);
    });
});
