// Custom Scripts

window.onload = function () {
    "use strict";

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

    // Smooth scrolling for anchor links using scrollIntoView
    document.querySelectorAll('a.nav-link').forEach(link => {
        link.addEventListener('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();
                const target = document.querySelector(this.hash);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth', // Enables smooth scrolling
                        block: 'start' // Aligns the target to the top of the viewport
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
            interval: 2000, // Auto-slide every 2 seconds
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

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bootstrapCollapse = new bootstrap.Collapse(navbarCollapse);
                bootstrapCollapse.hide();
            }
        });
    });

    // Initialize the Map
    var hotelCoords = [57.05119048303024, -135.3335];
    var map = L.map('map_dialog').setView(hotelCoords, 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    L.marker(hotelCoords).addTo(map)
        .bindPopup('Southeast Resort, formerly Westmark Alaska')
        .openPopup();

    var map1 = L.map('map_dialog', {
        center: hotelCoords,
        zoom: 15,
        dragging: false,
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        keyboard: false,
        touchZoom: false,
        tap: false
    });
};