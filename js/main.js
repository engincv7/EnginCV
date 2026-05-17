// Initialize Libraries and Custom Scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Initialize AOS Animation Library
    AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
        offset: 80, // offset (in px) from the original trigger point
        duration: 1000, // values from 0 to 3000, with step 50ms
        easing: 'ease-out-cubic', // default easing for AOS animations
    });

    // 2. Initialize Vanilla Tilt for 3D card effect (Features Cards)
    const tiltElements = document.querySelectorAll(".tilt-effect");
    if(tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(tiltElements, {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.15,
            scale: 1.02
        });
    }

    // 3. Initialize Vanilla Tilt for Hero Mockups (with different settings)
    const heroTiltElements = document.querySelectorAll(".tilt-effect-hero");
    if(heroTiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(heroTiltElements, {
            max: 5,
            speed: 300,
            glare: true,
            "max-glare": 0.2,
        });
    }

    // 4. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar-glass');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                // Get navbar height dynamically to offset the scroll correctly
                let navHeight = document.querySelector('.navbar').offsetHeight;
                const navbarCollapse = document.querySelector('.navbar-collapse');
                
                // If mobile menu is open, it increases navbar height. 
                // We must subtract its height so the scroll offset is correct after it closes.
                if(navbarCollapse.classList.contains('show')) {
                    navHeight = navHeight - navbarCollapse.offsetHeight;
                    // Auto-close mobile menu
                    document.querySelector('.navbar-toggler').click();
                }

                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 6. Update Active Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.navbar').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Check if scroll is within the section
            if (pageYOffset >= (sectionTop - navHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 7. Scroll to Top Button Logic
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if(scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
