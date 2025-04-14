// Images and other downloaded content may not be available
document.addEventListener('DOMContentLoaded', function () {
    // Shows all other content once Pace.js is done
    Pace.on('done', function () {
        const content = document.getElementById('content');
        const preloader = document.getElementById('preloader');

        if (content) {
            content.style.opacity = 1; // Make content visible
        }

        if (preloader) {
            $('#preloader').fadeOut(); // Hide preloader with fade-out effect
            preloader.style.opacity = 0; // Hide preloader
        }
    });
});

// Everything is loaded
window.onload = function () {
    "use strict";

    // Smooth scrolling for anchor links using scrollIntoView
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    // Get the target's position
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    // Subtract 10 pixels from the target position
                    const offsetPosition = targetPosition - 100;

                    // Scroll to the adjusted position
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize Slick carousel for the hero section
    if ($('.hero-carousel').length) {
        $('.hero-carousel').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: false,
            dots: false,
            swipeToSlide: true,
            useCSS: true,
            useTransform: true,
            lazyLoad: 'progressive'
        });
    }

    // Initialize Bootstrap carousel for the rooms section
    const roomsCarousel = document.getElementById('rooms-carousel');
    if (roomsCarousel) {
        new bootstrap.Carousel(roomsCarousel, {
            interval: 2500, // Auto-slide every 2 seconds
            touch: true // Enable touch gestures
        });
    }

    const restaurantCarousel = document.getElementById('restaurant-carousel');
    if (restaurantCarousel) {
        new bootstrap.Carousel(restaurantCarousel, {
            interval: 2500, // Auto-slide every 2 seconds
            touch: true // Enable touch gestures
        });
    }

    // Show glowing button when scrolling past the hero section
    const hero = document.getElementById("hero");
    const button = document.querySelector(".glowing-btn-wrapper");

    if (hero && button) {
        window.addEventListener("scroll", () => {
            const heroBottom = hero.getBoundingClientRect().bottom;
            const halfWindowHeight = window.innerHeight / 2;

            if (heroBottom <= halfWindowHeight) {
                button.classList.add("show");
            } else {
                button.classList.remove("show");
            }
        });
    }

    // Animate glowing button when scrolled to the bottom
    let animated = false;

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        const scrolledToBottom = scrollTop + windowHeight >= docHeight - 10;

        if (scrolledToBottom && !animated) {
            button.classList.add("animate__hinge");
            animated = true;
        }

        // Reset animation when scrolling back up
        if (!scrolledToBottom && animated) {
            button.classList.remove("animate__hinge");
            animated = false;
        }
    });

    // Close navbar when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bootstrapCollapse = new bootstrap.Collapse(navbarCollapse);
                bootstrapCollapse.hide();
            }
        });
    });

    // Close navbar when clicking outside the menu area
    document.addEventListener('click', function (event) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');

        // Check if navbar is expanded and click is outside navbar
        if (navbarCollapse && navbarCollapse.classList.contains('show') &&
            !navbarCollapse.contains(event.target) &&
            !navbarToggler.contains(event.target)) {

            // Create a Bootstrap collapse instance and hide it
            const bootstrapCollapse = new bootstrap.Collapse(navbarCollapse);
            bootstrapCollapse.hide();
        }
    });

    // Initialize the Map
    var hotelCoords = [57.05119048303024, -135.3335];
    var map = L.map('map_dialog', {
        center: hotelCoords,
        zoom: 15,
        dragging: true,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: false,
        keyboard: false,
        touchZoom: true,
        tap: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.marker(hotelCoords).addTo(map)
        .bindPopup('Southeast Resort, formerly Westmark Sitka')
        .openPopup();

    // Handle grayscale elements on touch devices
    // This will make elements transition to full color when they enter the viewport
    const grayscaleElements = document.querySelectorAll('.image-card, .hotel-card');

    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice && grayscaleElements.length > 0) {
        // Create an intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When element enters viewport
                if (entry.isIntersecting) {
                    // Add a small delay for a more natural feel
                    setTimeout(() => {
                        entry.target.classList.add('in-view');
                    }, 100);
                } else {
                    // When element leaves viewport
                    // Add a small delay before removing the class
                    setTimeout(() => {
                        entry.target.classList.remove('in-view');
                    }, 300);
                }
            });
        }, {
            // Element is considered in view when it's 30% visible
            threshold: 0.3,
            // Start observing when element is near the viewport
            // Format: top right bottom left
            rootMargin: '0px 0px -5% 0px'
        });

        // Observe all grayscale elements
        grayscaleElements.forEach(element => {
            observer.observe(element);
        });
    }
};