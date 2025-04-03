// Custom Scripts

window.onload = function () {
    "use strict";

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

                    // // Optional: Update the URL without triggering a reload
                    // if (history.pushState && window.location.hash !== this.hash) {
                    //     history.pushState(null, null, this.hash);
                    // }
                }
            }
        });
    });

    // Initialize carousel
    // Initialize Slick Only When Elements Exist
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

    if ($('.rooms-carousel').length) {
        const carousel = $('#rooms-carousel');

        const roomsCarousel = new bootstrap.Carousel(roomsCarouselId, {
            interval: 3000,
            touch: true
        });
    }

    const hero = document.getElementById("hero");
    const button = document.querySelector(".glowing-btn-wrapper");

    window.addEventListener("scroll", () => {
        const heroBottom = hero.getBoundingClientRect().bottom;
        const halfWindowHeight = window.innerHeight / 2;

        if (heroBottom <= halfWindowHeight) {
            button.classList.add("show");
        } else {
            button.classList.remove("show");
        }
    });

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

        // Optional: reset animation when they scroll back up
        if (!scrolledToBottom && animated) {
            button.classList.remove("animate__hinge");
            animated = false;
        }
    });
};