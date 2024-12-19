// Loader functionality
function handleLoader() {
    const loader = document.querySelector('#loader');
    const main = document.querySelector('#main');
    
    // Get visit count from localStorage
    let visitCount = parseInt(localStorage.getItem('visitCount')) || 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount);

    // Only show loader on 3rd visit
    if (visitCount === 3) {
        loader.style.display = 'flex';
        main.style.display = 'none';
        
        // Loader text animation sequence
        const texts = loader.querySelectorAll('h1');
        let currentText = 0;
        
        const showText = () => {
            if (currentText < texts.length) {
                texts[currentText].style.opacity = '1';
                setTimeout(() => {
                    texts[currentText].style.opacity = '0';
                    currentText++;
                    showText();
                }, 1000);
            } else {
                // Hide loader after animation
                setTimeout(() => {
                    loader.style.display = 'none';
                    main.style.display = 'block';
                }, 500);
            }
        };

        showText();
    } else {
        // Hide loader immediately for other visits
        loader.style.display = 'none';
        main.style.display = 'block';
    }
}

// Call loader function when DOM is loaded
document.addEventListener('DOMContentLoaded', handleLoader);

// Navigation Menu Toggle
const menuBtn = document.querySelector('nav h3');
const navPart2 = document.querySelector('#nav-part2');

menuBtn.addEventListener('click', () => {
    navPart2.style.display = navPart2.style.display === 'none' ? 'flex' : 'none';
});

// Navigation functionality
const nav = document.querySelector('nav');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');

// Handle mobile menu toggle
mobileNavToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Toggle the active class
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
        mobileNavToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Navigation scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class based on scroll position
    if (currentScroll > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    // Hide/show nav based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Active navigation item
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').includes(current)) {
            item.classList.add('active');
        }
    });
});

// Update active nav item based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll for nav links
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Close mobile menu if open
        mobileNavToggle.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Smooth scroll to section
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill, .award-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize elements with opacity 0 and transform
document.querySelectorAll('.skill, .award-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
});

// Add scroll event listener
window.addEventListener('scroll', animateOnScroll);

// Initial check for elements in view
animateOnScroll();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

function page4Animation() {
    var elemC = document.querySelector("#elem-container")
    var fixed = document.querySelector("#fixed-image")
    elemC.addEventListener("mouseenter", function () {
        fixed.style.display = "block"
    })
    elemC.addEventListener("mouseleave", function () {
        fixed.style.display = "none"
    })

    var elems = document.querySelectorAll(".elem")
    elems.forEach(function (e) {
        e.addEventListener("mouseenter", function () {
            var image = e.getAttribute("data-image")
            fixed.style.backgroundImage = `url(${image})`
        })
    })
}

function swiperAnimation() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 100,
    });
}

function menuAnimation() {

    var menu = document.querySelector("nav h3")
    var full = document.querySelector("#full-scr")
    var navimg = document.querySelector("nav img")
    var flag = 0
    menu.addEventListener("click", function () {
        if (flag == 0) {
            full.style.top = 0
            navimg.style.opacity = 0
            flag = 1
        } else {
            full.style.top = "-100%"
            navimg.style.opacity = 1
            flag = 0
        }
    })
}

swiperAnimation()
page4Animation()
menuAnimation()

// Moving text animation with scroll
function initMovingText() {
    const movingTextContainer = document.querySelector('#moving-text');
    const textElements = movingTextContainer.querySelectorAll('h1');
    
    if (!movingTextContainer || !textElements.length) return;

    // Set initial position
    gsap.set(textElements, {
        x: window.innerWidth // Start from right side of screen
    });

    // Create animation for each text element
    textElements.forEach((text, index) => {
        gsap.to(text, {
            x: -window.innerWidth, // Move to left side of screen
            duration: 2,
            ease: "none",
            scrollTrigger: {
                trigger: movingTextContainer,
                start: "top center",
                end: "bottom center",
                scrub: 1, // Smooth scrubbing effect
                toggleActions: "play none none reverse"
            }
        });
    });
}

// Initialize moving text animation
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    initMovingText();
});