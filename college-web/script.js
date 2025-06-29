// Show/Hide Sections
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav active state
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.style.backgroundColor = '';
        link.style.color = '';
    });
    event.target.style.backgroundColor = '#667eea';
    event.target.style.color = 'white';
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Add smooth transitions to navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const sectionId = this.getAttribute('href').substring(1); // remove the '#'
            showSection(sectionId); // Show/hide sections

            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}


// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = +counter.innerText;
        const increment = target / 200;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounters(), 10);
        } else {
            counter.innerText = target;
        }
    });
}

// Add parallax effect to hero section
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Add intersection observer for animations
function initializeAnimationObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe elements for animation
    document.querySelectorAll('.gallery-item, .course-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Add form validation (if contact form is added later)
function validateForm(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    
    inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#ddd';
        }
    });
    
    return isValid;
}

// Add search functionality for courses
function initializeSearch() {
    const searchInput = document.getElementById('courseSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const courseCards = document.querySelectorAll('.course-card');
            
            courseCards.forEach(card => {
                const courseText = card.textContent.toLowerCase();
                if (courseText.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.opacity = '1';
                } else {
                    card.style.display = 'none';
                    card.style.opacity = '0';
                }
            });
        });
    }
}

// Add mobile menu toggle
function initializeMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const nav = document.querySelector('nav ul');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            nav.classList.toggle('show');
            this.classList.toggle('active');
        });
    }
}

// Add smooth scroll behavior for internal links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            color: white;
            font-size: 1.5rem;
        ">
            <div style="text-align: center;">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 5px solid rgba(255,255,255,0.3);
                    border-top: 5px solid white;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                "></div>
                Loading Sri Gayatri Jr College...
            </div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 1000);
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Show loading animation
    showLoadingAnimation();
    
    // Create particles
    createParticles();
    
    // Initialize navigation
    initializeNavigation();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scroll
    initializeSmoothScroll();
    
    // Initialize animation observer
    initializeAnimationObserver();
    
    // Initialize search functionality
    initializeSearch();
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1500);
    }
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        const fab = document.querySelector('.fab');
        
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
            if (fab) fab.style.display = 'flex';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            if (fab) fab.style.display = 'none';
        }
    });

    // Gallery hover effects
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
    });

    // Course card interactions
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
    });

    // Table row hover effects
    document.querySelectorAll('.fee-table tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f8f9fa';
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Contact item animations
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotate(2deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
    });

    // Add click effects to buttons and links
    document.querySelectorAll('nav a, .fab').forEach(element => {
        element.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Initialize parallax effect
    initializeParallax();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or menus
            const mobileNav = document.querySelector('nav ul');
            if (mobileNav && mobileNav.classList.contains('show')) {
                mobileNav.classList.remove('show');
            }
        }
    });

    // Add print styles optimization
    window.addEventListener('beforeprint', function() {
        document.body.style.background = 'white';
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.display = 'none';
        });
    });

    window.addEventListener('afterprint', function() {
        document.body.style.background = '';
        document.querySelectorAll('.particle').forEach(particle => {
            particle.style.display = 'block';
        });
    });

    console.log('Sri Gayatri Jr College website loaded successfully!');
});

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .mobile-menu.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    nav ul.show {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        padding: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    @media (max-width: 768px) {
        nav ul {
            display: none;
        }
        
        .mobile-menu {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);
 <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CollegeOrUniversity",
      "name": "Sri Gayatri Jr College",
      "url": "https://sri-gayatri-college.tiiny.site",
      "logo": "https://sri-gayatri-college.tiiny.site/logo.jpg",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Main Road, Beside R&B bungalow",
        "addressLocality": "Rajampet",
        "addressRegion": "Andhra Pradesh",
        "postalCode": "516115",
        "addressCountry": "IN"
      },
      "telephone": "+91-9110330767",
      "email": "info@srigayatricollege.edu.in",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9160246026",
        "contactType": "Admissions"
      },
      "foundingDate": "2001",
      "description": "Sri Gayatri Jr College in Rajampet, Andhra Pradesh, offers quality intermediate education with experienced faculty and modern infrastructure."
    }
    </script>
  
